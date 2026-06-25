import { useEffect, useRef } from 'react';
import { Star } from './Star.js';
import { Constellation } from './Constellation.js';
import { useTheme } from '../context/ThemeContext.jsx';

const SETTINGS = {
    maxConstellations: 12,
    maxBgStars: 250,
    driftSpeed: 0.15,
    mouseRepelRadius: 120,
    mouseRepelForce: 0.05,
    springStiffness: 0.03,
    damping: 0.85,
    dragStrength: 0.1,
    grabRadius: 150,
    maxConnectionDist: 1000,
    constellationRepelRadius: 250,
    constellationRepelForce: 0.2,
};

function readThemeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
        starClose: style.getPropertyValue('--star-color-close').trim(),
        starFar: style.getPropertyValue('--star-color-far').trim(),
        line: style.getPropertyValue('--line-color').trim(),
    };
}

export default function ConstellationCanvas() {
    const canvasRef = useRef(null);
    const worldRef = useRef(null);
    const { theme } = useTheme();

    // Set up the engine once on mount.
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const world = {
            canvas,
            ctx,
            mouse: { x: -9999, y: -9999 },
            draggedStar: null,
            constellations: [],
            bgStars: [],
            settings: SETTINGS,
            colors: readThemeColors(),
        };
        worldRef.current = world;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const spawnConstellationInVoid = () => {
            let bestX = Math.random() * canvas.width;
            let bestY = Math.random() * canvas.height;
            let bestDist = 0;
            for (let i = 0; i < 8; i++) {
                const rx = Math.random() * canvas.width;
                const ry = Math.random() * canvas.height;
                let nearest = Infinity;
                if (world.constellations.length === 0) {
                    nearest = Infinity;
                } else {
                    world.constellations.forEach((c) => {
                        const d = Math.hypot(c.centerX - rx, c.centerY - ry);
                        if (d < nearest) nearest = d;
                    });
                }
                if (nearest > bestDist) {
                    bestDist = nearest;
                    bestX = rx;
                    bestY = ry;
                }
            }
            if (bestDist > 300 || world.constellations.length === 0) {
                world.constellations.push(new Constellation(bestX, bestY, world));
            }
        };

        const initSystem = () => {
            world.constellations = [];
            world.bgStars = [];
            for (let i = 0; i < 8; i++) spawnConstellationInVoid();
            for (let i = 0; i < SETTINGS.maxBgStars; i++) {
                world.bgStars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, true, world));
            }
        };

        let resizeTimeout;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initSystem();
            }, 100);
        };

        const onMouseMove = (e) => {
            world.mouse.x = e.clientX;
            world.mouse.y = e.clientY;
            if (world.draggedStar) {
                const dx = world.mouse.x - world.draggedStar.x;
                const dy = world.mouse.y - world.draggedStar.y;
                world.draggedStar.vx += dx * SETTINGS.dragStrength;
                world.draggedStar.vy += dy * SETTINGS.dragStrength;
                const el = document.elementFromPoint(world.mouse.x, world.mouse.y);
                if (el && el.closest('.foreground-element, .glass-card, button, a')) {
                    world.draggedStar = null;
                    document.body.classList.remove('no-select');
                }
            }
        };

        const onMouseDown = () => {
            let closestStar = null;
            let minDistance = SETTINGS.grabRadius;
            world.constellations.forEach((c) => {
                c.stars.forEach((s) => {
                    const dist = Math.hypot(s.x - world.mouse.x, s.y - world.mouse.y);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestStar = s;
                    }
                });
            });
            if (closestStar) {
                world.draggedStar = closestStar;
                document.body.classList.add('no-select');
            }
        };

        const onMouseUp = () => {
            world.draggedStar = null;
            document.body.classList.remove('no-select');
        };

        let rafId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            world.bgStars.forEach((s) => {
                if (s.x < 0) s.x = canvas.width;
                if (s.x > canvas.width) s.x = 0;
                if (s.y < 0) s.y = canvas.height;
                if (s.y > canvas.height) s.y = 0;
                s.x += (Math.random() - 0.5) * 0.05 + s.baseVx * 0.2;
                s.y += (Math.random() - 0.5) * 0.05 + s.baseVy * 0.2;
                const dx = s.x - world.mouse.x;
                const dy = s.y - world.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    s.x += (dx / dist) * 0.2 * (1 / s.z);
                    s.y += (dy / dist) * 0.2 * (1 / s.z);
                }
                s.update();
                s.draw(ctx);
            });

            for (let i = world.constellations.length - 1; i >= 0; i--) {
                if (
                    world.constellations[i].isOffScreen() ||
                    (world.constellations[i].dissolve && world.constellations[i].alpha <= 0)
                ) {
                    world.constellations.splice(i, 1);
                }
            }

            if (world.constellations.length < SETTINGS.maxConstellations) {
                if (Math.random() < 0.01) spawnConstellationInVoid();
            }

            for (let i = 0; i < world.constellations.length; i++) {
                for (let j = i + 1; j < world.constellations.length; j++) {
                    const c1 = world.constellations[i];
                    const c2 = world.constellations[j];
                    if (c1.dissolve || c2.dissolve) continue;
                    const dx = c1.centerX - c2.centerX;
                    const dy = c1.centerY - c2.centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        let isDraggingC1 = false;
                        let isDraggingC2 = false;
                        if (world.draggedStar) {
                            isDraggingC1 = c1.stars.includes(world.draggedStar);
                            isDraggingC2 = c2.stars.includes(world.draggedStar);
                        }
                        if (!isDraggingC1 && !isDraggingC2) {
                            c1.dissolve = true;
                            continue;
                        }
                    }
                    if (dist < SETTINGS.constellationRepelRadius) {
                        const force = (SETTINGS.constellationRepelRadius - dist) / SETTINGS.constellationRepelRadius;
                        const pushX = (dx / dist) * force * SETTINGS.constellationRepelForce;
                        const pushY = (dy / dist) * force * SETTINGS.constellationRepelForce;
                        c1.stars.forEach((s) => {
                            s.vx += pushX;
                            s.vy += pushY;
                        });
                        c2.stars.forEach((s) => {
                            s.vx -= pushX;
                            s.vy -= pushY;
                        });
                    }
                }
            }

            world.constellations.forEach((c) => {
                c.update();
                c.draw();
            });
            rafId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        initSystem();
        animate();

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    // Refresh cached colors whenever the theme changes.
    useEffect(() => {
        if (worldRef.current) {
            worldRef.current.colors = readThemeColors();
        }
    }, [theme]);

    return <canvas id="hero-canvas" ref={canvasRef} />;
}
