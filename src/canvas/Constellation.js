import { Star } from './Star.js';

/**
 * A small graph of stars connected by spring edges. Behaves like a soft body:
 * springs hold structure, the mouse repels nearby nodes, and it fades in/out.
 * `world` carries shared state: { canvas, ctx, mouse, settings, colors, draggedStar }.
 */
export class Constellation {
    constructor(x, y, world) {
        this.world = world;
        this.stars = [];
        this.edges = [];
        this.centerX = x;
        this.centerY = y;
        this.alpha = 0;
        this.dissolve = false;

        const numStars = Math.floor(Math.random() * 4) + 3;
        this.stars.push(new Star(x, y, false, world));
        for (let i = 1; i < numStars; i++) {
            const parentIdx = Math.random() > 0.6 ? Math.floor(Math.random() * i) : i - 1;
            const parent = this.stars[parentIdx];
            const angle = Math.random() * Math.PI * 2;
            const dist = 50 + Math.random() * 70;
            const nx = parent.x + Math.cos(angle) * dist;
            const ny = parent.y + Math.sin(angle) * dist;
            this.stars.push(new Star(nx, ny, false, world));
            this.edges.push({ p1: parentIdx, p2: i, length: dist });
        }
    }

    calculateCenter() {
        let sumX = 0;
        let sumY = 0;
        this.stars.forEach((s) => {
            sumX += s.x;
            sumY += s.y;
        });
        this.centerX = sumX / this.stars.length;
        this.centerY = sumY / this.stars.length;
    }

    update() {
        const { mouse, settings, draggedStar } = this.world;

        if (this.dissolve) {
            this.alpha -= 0.01;
            if (this.alpha < 0) this.alpha = 0;
        } else if (this.alpha < 1) {
            this.alpha += 0.005;
        }

        if (!draggedStar) {
            this.stars.forEach((s) => {
                const dx = s.x - mouse.x;
                const dy = s.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < settings.mouseRepelRadius) {
                    const force = (settings.mouseRepelRadius - dist) / settings.mouseRepelRadius;
                    s.vx += (dx / dist) * force * settings.mouseRepelForce;
                    s.vy += (dy / dist) * force * settings.mouseRepelForce;
                }
            });
        }

        this.edges.forEach((edge) => {
            const s1 = this.stars[edge.p1];
            const s2 = this.stars[edge.p2];
            const dx = s2.x - s1.x;
            const dy = s2.y - s1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const targetDist = edge.length;
            const force = (dist - targetDist) * settings.springStiffness;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            s1.vx += fx;
            s1.vy += fy;
            s2.vx -= fx;
            s2.vy -= fy;
        });

        this.stars.forEach((s) => s.update());
        this.calculateCenter();
    }

    draw() {
        const { ctx, colors } = this.world;
        if (this.alpha <= 0) return;
        ctx.globalAlpha = this.alpha * 0.8;
        ctx.strokeStyle = colors.line || '#f59e0b';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        this.edges.forEach((edge) => {
            const s1 = this.stars[edge.p1];
            const s2 = this.stars[edge.p2];
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
        });
        ctx.stroke();
        this.stars.forEach((s) => s.draw(ctx));
        ctx.globalAlpha = 1.0;
    }

    isOffScreen() {
        const { canvas } = this.world;
        const buffer = 300;
        return (
            this.centerX < -buffer ||
            this.centerX > canvas.width + buffer ||
            this.centerY < -buffer ||
            this.centerY > canvas.height + buffer
        );
    }
}

export default Constellation;
