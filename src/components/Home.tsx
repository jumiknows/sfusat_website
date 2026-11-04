// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MissionSequence from './MissionSequence';
import './Home.css';

const STATS = [
  { value: '15,200', label: 'People reached through outreach' },
  { value: '45+', label: 'Outreach events' },
  { value: '50+', label: 'Team members' },
  { value: '10+', label: 'Years active' }
];

const SPONSORS = [
  { src: '/images/sponsors/sponsor/Momentus.png', name: 'Momentus' },
  { src: '/images/sponsors/sponsor/mda.png', name: 'MDA' },
  { src: '/images/sponsors/sponsor/agi.png', name: 'AGI' },
  { src: '/images/sponsors/sponsor/DigiKey.png', name: 'DigiKey' },
  { src: '/images/sponsors/sponsor/valispace.png', name: 'Valispace' },
  { src: '/images/sponsors/sponsor/csa.png', name: 'Canadian Space Agency' }
];

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <MissionSequence />

      <section className="home-stats" aria-label="SFU SAT in numbers">
        <dl>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd>{stat.value}</dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel">
        <img src="/images/site/dusk-launch.jpg" alt="Team preparing a high altitude balloon in a field at dusk" loading="lazy" />
        <div className="panel-inner">
          <h2>Built here. Flown for real.</h2>
          <p>Every mission starts on the ground, with people, hardware and a launch window.</p>
          <div className="panel-actions">
            <Link to="/projects" className="btn btn-ghost">See every mission</Link>
          </div>
        </div>
      </section>

      <section className="home-sponsors">
        <div className="home-sponsors-inner">
          <div>
            <h2>Backed by industry</h2>
            <p>Our sponsors help make this hardware possible.</p>
            <Link to="/sponsors" className="btn btn-dark">Become a sponsor</Link>
          </div>
          <ul>
            {SPONSORS.map((sponsor) => (
              <li key={sponsor.name}>
                <img src={sponsor.src} alt={sponsor.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel panel-join">
        <img src="/images/site/earth-horizon.jpg" alt="" loading="lazy" />
        <div className="panel-inner">
          <h2>Help us go further</h2>
          <div className="panel-actions">
            <Link to="/rover/apply" className="btn btn-solid">Apply now</Link>
            <Link to="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
