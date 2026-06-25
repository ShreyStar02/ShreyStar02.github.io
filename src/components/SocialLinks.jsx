import { Github, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';
import { resumeData } from '../data/resumeData.js';

const linkClass =
  'text-gray-400 hover:text-theme-primary transition-colors hover:-translate-y-1 transform duration-200';

export default function SocialLinks() {
  const { github, linkedin, linktree, email } = resumeData.contact;
  return (
    <>
      <a href={github} target="_blank" rel="noreferrer" className={linkClass} aria-label="GitHub">
        <Github className="w-6 h-6" />
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer" className={linkClass} aria-label="LinkedIn">
        <Linkedin className="w-6 h-6" />
      </a>
      <a href={linktree} target="_blank" rel="noreferrer" className={linkClass} aria-label="Linktree">
        <LinkIcon className="w-6 h-6" />
      </a>
      <a href={`mailto:${email}`} className={linkClass} aria-label="Email">
        <Mail className="w-6 h-6" />
      </a>
    </>
  );
}
