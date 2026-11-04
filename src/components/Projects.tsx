import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

interface Project {
  title: string;
  image: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  { 
    title: 'Polaris', 
    image: '/images/rover/sfusat-recruitment-poster.png', 
    description: 'Design and deploy an autonomous rover for the Canadian International Rover Challenge. Push the boundaries of robotics, autonomy, and systems integration.', 
    link: '/rover' 
  },
  { 
    title: 'ALEASAT', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image1.png', 
    description: 'Our most ambitious project yet. Alongside UBC Orbit, we are sending a 1U cube satellite into space. The satellite will provide research data relating to human physiology and will provide pictures of Earth for amateur radio operators.', 
    link: '/projects/aleasat' 
  },
  { 
    title: 'Balloon 3', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image2.jpeg', 
    description: 'Repeating our tradition for our new recruits we launched our most successful balloon yet.', 
    link: '/projects/balloon3' 
  },
  { 
    title: 'CSDC5', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image3.png', 
    description: 'Our second time in the competition and utilizing what we learned from the previous one we continued to develop our custom hardware.', 
    link: '/projects/csdc5' 
  },
  { 
    title: 'CCP1', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image4.jpg', 
    description: 'Building from our success of CSDC4 we partnered with 2 other universities to build a 2U cube satellite funded from the Canadian Space Agency.', 
    link: '/projects/ccp1' 
  },
  { 
    title: 'Balloon 2', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image5.jpg', 
    description: 'The first balloon helped us gain invaluable experience so we did it again to help our new members. Many of the leads from this project went on to lead CSDC5 and ALEA.', 
    link: '/projects/balloon2' 
  },
  { 
    title: 'CSDC4', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image6.jpeg', 
    description: 'Our first competition and opportunity to prove ourselves as satellite engineers.', 
    link: '/projects/csdc4' 
  },
  { 
    title: 'Balloon 1', 
    image: 'https://media.githubusercontent.com/media/balloon4computing/artifact/main/image8.jpeg', 
    description: 'Latobius was the first High Altitude Balloon launched by SFU Satellite Design Team. This mission was used to test our integration capabilities before starting on CSDC4.', 
    link: '/projects/balloon1' 
  }
];

const ProjectsPage: React.FC = () => {
  return (
    <div className="projects-page">
      <h1 className="visually-hidden">Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {project.link ? (
              <Link to={project.link}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  loading={index < 1 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </Link>
            ) : (
              <>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  loading={index < 1 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
