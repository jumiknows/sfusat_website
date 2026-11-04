import React from 'react';
import { ProjectPageContent } from '../content/projects';
import RecruitingBanner from '../components/RecruitingBanner';
import './Aleasat.css';

interface ProjectPageProps {
  project: ProjectPageContent;
}

// The layout shared by the shorter project pages. Their text lives in src/content/projects.ts.
const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => (
  <div className="aleasat-page">
    <section className={`aleasat-hero ${project.fullWidthPhoto ? 'hero-immersive' : ''}`}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className={project.longHeading ? 'hero-heading' : undefined}>{project.heading}</h1>
          <p className="hero-subtitle">{project.subtitle}</p>
          {project.description && <p className="hero-description">{project.description}</p>}
        </div>
        <div className="hero-image">
          <img src={project.image} alt={project.imageAlt} className="aleasat-main-image" decoding="async" />
        </div>
      </div>
    </section>
    {project.recruitingProgram && <RecruitingBanner program={project.recruitingProgram} />}
    <section className="project-narrative">
      <div className="container">
        <h2>{project.storyHeading}</h2>
        {project.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {project.photos && (
          <div className="project-photos">
            {project.photos.map((photo) => (
              <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            ))}
          </div>
        )}
      </div>
    </section>
  </div>
);

export default ProjectPage;
