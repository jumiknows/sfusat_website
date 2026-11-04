import React from 'react';
import { Link } from 'react-router-dom';
import { isRecruiting } from '../content/recruitment';
import SectionNav from '../components/SectionNav';
import Slideshow from '../components/Slideshow';
import { ROVER_PHOTOS } from '../content/galleries';
import { ROVER_SUBSYSTEMS } from '../content/rover';
import './Rover.css';

const Rover: React.FC = () => {

  return (
    <div className="rover-page">
      <div className="rover-container">
        <div className="rover-image">
          <img 
            src="/images/rover/sfusat-recruitment-poster.png" 
            alt="Canadian International Rover Challenge logo"
          />
        </div>
        <div className="rover-content">
          <h1>Rover Challenge</h1>
          <p className="rover-subtitle">August 2027</p>
          <div className="rover-description">
            <p>
              Design and deploy an autonomous rover for the Canadian International Rover Challenge. 
              The work covers robotics, autonomy, and systems integration.
            </p>
            <div className="rover-highlights">
              <div className="highlight-item">
                <span className="highlight-label">Level:</span>
                <span className="highlight-value">Intermediate to Advanced</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Focus:</span>
                <span className="highlight-value">Robotics | Autonomy | Systems Integration</span>
              </div>
            </div>
          </div>
          {isRecruiting('rover') && (
            <div className="rover-buttons">
              <Link to="/rover/apply" className="rover-button">
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>

      <SectionNav
        label="On this page"
        sections={[
          { id: 'subsystems', label: 'Subsystems' },
          { id: 'gallery', label: 'Gallery' }
        ]}
      />

      {/* Section Divider */}
      <div className="section-divider">
        <div className="divider-line"></div>
      </div>

      {/* Rover Subsystems Section */}
      <div className="rover-challenges-section" id="subsystems">
        <div className="challenges-container">
          <div className="challenges-header">
            <h2 className="challenges-title">Rover Subsystems</h2>
            <p className="challenges-description">
              The four systems the team is building.
            </p>
          </div>
          <div className="challenges-grid">
            {ROVER_SUBSYSTEMS.map((subsystem) => (
              <div key={subsystem.name} className="challenge-card">
                <h3>{subsystem.name}</h3>
                <p className="challenge-summary">{subsystem.summary}</p>
                <ul>
                  {subsystem.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rover Gallery Slideshow */}
      <section className="rover-gallery-section" id="gallery">
        <div className="container">
          <div className="gallery-header">
            <h2>Development Gallery</h2>
            <p>A look at the rover design so far</p>
          </div>
          
          <Slideshow images={ROVER_PHOTOS} />
        </div>
      </section>
    </div>
  );
};

export default Rover;
