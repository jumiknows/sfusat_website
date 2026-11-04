// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MissionSequence from '../components/MissionSequence';
import { recruitingSummary } from '../content/recruitment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { HOME_MISSIONS, HOME_SPONSORS, HOME_STATS } from '../content/home';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <MissionSequence />

      <section className="panel panel-people panel-esa">
        <img src="/images/aleasat/hardware-on-test-table.jpg" alt="ALEASAT camera and electronics stack, wired for testing, on a perforated test table" loading="lazy" />
        <div className="panel-inner">
          <h2>Tested at ESA</h2>
          <p>In June 2026, the ALEASAT engineering model went through vibration and thermal vacuum testing at ESA's CubeSat Support Facility in Belgium.</p>
          <div className="panel-actions">
            <Link to="/projects/aleasat" className="btn btn-ghost">About ALEASAT</Link>
            <a href="https://education.esa.int/green_light_for_aleasat_test_opportunity/" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              ESA article <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </section>

      <section className="home-stats" aria-label="SFU SAT in numbers">
        <dl>
          {HOME_STATS.map((stat) => (
            <div key={stat.label}>
              <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={stat.icon} /></span>
              <dd>{stat.value}</dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="home-sponsors">
        <div className="home-sponsors-inner">
          <div>
            <h2>Our sponsors</h2>
            <p>These organizations support our work.</p>
            <Link to="/sponsors" className="btn btn-dark">Become a sponsor</Link>
          </div>
          <ul>
            {HOME_SPONSORS.map((sponsor) => (
              <li key={sponsor.name}>
                <img src={sponsor.src} alt={sponsor.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-missions">
        <div className="section-head">
          <h2>Our missions</h2>
          <Link to="/projects" className="text-link">All projects <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
        <ul>
          {HOME_MISSIONS.map((mission) => (
            <li key={mission.to}>
              <Link to={mission.to}>
                <img src={mission.image} alt={mission.alt} className={mission.isLogo ? 'mission-logo' : undefined} loading="lazy" />
                <h3>{mission.name} <FontAwesomeIcon icon={faArrowRight} /></h3>
                <p>{mission.detail}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel panel-split">
        <div className="panel-split-text">
          <h2>Who we are</h2>
          <p>We are the SFU Satellite Design Team. We design, build and launch our own space hardware at Simon Fraser University.</p>
          <div className="panel-actions">
            <Link to="/about" className="btn btn-ghost">About the team</Link>
          </div>
        </div>
        <img src="/images/team/team-at-esa.jpg" alt="Four team members in ESA cleanroom gowns beside a vibration test machine" loading="lazy" />
      </section>

      <section className="panel panel-join">
        <img src="/images/site/earth-horizon.jpg" alt="" loading="lazy" />
        <div className="panel-inner">
          <h2>Join us</h2>
          <p>{recruitingSummary()} Develop your skills, prepare for a future career, and build lasting connections within our alumni network.</p>
          <div className="panel-actions">
            <Link to="/join" className="btn btn-solid">See open roles</Link>
            <Link to="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
