import { Folder, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resumeData.js';

export default function Projects() {
    return (
        <section id="projects" className="py-24 foreground-element">
            <div className="max-w-7xl mx-auto px-6 section-fade">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4 text-shadow-sm">
                    Featured Projects
                    <div className="h-px bg-gray-800 flex-grow ml-4 backdrop-blur-md"></div>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resumeData.projects.map((proj) => (
                        <div
                            key={proj.name}
                            className="glass-card p-6 group hover:border-theme-primary/40 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-theme-primary">
                                    <Folder className="w-10 h-10" />
                                </div>
                                <div className="flex gap-3">
                                    <a href={proj.link} className="text-gray-400 hover:text-white" aria-label={`Open ${proj.name}`}>
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-theme-primary transition-colors">
                                {proj.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 flex-grow">{proj.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {proj.tech.split(',').map((t) => (
                                    <span key={t} className="text-xs font-mono text-theme-primary/80">
                                        {t.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
