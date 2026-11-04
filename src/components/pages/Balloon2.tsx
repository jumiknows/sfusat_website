import React from 'react';
import './Balloon2.css';

const Balloon2Page: React.FC = () => (
  <div className="aleasat-page">
    <section className="aleasat-hero hero-immersive">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Balloon 2</h1>
          <p className="hero-subtitle">High Altitude Balloon Mission 2</p>
          <p className="hero-description">Our second high altitude balloon mission, providing invaluable experience for new members and future project leads.</p>
        </div>
        <div className="hero-image">
          <img src="/images/site/dusk-launch.jpg" alt="Balloon 2" className="aleasat-main-image" loading="eager" decoding="async" />
        </div>
      </div>
    </section>
    <section className="project-narrative">
      <div className="container">
        <h2>About Balloon 2</h2>
        <p>
          Balloon 2 built on the success of our first mission, allowing new members to gain hands-on experience in high altitude ballooning. Many participants from this project went on to lead future satellite and balloon missions.
        </p>
      </div>
    </section>
  </div>
);

export default Balloon2Page;
