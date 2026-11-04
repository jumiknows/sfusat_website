import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faGrip } from '@fortawesome/free-solid-svg-icons';
import { PROJECTS } from '../content/projects';

// Previous and next links at the bottom of every project page, in the Projects page order
const ProjectNav: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '');
  const projects = PROJECTS.filter((project) => project.link);
  const index = projects.findIndex((project) => project.link === path);

  if (index === -1) {
    return null;
  }

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <nav className="project-nav" aria-label="More projects">
      <Link to={previous.link as string} className="project-nav-side">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>
          <small>Previous</small>
          {previous.title}
        </span>
      </Link>
      <Link to="/projects" className="project-nav-all">
        <FontAwesomeIcon icon={faGrip} /> All projects
      </Link>
      <Link to={next.link as string} className="project-nav-side next">
        <span>
          <small>Next</small>
          {next.title}
        </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </nav>
  );
};

export default ProjectNav;
