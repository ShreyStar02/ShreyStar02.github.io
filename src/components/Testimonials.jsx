import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { resumeData } from '../data/resumeData.js';

const GAP = 32;

function TestimonialCard({ t, width }) {
    const style = width ? { width, minWidth: width, maxWidth: width, boxSizing: 'border-box' } : { boxSizing: 'border-box' };
    return (
        <div className="glass-card p-8 flex-shrink-0 flex flex-col h-full relative overflow-hidden" style={style}>
            <div className="mb-6 text-theme-primary/30">
                <Quote className="w-10 h-10" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed flex-grow relative z-10">"{t.text}"</p>
            <div className="flex items-center gap-3 mt-auto relative z-10">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-theme-primary font-bold border border-theme-primary/20 shrink-0">
                    {t.name.charAt(0)}
                </div>
                <div>
                    <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                    <p className="text-theme-primary text-xs truncate">{t.role}</p>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const { testimonials } = resumeData;
    const total = testimonials.length;
    // Clone the first 3 cards at the end for a seamless infinite loop.
    const clones = testimonials.slice(0, 3);
    const items = [...testimonials, ...clones];

    const trackRef = useRef(null);
    const containerRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [animate, setAnimate] = useState(true);

    const measure = useCallback(() => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        let w;
        if (window.innerWidth >= 1024) w = (containerWidth - GAP * 2) / 3;
        else if (window.innerWidth >= 768) w = (containerWidth - GAP) / 2;
        else w = containerWidth;
        setItemWidth(w);
    }, []);

    useLayoutEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    const next = useCallback(() => {
        setIndex((prev) => {
            if (prev >= total) {
                // Jump back to start without animation, then advance.
                setAnimate(false);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnimate(true);
                        setIndex(1);
                    });
                });
                return 0;
            }
            return prev + 1;
        });
    }, [total]);

    const prev = useCallback(() => {
        setIndex((prevIdx) => {
            if (prevIdx <= 0) {
                setAnimate(false);
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setAnimate(true);
                        setIndex(total - 1);
                    });
                });
                return total;
            }
            return prevIdx - 1;
        });
    }, [total]);

    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (paused) return undefined;
        const id = setInterval(next, 4000);
        return () => clearInterval(id);
    }, [paused, next]);

    const translateX = -(index * (itemWidth + GAP));

    return (
        <section id="testimonials" className="py-24 foreground-element">
            <div className="max-w-6xl mx-auto px-6 section-fade">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                    <span className="text-theme-primary">Testimonials</span>
                    <div className="h-px bg-gray-700 flex-grow ml-4"></div>
                </h2>
                <div
                    className="relative group"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="overflow-hidden rounded-2xl" ref={containerRef}>
                        <div
                            ref={trackRef}
                            className="flex gap-8"
                            style={{
                                transform: `translateX(${translateX}px)`,
                                transition: animate ? 'transform 0.5s ease-in-out' : 'none',
                            }}
                        >
                            {items.map((t, i) => (
                                <TestimonialCard key={`${t.name}-${i}`} t={t} width={itemWidth} />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={prev}
                        className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-3 rounded-full bg-gray-900/80 text-theme-primary border border-gray-700 hover:border-theme-primary hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 rounded-full bg-gray-900/80 text-theme-primary border border-gray-700 hover:border-theme-primary hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
