import { useState } from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo.jsx';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#awards', label: 'Awards' },
  { href: '#testimonials', label: 'Testimonials' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300 foreground-element">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-theme-text hover:text-theme-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="px-4 py-2 text-sm font-medium text-theme-primary bg-theme-primary/10 border border-theme-primary/20 rounded-full hover:bg-theme-primary/20 transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-theme-text hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-theme-nav backdrop-blur-xl border-b border-theme-glass-border">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-theme-text hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block mt-4 px-3 py-2 text-center rounded-md text-base font-medium text-theme-primary bg-theme-primary/10 border border-theme-primary/20"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
