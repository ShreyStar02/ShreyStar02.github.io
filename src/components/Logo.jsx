import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const POINTS = [
    { x: 80, y: 20 },
    { x: 35, y: 20 },
    { x: 25, y: 45 },
    { x: 75, y: 55 },
    { x: 65, y: 80 },
    { x: 20, y: 80 },
];

/**
 * Animated constellation "S" logo. Clicking it cycles the global theme.
 */
export default function Logo() {
    const { cycleTheme } = useTheme();
    const pathRef = useRef(null);
    const dotsRef = useRef([]);
    const hoveringRef = useRef(false);
    const [dots] = useState(() =>
        POINTS.map((pt) => ({
            baseX: pt.x,
            baseY: pt.y,
            phaseX: Math.random() * 6,
            phaseY: Math.random() * 6,
            speedX: 0.03 + Math.random() * 0.04,
            speedY: 0.03 + Math.random() * 0.04,
            ampX: 1.5,
            ampY: 1.5,
        }))
    );

    useEffect(() => {
        let time = 0;
        let rafId;

        const animate = () => {
            time += 1;
            let d = '';
            dots.forEach((dot, i) => {
                const speedMult = hoveringRef.current ? 2.5 : 1;
                const ampMult = hoveringRef.current ? 2 : 1;
                const cx = dot.baseX + Math.sin(time * dot.speedX * speedMult + dot.phaseX) * dot.ampX * ampMult;
                const cy = dot.baseY + Math.cos(time * dot.speedY * speedMult + dot.phaseY) * dot.ampY * ampMult;
                const el = dotsRef.current[i];
                if (el) {
                    el.setAttribute('cx', cx);
                    el.setAttribute('cy', cy);
                    el.style.fill = i % 2 === 0 ? 'var(--theme-text)' : 'var(--theme-primary)';
                }
                d += (i === 0 ? 'M' : ' L') + `${cx} ${cy}`;
            });
            if (pathRef.current) pathRef.current.setAttribute('d', d);
            rafId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(rafId);
    }, [dots]);

    return (
        <div
            className="flex-shrink-0 cursor-pointer group relative"
            title="Click to cycle themes"
            onClick={cycleTheme}
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
        >
            <svg className="h-12 w-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SRV Logo">
                <path
                    ref={pathRef}
                    d=""
                    stroke="var(--theme-primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80 transition-colors duration-500"
                />
                <g>
                    {dots.map((_, i) => (
                        <circle key={i} ref={(el) => (dotsRef.current[i] = el)} r={i % 2 === 0 ? 4 : 3} />
                    ))}
                </g>
            </svg>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Switch Theme
            </span>
        </div>
    );
}
