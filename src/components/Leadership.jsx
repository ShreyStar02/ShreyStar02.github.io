import { resumeData } from '../data/resumeData.js';

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 foreground-element">
      <div className="max-w-6xl mx-auto px-6 section-fade">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            Leadership &amp; Volunteering
            <div className="h-px bg-gray-700 flex-grow ml-4"></div>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {resumeData.leadership.map((role) => (
              <div
                key={role.role}
                className="bg-theme-glass-bg p-5 rounded-lg border border-theme-glass-border hover:border-theme-primary/30 transition-colors backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white">{role.role}</h3>
                <p className="text-theme-primary text-sm mb-2">{role.organization}</p>
                <p className="text-gray-400 text-sm">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
