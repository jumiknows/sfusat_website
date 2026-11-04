import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowsSpin, faArrowUpRightFromSquare, faCalendarDays, faCamera, faCube, faFlagCheckered, faGraduationCap, faLayerGroup, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import LoopVideo from '../LoopVideo';
import RecruitingBanner from '../RecruitingBanner';
import SectionNav from '../SectionNav';
import './Aleasat.css';

// ALEASAT project slideshow images from the projects folder
const TESTING_PHOTOS = [
  {
    src: '/images/aleasat/test-chamber-portrait.jpg',
    alt: 'The engineering model on its supports inside an open thermal vacuum chamber',
    caption: 'The engineering model in the thermal vacuum chamber'
  },
  {
    src: '/images/aleasat/team-at-chamber.jpg',
    alt: 'Two team members in cleanroom gowns working at the open thermal vacuum chamber',
    caption: 'Preparing the thermal vacuum chamber',
    wide: true
  },
  {
    src: '/images/aleasat/camera-lens-closeup.jpg',
    alt: 'Close-up of the ALEASAT camera lens beneath the circuit board',
    caption: 'The camera lens and circuit board',
    wide: true
  },
  {
    src: '/images/aleasat/test-chamber-window.jpg',
    alt: 'A team member in a hairnet reaching toward the round window of the test chamber, with a model cube in the foreground',
    caption: 'At the test chamber window'
  },
  {
    src: '/images/aleasat/board-in-hand.jpg',
    alt: 'A gloved hand holding an ALEASAT circuit board marked with mission partner logos',
    caption: 'A mission circuit board'
  },
  {
    src: '/images/aleasat/esa-cleanroom-assembly.jpg',
    alt: 'Gloved hands beside the camera assembly, with a cleanroom gown marked ESA Fly Your Satellite',
    caption: 'Assembly in the cleanroom',
    wide: true
  },
  {
    src: '/images/aleasat/payload-on-vibration-table.jpg',
    alt: 'ALEASAT camera and electronics bolted to a vibration test table',
    caption: 'The camera and electronics on the shaker table',
    wide: true
  },
  {
    src: '/images/aleasat/threadlocker-application.jpg',
    alt: 'Applying threadlocker to a fastener on the ALEASAT electronics stack',
    caption: 'Applying threadlocker during assembly'
  }
];

const aleasatImages = [
  { url: '/images/aleasat/hardware-on-test-table.jpg', alt: 'ALEASAT electronics stack and camera on a perforated test table' },
  { url: '/images/aleasat/test-chamber-integration.jpg', alt: 'Gloved hands connecting wiring to the ALEASAT cube inside the test chamber' },
  { url: '/images/aleasat/lens-adjustment-closeup.jpg', alt: 'A gloved hand holding a lens component over a test table' },
  { url: '/images/aleasat/chamber-through-window.jpg', alt: 'Hardware inside the test chamber, seen through its window' },
  { url: '/images/aleasat/test-chamber-door.jpg', alt: 'The closed door of the test chamber with a round viewing window' },
  { url: '/images/aleasat/board-stack.jpg', alt: 'The ALEASAT electronics stack on an assembly fixture' },
  { url: '/images/aleasat/board-on-shaker-top.jpg', alt: 'Circuit board seen from above on the vibration table' },
  { url: '/images/aleasat/payload-assembly.jpg', alt: 'Gloved hands assembling the camera payload on a fixture' },
  { url: '/images/aleasat/structure-handling.jpg', alt: 'Gloved hands holding a slotted metal structure on a cleanroom bench' },
  { url: '/images/aleasat/payload-on-vibration-table-portrait.jpg', alt: 'The camera payload mounted on the vibration table' },
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
      "/images/aleasat/test-chamber-wiring.jpg",
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
      <section className="aleasat-hero hero-immersive hero-aleasat">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">ALEASAT</h1>
            <p className="hero-subtitle">To Prove Ourselves</p>
            <p className="hero-description">
              A 1U CubeSat mission built in partnership with UBC Orbit, with launch targeted for 2028.
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="/images/aleasat/test-chamber-wiring.jpg" 
              alt="A gloved hand wiring hardware inside the open thermal vacuum chamber" 
              className="aleasat-main-image"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>
      <RecruitingBanner program="aleasat" />
      <SectionNav
        label="On this page"
        sections={[
          { id: 'overview', label: 'Overview' },
          { id: 'project', label: 'Project' },
          { id: 'orbit', label: 'Going to orbit' },
          { id: 'testing', label: 'Testing at ESA' },
          { id: 'gallery', label: 'Gallery' }
        ]}
      />

      {/* Mission Overview Section */}
      <section className="mission-overview" id="overview">
        <div className="container">
          <h2>Mission Overview</h2>
          <div className="mission-stats">
            <div className="stat-card">
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faCube} /></span>
              <div className="stat-number">1U</div>
              <div className="stat-label">CubeSat Size</div>
            </div>
            <div className="stat-card">
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faCalendarDays} /></span>
              <div className="stat-number">2020</div>
              <div className="stat-label">Project Start</div>
            </div>
            <div className="stat-card">
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faLayerGroup} /></span>
              <div className="stat-number">2</div>
              <div className="stat-label">Main Payloads</div>
            </div>
            <div className="stat-card">
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faFlagCheckered} /></span>
              <div className="stat-number">4th</div>
              <div className="stat-label">Canadian Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Narrative Section */}
      <section className="project-narrative" id="project">
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
      <section className="mission-details" id="orbit">
        <div className="container">
          <div className="details-grid">
            <div className="details-content">
              <h3>Going to Orbit</h3>
              <p>
                SFU Satellite Design Team has partnered with UBC Orbit to design, build, and launch a 1U (10x10x10cm) cube satellite. 
                The project started in January 2020 with plans to launch the satellite to low-earth-orbit (LEO), with launch targeted for 2028.
              </p>
              
              <div className="payload-section">
                <h4>Primary Payloads</h4>
                <div className="payload-grid">
                  <div className="payload-item">
                    <div className="payload-content">
                      <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faCamera} /></span>
                      <h5>Earth Imaging Camera</h5>
                      <p>Amateur radio operators can request pictures of their area through our satellite communication system.</p>
                    </div>
                  </div>
                  <div className="payload-item">
                    <div className="payload-content">
                      <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowsSpin} /></span>
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
                  <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faGraduationCap} /></span>
                  <h5>Hands-on Experience</h5>
                  <p>Students get real satellite engineering experience.</p>
                </div>
                <div className="impact-card">
                  <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faFlagCheckered} /></span>
                  <h5>Fourth Canadian Team</h5>
                  <p>We would be the fourth Canadian undergraduate team to launch a satellite.</p>
                </div>
                <div className="impact-card">
                  <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faMicroscope} /></span>
                  <h5>Spaceflight Research</h5>
                  <p>Contributing to human spaceflight research in Canada.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Section */}
      <section className="testing-section" id="testing">
        <div className="container">
          <h2>Testing at ESA</h2>
          <p>In June 2026, the engineering model went through vibration and thermal vacuum testing at ESA's CubeSat Support Facility in Belgium.</p>
          <p>
            ESA first selected the team for the February 2024 test window of its Fly Your Satellite! Test Opportunities programme.{' '}
            <a href="https://education.esa.int/green_light_for_aleasat_test_opportunity/" className="esa-article-link" target="_blank" rel="noopener noreferrer">
              Read the ESA article <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </p>
          <div className="photo-grid video-row">
            <figure className="wide">
              <LoopVideo name="cleanroom-integration" label="A team member in cleanroom clothing working on hardware at a bench" />
              <figcaption>Working in the cleanroom</figcaption>
            </figure>
            <figure>
              <LoopVideo name="vibration-table" label="The engineering model on top of an ESA vibration test machine" />
              <figcaption>On ESA's vibration test machine</figcaption>
            </figure>
          </div>
          <div className="photo-grid">
            {TESTING_PHOTOS.map((photo) => (
              <figure key={photo.src} className={photo.wide ? 'wide' : undefined}>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Development Gallery Section */}
      <section className="development-gallery" id="gallery">
        <div className="container">
          <div className="gallery-header">
            <h2>Development Gallery</h2>
            <p>Photos from ALEASAT development</p>
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
