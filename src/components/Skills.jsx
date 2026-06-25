import { resumeData } from '../data/resumeData.js';

export default function Skills() {
  return (
    <section id="skills" className="py-24 foreground-element">
      <div className="max-w-6xl mx-auto px-6 section-fade">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            Technical Skills
            <div className="h-px bg-gray-700 flex-grow ml-4"></div>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {Object.entries(resumeData.skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-white font-semibold mb-4 border-b border-gray-800 pb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium text-gray-100 bg-theme-primary/10 rounded-full border border-theme-primary/10 hover:border-theme-primary/30 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
