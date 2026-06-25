import { ChevronDown } from 'lucide-react';
import SocialLinks from './SocialLinks.jsx';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center foreground-element">
        <div className="mb-6 inline-block">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-theme-primary bg-theme-primary/10 border border-theme-primary/20 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Available for opportunities
          </span>
        </div>
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Hi, I'm <span className="hero-gradient-text">Shreyes Ram</span>
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Senior Software Engineer &amp; AI Researcher crafting intelligent solutions.
        </p>

        <div
          className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-theme-primary text-black font-bold hover:opacity-90 transition-all shadow-[0_0_20px_var(--theme-glass-border)] hover:shadow-[0_0_30px_var(--theme-glass-border)]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-theme-glass-bg text-theme-text font-semibold border border-theme-glass-border hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            Contact Me
          </a>
        </div>

        <div className="flex justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <SocialLinks />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
