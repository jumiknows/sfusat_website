import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay, faCalendarDays, faGraduationCap, faIndustry, faPeopleGroup, faSeedling } from '@fortawesome/free-solid-svg-icons';
import SectionNav from '../components/SectionNav';
import { OUTREACH_PHOTOS as slideshowImages } from '../content/galleries';
import { EVENTS } from '../content/events';
import './Outreach.css';

const SLIDE_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;

const prefersReducedMotion = () =>
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

const Outreach: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(prefersReducedMotion);
  const [isHeld, setIsHeld] = useState(false); // Pointer or keyboard focus is on the slideshow
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  // Auto-advance slideshow. Restarts after every change so a manual click gets a full interval.
  useEffect(() => {
    if (isPaused || isHeld) {
      return;
    }

    const timeout = setTimeout(nextSlide, SLIDE_INTERVAL_MS);

    return () => clearTimeout(timeout);
  }, [currentSlide, isPaused, isHeld]);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (distance <= -SWIPE_THRESHOLD_PX) {
      nextSlide();
    } else if (distance >= SWIPE_THRESHOLD_PX) {
      prevSlide();
    }
  };

  // Only the visible photo and its neighbours are rendered, so the next one is ready to fade in.
  const isNearCurrent = (index: number) => {
    const distance = Math.abs(index - currentSlide);
    return distance <= 1 || distance === slideshowImages.length - 1;
  };

  return (
    <div className="outreach-page">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>Outreach</h1>
          <p>Sharing the science and engineering behind satellites with students of all ages.</p>
        </div>
      </header>
  
      
      <SectionNav
        label="On this page"
        sections={[
          { id: 'photos', label: 'Photos' },
          { id: 'impact', label: 'Impact' },
          { id: 'events', label: 'Events' },
          { id: 'host', label: 'Host us' }
        ]}
      />

      {/* Image Slideshow Section */}
      <section
        className="outreach-slideshow"
        id="photos"
        aria-label="Photos from outreach events"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHeld(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setIsHeld(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setIsHeld(true)}
        onBlur={() => setIsHeld(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
      >
        {slideshowImages.map((image, index) => isNearCurrent(index) && (
          <div
            key={image.url}
            className={`outreach-slide ${index === currentSlide ? 'active' : ''}`}
            aria-hidden={index !== currentSlide}
          >
            <img className="outreach-slide-backdrop" src={image.url} alt="" decoding="async" />
            <img className="outreach-slide-photo" src={image.url} alt={image.alt} decoding="async" />
          </div>
        ))}

        <button className="outreach-slide-arrow left" onClick={prevSlide} aria-label="Previous image">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="outreach-slide-arrow right" onClick={nextSlide} aria-label="Next image">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className="outreach-slide-controls">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
          </button>
          <span aria-live={isPaused ? 'polite' : 'off'}>
            {currentSlide + 1} / {slideshowImages.length}
          </span>
        </div>
      </section>

      {/* Outreach Statistics Section */}
      <section className="outreach-stats" id="impact">
        <div className="container">
          <h2>Our Impact</h2>

          <div className="outreach-numbers">
            <div className="outreach-number">
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faPeopleGroup} /></span>
              <strong>15,200</strong>
              <span>people reached</span>
            </div>
            <div className="outreach-number">
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faCalendarDays} /></span>
              <strong>45+</strong>
              <span>successful events</span>
            </div>
          </div>
          
          <div className="info-grid">
            <div className="info-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faGraduationCap} /></span>
              <h3>Education</h3>
              <p>
            Through our Educational Outreach program we have reached{' '}
            <strong>out to 15,200 people in over 45 successful events</strong>.{' '}
            We work with various school facilities and external organizations to educate 
            the general public, and students for all ages about the science and engineering 
            behind the building of a satellite.
          </p>
            </div>
            <div className="info-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faIndustry} /></span>
              <h3>Industry</h3>
              <p>
            Our educational outreach program also allows the team to connect with the 
            aerospace industry promoting our mission through presentations and attending 
            local and international conferences.
          </p>
            </div>
            <div className="info-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faSeedling} /></span>
              <h3>What's Next</h3>
              <p>
            We will continue to expand our educational outreach endeavors through 
            collaboration with multiple internal and external organizations, with the 
            goal of creating a CubeSat specific education program. We will also be focusing 
            on establishing diverse and inclusive educational outreach events that can be 
            catered to everyone, regardless of gender, ethnicity and wealth, all of which 
            would emphasize our primary goal of fostering future career choices in STEM 
            for the next generation.
          </p>
            </div>
          </div>
        </div>
      </section>

      {/* List of Events Section */}
      <section className="events-section" id="events">
        <div className="container">
          <h2>Events</h2>
          
          <div className="events-list">
            {EVENTS.map(({ year, events }) => (
              <div key={year} className="event-year">
                <h3>{year}</h3>
                <ul>
                  {events.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" id="host">
        <div className="container">
          <h2>Putting on an Event?</h2>
          <p>Reach out to us!</p>
          <Link to="/contact?subject=Outreach%20event" className="cta-button">CONTACT US</Link>
        </div>
      </section>
    </div>
  );
};

export default Outreach;
