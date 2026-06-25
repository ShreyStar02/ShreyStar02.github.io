import { Trophy, Award, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData.js';

export default function Awards() {
  return (
    <section id="awards" className="py-24 foreground-element">
      <div className="max-w-5xl mx-auto px-6 section-fade">
        <div className="glass-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            Honors &amp; Awards
            <div className="h-px bg-gray-700 flex-grow ml-4"></div>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-2">
                <Trophy className="text-theme-primary w-5 h-5" />
                Awards
              </h3>
              <ul className="space-y-4">
                {resumeData.awards.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-theme-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-2">
                <Award className="text-theme-primary w-5 h-5" />
                Certifications
              </h3>
              <ul className="space-y-4">
                {resumeData.certifications.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-theme-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
