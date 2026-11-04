import React from 'react';
import './CCP1.css';

const CCP1Page: React.FC = () => (
  <div className="aleasat-page">
    <section className="aleasat-hero hero-immersive">
      <div className="hero-content">
        <div className="hero-text">
          <h1>CCP1</h1>
          <p className="hero-subtitle">Canadian CubeSat Project 1</p>
          <p className="hero-description">A collaboration with two other universities to build a 2U CubeSat, funded by the Canadian Space Agency.</p>
        </div>
        <div className="hero-image">
          <img src="/images/site/ccp1-night.jpg" alt="CCP1" className="aleasat-main-image" loading="eager" decoding="async" />
        </div>
      </div>
    </section>
    <section className="project-narrative">
      <div className="container">
        <h2>About CCP1</h2>
        <p>
          CCP1 was a major step forward for our team, partnering with other universities to design and build a 2U CubeSat. Supported by the Canadian Space Agency, this project expanded our technical capabilities and fostered collaboration across institutions.
        </p>
      </div>
    </section>
  </div>
);

export default CCP1Page;
