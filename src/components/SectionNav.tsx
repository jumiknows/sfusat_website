import React, { useEffect, useState } from 'react';

export interface PageSection {
  id: string;
  label: string;
}

interface SectionNavProps {
  label: string;
  sections: PageSection[];
}

// Sticky menu for long pages. Highlights the section currently on screen.
const SectionNav: React.FC<SectionNavProps> = ({ label, sections }) => {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0]?.id;
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 160) {
          current = id;
        }
      });
      setActive(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="section-nav" aria-label={label}>
      <ul>
        {sections.map(({ id, label: name }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'true' : undefined}
              onClick={(e) => goTo(e, id)}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionNav;
