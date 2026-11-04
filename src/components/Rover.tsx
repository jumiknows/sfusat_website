import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faBatteryFull, faCalendarDays, faCrosshairs, faGaugeHigh, faRobot, faRoute, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { isRecruiting } from './recruitment';
import SectionNav from './SectionNav';
import './Rover.css';

const roverImages = [
  { url: '/images/rover/rover-1.png', alt: 'Rover Development Image 1' },
  { url: '/images/rover/rover-2.png', alt: 'Rover Development Image 2' },
  { url: '/images/rover/rover-3.png', alt: 'Rover Development Image 3' },
  { url: '/images/rover/rover-4.png', alt: 'Rover Development Image 4' },
];

const Rover: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % roverImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % roverImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + roverImages.length) % roverImages.length);
  };

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
          <p className="rover-subtitle"><FontAwesomeIcon icon={faCalendarDays} /> August 2027</p>
          <div className="rover-description">
            <p>
              Design and deploy an autonomous rover for the Canadian International Rover Challenge. 
              The work covers robotics, autonomy, and systems integration.
            </p>
            <div className="rover-highlights">
              <div className="highlight-item">
                <span className="highlight-label"><FontAwesomeIcon icon={faGaugeHigh} /> Level:</span>
                <span className="highlight-value">Intermediate to Advanced</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label"><FontAwesomeIcon icon={faCrosshairs} /> Focus:</span>
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
            <div className="challenge-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faRobot} /></span>
              <h3>Robotic Arm</h3>
              <p className="challenge-summary">A multi-axis arm for handling objects</p>
              <ul>
                <li>Multi-axis manipulator with inverse kinematics</li>
                <li>Custom end-effector tooling for object manipulation</li>
                <li>Force feedback and collision detection</li>
              </ul>
            </div>

            <div className="challenge-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faTowerBroadcast} /></span>
              <h3>Communications</h3>
              <p className="challenge-summary">Long-range radio telemetry and command</p>
              <ul>
                <li>Reliable radio link over 1km+ distance</li>
                <li>Low-latency video streaming pipeline</li>
                <li>Redundant command and telemetry protocols</li>
              </ul>
            </div>

            <div className="challenge-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faRoute} /></span>
              <h3>Mobility</h3>
              <p className="challenge-summary">All-terrain autonomous navigation</p>
              <ul>
                <li>Advanced suspension for rough terrain</li>
                <li>GPS-denied localization via sensor fusion</li>
                <li>Autonomous path planning and obstacle avoidance</li>
              </ul>
            </div>

            <div className="challenge-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faBatteryFull} /></span>
              <h3>Power Systems</h3>
              <p className="challenge-summary">Keeps the rover powered for the full mission</p>
              <ul>
                <li>High-capacity battery with thermal management</li>
                <li>Intelligent power distribution and monitoring</li>
                <li>Optimized energy efficiency across subsystems</li>
              </ul>
            </div>
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
          
          <div className="slideshow-container">
            <div className="slideshow-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {roverImages.map((image, index) => (
                <div key={index} className="slide">
                  <div className="slide-content">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation */}
            <button className="slide-arrow slide-arrow-left" onClick={prevSlide} aria-label="Previous image">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="slide-arrow slide-arrow-right" onClick={nextSlide} aria-label="Next image">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rover;
