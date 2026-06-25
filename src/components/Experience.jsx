import { resumeData } from '../data/resumeData.js';

export default function Experience() {
    return (
        <section id="experience" className="py-24 foreground-element">
            <div className="max-w-5xl mx-auto px-6 section-fade">
                <div className="glass-card">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
                        Experience
                        <div className="h-px bg-gray-700 flex-grow ml-4"></div>
                    </h2>
                    <div className="space-y-12 border-l-2 border-gray-700 ml-3 pl-8 md:pl-12 relative">
                        {resumeData.experience.map((exp) => (
                            <div key={exp.title} className="relative">
                                <span className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-theme-bg border-2 border-theme-primary z-10"></span>
                                <div className="mb-8 hover-lift bg-theme-glass-bg p-6 rounded-lg border border-theme-glass-border backdrop-blur-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                        <span className="text-sm text-theme-primary font-mono bg-theme-primary/10 px-2 py-1 rounded mt-2 sm:mt-0 w-fit">
                                            {exp.years}
                                        </span>
                                    </div>
                                    <p className="text-gray-200 mb-4 text-sm">
                                        {exp.company} • {exp.location}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
