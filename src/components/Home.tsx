// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
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
      <section className="panel panel-hero">
        <img
          src="/images/site/team-launch.jpg"
          alt="SFU SAT team members standing beneath an inflated high altitude balloon"
         
        />
        <div className="panel-inner">
          <h1>Making Space Accessible</h1>
          <p>The SFU Satellite Design Team. Students at Simon Fraser University designing and building satellites, rovers and high altitude balloons.</p>
          <div className="panel-actions">
            <Link to="/rover/apply" className="btn btn-solid">Join the team</Link>
            <Link to="/projects" className="btn btn-ghost">See our projects</Link>
          </div>
        </div>
      </section>

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

      <section className="panel panel-split">
        <div className="panel-split-text">
          <h2>ALEASAT</h2>
          <p>Our flagship CubeSat, built with UBC Orbit through the European Space Agency's Fly Your Satellite program.</p>
          <Link to="/projects/aleasat" className="btn btn-ghost">Explore the mission</Link>
        </div>
        <img src="/images/site/aleasat-render.jpg" alt="Render of the ALEASAT CubeSat" loading="lazy" />
      </section>

      <section className="panel panel-side">
        <img src="/images/site/rover-cad.jpg" alt="CAD model from the rover design" loading="lazy" />
        <div className="panel-inner">
          <h2>Polaris Rover</h2>
          <p>An autonomous rover for the Canadian International Rover Challenge in August 2027. We are recruiting now.</p>
          <div className="panel-actions">
            <Link to="/rover" className="btn btn-ghost">Meet the rover</Link>
          </div>
        </div>
      </section>

      <section className="panel">
        <img src="/images/site/dusk-launch.jpg" alt="Team preparing a high altitude balloon in a field at dusk" loading="lazy" />
        <div className="panel-inner">
          <h2>To 34 km and back</h2>
          <p>New recruits start with a high altitude balloon. Balloon 3 climbed to 34 km and travelled 83.5 km before it was recovered.</p>
          <div className="panel-actions">
            <Link to="/projects/balloon3" className="btn btn-ghost">Read about the flight</Link>
          </div>
        </div>
      </section>

      <section className="home-sponsors">
        <div className="home-sponsors-inner">
          <div>
            <h2>Backed by industry</h2>
            <p>Our sponsors help make student-built space hardware possible.</p>
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
          <h2>Build something that leaves the ground</h2>
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
