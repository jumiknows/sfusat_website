import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Aleasat.css';

// ALEASAT project slideshow images from the projects folder
const aleasatImages = [
  { url: '/images/projects/image1', alt: 'Project Image 1' },
  { url: '/images/projects/image2', alt: 'Project Image 2' },
  { url: '/images/projects/image3', alt: 'Project Image 3' },
  { url: '/images/projects/image4', alt: 'Project Image 4' },
  { url: '/images/projects/image5', alt: 'Project Image 5' },
  { url: '/images/projects/image6', alt: 'Project Image 6' },
  { url: '/images/projects/image7', alt: 'Project Image 7' },
  { url: '/images/projects/image8', alt: 'Project Image 8' },
  { url: '/images/projects/image9', alt: 'Project Image 9' },
  { url: '/images/projects/image10', alt: 'Project Image 10' },
  { url: '/images/projects/image11', alt: 'Project Image 11' },
  { url: '/images/projects/image12', alt: 'Project Image 12' },
  { url: '/images/projects/image13', alt: 'Project Image 13' },
  { url: '/images/projects/image14', alt: 'Project Image 14' },
  { url: '/images/projects/image15', alt: 'Project Image 15' },
  { url: '/images/projects/image16', alt: 'Project Image 16' },
  { url: '/images/projects/image17', alt: 'Project Image 17' },
  { url: '/images/projects/image18', alt: 'Project Image 18' },
  { url: '/images/projects/image19', alt: 'Project Image 19' },
  { url: '/images/projects/image20', alt: 'Project Image 20' },
  { url: '/images/projects/image21', alt: 'Project Image 21' },
  { url: '/images/projects/image22', alt: 'Project Image 22' },
  { url: '/images/projects/image23', alt: 'Project Image 23' },
  { url: '/images/projects/image24', alt: 'Project Image 24' },
  { url: '/images/projects/image25', alt: 'Project Image 25' },
  { url: '/images/projects/image26', alt: 'Project Image 26' },
  { url: '/images/projects/image27', alt: 'Project Image 27' },
];

const AleasatPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload the ALEASAT image and slideshow images
  useEffect(() => {
    const preloadImages = [
      "/images/site/aleasat-render.jpg",
      ...aleasatImages.slice(0, 3).map(img => img.url)
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aleasatImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aleasatImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aleasatImages.length) % aleasatImages.length);
  };
  return (
  <div className="aleasat-page">
      {/* Hero Section */}
      <section className="aleasat-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">ALEASAT</h1>
            <p className="hero-subtitle">To Prove Ourselves</p>
            <p className="hero-description">
              A 1U CubeSat mission built in partnership with UBC Orbit.
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="/images/site/aleasat-render.jpg" 
              alt="ALEASAT Satellite" 
              className="aleasat-main-image"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Mission Overview Section */}
      <section className="mission-overview">
        <div className="container">
          <h2>Mission Overview</h2>
          <div className="mission-stats">
            <div className="stat-card">
              <div className="stat-number">1U</div>
              <div className="stat-label">CubeSat Size</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2020</div>
              <div className="stat-label">Project Start</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Main Payloads</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4th</div>
              <div className="stat-label">Canadian Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Narrative Section */}
      <section className="project-narrative">
        <div className="container">
          <h2>About the Project</h2>
          <p>
            SFU Satellite Design Team and UBC Orbit are collaborating to design, build, and launch a 1U CubeSat, with the project beginning in January 2020. The satellite will carry two main payloads: a camera for amateur radio operators to request Earth images, and a miniaturized human centrifuge, developed with SFU Aerospace Physiology Laboratory, to study physiological effects in space.
          </p>
          <p>
            Successfully launching this satellite will establish us as the fourth Canadian undergraduate team to reach space, enhancing our credibility and opening doors for future opportunities. Our mission is to provide hands-on experience in space systems and satellite operations, preparing students for impactful careers in the aerospace industry.
          </p>
        </div>
      </section>

      {/* Mission Details Section */}
      <section className="mission-details">
        <div className="container">
          <div className="details-grid">
            <div className="details-content">
              <h3>Going to Orbit</h3>
              <p>
                SFU Satellite Design Team has partnered with UBC Orbit to design, build, and launch a 1U (10x10x10cm) cube satellite. 
                The project started in January 2020 with plans to launch the satellite to low-earth-orbit (LEO) in the near future.
              </p>
              
              <div className="payload-section">
                <h4>Primary Payloads</h4>
                <div className="payload-grid">
                  <div className="payload-item">
                    <div className="payload-content">
                      <h5>Earth Imaging Camera</h5>
                      <p>Amateur radio operators can request pictures of their area through our satellite communication system.</p>
                    </div>
                  </div>
                  <div className="payload-item">
                    <div className="payload-content">
                      <h5>Miniaturized Centrifuge</h5>
                      <p>Testing human physiology effects for long-term space missions in partnership with SFU Aerospace Physiology Laboratory.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="impact-section">
              <h4>Mission Impact</h4>
              <div className="impact-cards">
                <div className="impact-card">
                  <h5>Hands-on Experience</h5>
                  <p>Students get real satellite engineering experience.</p>
                </div>
                <div className="impact-card">
                  <h5>Fourth Canadian Team</h5>
                  <p>We would be the fourth Canadian undergraduate team to launch a satellite.</p>
                </div>
                <div className="impact-card">
                  <h5>Spaceflight Research</h5>
                  <p>Contributing to human spaceflight research in Canada.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Gallery Section */}
      <section className="development-gallery">
        <div className="container">
          <div className="gallery-header">
            <h2>Development Gallery</h2>
            <p>Explore the engineering journey behind ALEASAT</p>
          </div>
          
          <div className="slideshow-container">
            <div className="slideshow-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {aleasatImages.map((image, index) => (
                <div key={index} className="slide">
                  <div className="slide-content">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    {/* Removed image name overlay */}
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
}

export default AleasatPage;
