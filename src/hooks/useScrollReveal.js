import { useEffect } from 'react';

/**
 * Observes all elements carrying the `.section-fade` class and adds `.visible`
 * when they scroll into view — mirroring the original IntersectionObserver logic.
 * Runs once after mount; re-runs if `deps` change (e.g. after content renders).
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.section-fade');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useScrollReveal;
