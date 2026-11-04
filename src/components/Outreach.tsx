import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import './Outreach.css';

// Slideshow images from the outreach-events folder
const slideshowImages = [
  {
    url: '/images/outreach/events/image1.jpg',
    alt: 'Outreach Event 1'
  },
  {
    url: '/images/outreach/events/image2.jpg',
    alt: 'Outreach Event 2'
  },
  {
    url: '/images/outreach/events/image3.jpg',
    alt: 'Outreach Event 3'
  },
  {
    url: '/images/outreach/events/image4.jpg',
    alt: 'Outreach Event 4'
  },
  {
    url: '/images/outreach/events/image5.jpg',
    alt: 'Outreach Event 5'
  },
  {
    url: '/images/outreach/events/image6.jpg',
    alt: 'Outreach Event 6'
  },
  {
    url: '/images/outreach/events/image7.jpg',
    alt: 'Outreach Event 7'
  },
  {
    url: '/images/outreach/events/image8.jpg',
    alt: 'Outreach Event 8'
  },
  {
    url: '/images/outreach/events/image9.jpg',
    alt: 'Outreach Event 9'
  },
  {
    url: '/images/outreach/events/image10.jpg',
    alt: 'Outreach Event 10'
  },
  {
    url: '/images/outreach/events/image11.jpeg',
    alt: 'Outreach Event 11'
  },
  {
    url: '/images/outreach/events/image12.jpg',
    alt: 'Outreach Event 12'
  },
  {
    url: '/images/outreach/events/image13.jpg',
    alt: 'Outreach Event 13'
  },
  {
    url: '/images/outreach/events/image14.jpeg',
    alt: 'Outreach Event 14'
  },
  {
    url: '/images/outreach/events/image15.jpg',
    alt: 'Outreach Event 15'
  },
  {
    url: '/images/outreach/events/image16.jpg',
    alt: 'Outreach Event 16'
  },
  {
    url: '/images/outreach/events/image17.jpg',
    alt: 'Outreach Event 17'
  }
];

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
  
      
      {/* Image Slideshow Section */}
      <section
        className="outreach-slideshow"
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
      <section className="outreach-stats">
        <div className="container">
          <h2>Outreach Statistics</h2>

          <div className="outreach-numbers">
            <div className="outreach-number">
              <strong>15,200</strong>
              <span>people reached</span>
            </div>
            <div className="outreach-number">
              <strong>45+</strong>
              <span>successful events</span>
            </div>
          </div>
          
          <p className="stats-intro">
            Through our Educational Outreach program we have reached{' '}
            <strong>out to 15,200 people in over 45 successful events</strong>.{' '}
            We work with various school facilities and external organizations to educate 
            the general public, and students for all ages about the science and engineering 
            behind the building of a satellite.
          </p>
          
          <p className="stats-description">
            Our educational outreach program also allows the team to connect with the 
            aerospace industry promoting our mission through presentations and attending 
            local and international conferences.
          </p>
          
          <p className="stats-future">
            We will continue to expand our educational outreach endeavors through 
            collaboration with multiple internal and external organizations, with the 
            goal of creating a CubeSat specific education program. We will also be focusing 
            on establishing diverse and inclusive educational outreach events that can be 
            catered to everyone, regardless of gender, ethnicity and wealth, all of which 
            would emphasize our primary goal of fostering future career choices in STEM 
            for the next generation.
          </p>
        </div>
      </section>

      {/* List of Events Section */}
      <section className="events-section">
        <div className="container">
          <h2>List of Events</h2>
          
          <div className="events-list">
            <div className="event-year">
              <h3>2025</h3>
              <ul>
                <li>Abbotsford International Airshow August 2025</li>
                <li>Darkvision Challenge May 2025</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2024</h3>
              <ul>
                <li>ESA's Fly Your Satellite April 2024</li>
                <li>SFU CS Industry Day April 2024</li>
                <li>ESA's Fly Your Satellite February 2024</li>
                <li>Star Wars for Kids by Vancouver Symphony Orchestra February 2024</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2023</h3>
              <ul>
                <li>Gifts of the Cosmos Orchestra November 2023</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2020</h3>
              <ul>
                <li>SFU SEE Building Visit by Lieutenant Governor and Governor General February 2020</li>
                <li>SFU Aerospace Info Session February 2020</li>
                <li>Women in STEM Conference February 2020</li>
                <li>McMillan Cosmic Night January 2020</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2019</h3>
              <ul>
                <li>McMillan Cosmic Night November 2019</li>
                <li>Science World Girls and STEAM November 2019</li>
                <li>Science Spooktacular October 2019</li>
                <li>SFU Aerospace Info Session September 2019</li>
                <li>FAS Welcome Days September 2019</li>
                <li>SFU Aerospace Showcase July 2019</li>
                <li>Victory Square Girls Camp July 2019</li>
                <li>Science Rendezvous & International Day of Astronomy May 2019</li>
                <li>McMillan Cosmic Night May 2019</li>
                <li>McMillan Cosmic Night January 2019</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2018</h3>
              <ul>
                <li>Technovation App Inventor Session November 2018</li>
                <li>Science World Girls and STEAM November 2018</li>
                <li>Science Spooktacular October 2018</li>
                <li>SFU Aerospace Info Session September 2018</li>
                <li>McMillan Cosmic Night Fall 2018</li>
                <li>Victory Square Girls Camp July 2018</li>
                <li>Stick'in Stars/ Girls in Action July 2018</li>
                <li>Try / Catch June 2018</li>
                <li>Science Rendezvous & International Day of Astronomy May 2018</li>
                <li>Girls Get IT May 2018</li>
                <li>Go CODE Girl May 2018</li>
                <li>Young Western Canadian Entrepreneurs May 2018</li>
                <li>McMillan Cosmic Night Summer 2018</li>
                <li>Burnaby Festival of Learning Summer 2018</li>
                <li>McMillan Space Centre Weekend Event Summer 2018</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2017</h3>
              <ul>
                <li>Science Spooktacular October 2017</li>
                <li>Middle School Visit October 2017</li>
                <li>MSE FROSH September 2017</li>
                <li>Science Rendezvous & International Day of Astronomy April 2017</li>
                <li>Girls Get IT March 2017</li>
                <li>BC Tech Talks February 2017</li>
              </ul>
            </div>

            <div className="event-year">
              <h3>2016</h3>
              <ul>
                <li>CleanTech Demo November 2016</li>
                <li>SheTalks November 2016</li>
                <li>Go Eng Girl October 2016</li>
                <li>SD43 Presentation October 2016</li>
                <li>Perseid Meteor Shower Comet Demo August 2016</li>
                <li>Space Lecture Series February 2016</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Putting on an Event?</h2>
          <p>Reach out to us!</p>
          <Link to="/contact" className="cta-button">CONTACT US</Link>
        </div>
      </section>
    </div>
  );
};

export default Outreach;
