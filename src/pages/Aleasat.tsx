import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import LoopVideo from '../components/LoopVideo';
import RecruitingBanner from '../components/RecruitingBanner';
import SectionNav from '../components/SectionNav';
import Slideshow from '../components/Slideshow';
import { ALEASAT_PHOTOS, ALEASAT_TEST_PHOTOS as TESTING_PHOTOS } from '../content/galleries';
import './Aleasat.css';

const AleasatPage: React.FC = () => {

  return (
  <div className="aleasat-page">
      {/* Hero Section */}
      <section className="aleasat-hero hero-immersive hero-aleasat">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">ALEASAT</h1>
            <p className="hero-subtitle">1U CubeSat with UBC Orbit</p>
            <p className="hero-description">
              A 1U CubeSat mission built in partnership with UBC Orbit, with launch targeted for 2028.
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="/images/aleasat/hardware-on-test-table.jpg" 
              alt="ALEASAT flight hardware on a perforated test table, with blue wiring running from the stack" 
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
          <h2>Going to Orbit</h2>
          <div className="split-body">
            <p>SFU Satellite Design Team has partnered with UBC Orbit to design, build, and launch a 1U (10x10x10cm) cube satellite. The project started in January 2020 with plans to launch the satellite to low-earth-orbit (LEO), with launch targeted for 2028.</p>
            <div className="orbit-columns">
              <div>
                <h3>Primary Payloads</h3>
                <ul className="plain-list">
                <li>
                  <h4>Earth Imaging Camera</h4>
                  <p>Amateur radio operators can request pictures of their area through our satellite communication system.</p>
                </li>
                <li>
                  <h4>Miniaturized Centrifuge</h4>
                  <p>Testing human physiology effects for long-term space missions in partnership with SFU Aerospace Physiology Laboratory.</p>
                </li>
                </ul>
              </div>
              <div>
                <h3>Mission Impact</h3>
                <ul className="plain-list">
                <li>
                  <h4>Hands-on Experience</h4>
                  <p>Students get real satellite engineering experience.</p>
                </li>
                <li>
                  <h4>Fourth Canadian Team</h4>
                  <p>We would be the fourth Canadian undergraduate team to launch a satellite.</p>
                </li>
                <li>
                  <h4>Spaceflight Research</h4>
                  <p>Contributing to human spaceflight research in Canada.</p>
                </li>
                </ul>
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
          
          <Slideshow images={ALEASAT_PHOTOS} />
        </div>
      </section>
    </div>
  );
}

export default AleasatPage;
