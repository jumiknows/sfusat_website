import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS as projects } from '../content/projects';
import './Projects.css';

const ProjectsPage: React.FC = () => {
  return (
    <div className="projects-page">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>Projects</h1>
          <p>High altitude balloons, CubeSats and a rover.</p>
        </div>
      </header>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <Link to={project.link ?? '/projects'}>
            <img 
              src={project.image} 
              alt={project.title} 
              className={`project-image ${project.imageClassName ?? ''}`}
              style={{ objectPosition: project.imagePosition }}
              loading={index < 1 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
