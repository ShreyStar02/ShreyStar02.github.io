import { resumeData } from '../data/resumeData.js';

export default function About() {
  const { bio, education } = resumeData;
  return (
    <section id="about" className="py-24 foreground-element">
      <div className="max-w-5xl mx-auto px-6 section-fade">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            About Me
            <div className="h-px bg-gray-700 flex-grow ml-4"></div>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>{bio}</p>
            </div>
            <div className="md:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-theme-primary to-white/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-theme-bg rounded-lg p-6 border border-theme-glass-border">
                  <h3 className="text-white font-semibold mb-4">Education</h3>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.degree} className="border-l-2 border-theme-primary/30 pl-3">
                        <p className="text-sm text-white font-semibold">{edu.degree}</p>
                        <p className="text-xs text-gray-400">{edu.institution}</p>
                        <p className="text-xs text-gray-500">
                          {edu.year}
                          {edu.grade ? ` • ${edu.grade}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
