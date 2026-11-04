import React from 'react';
import './Balloon1.css';
import RecruitingBanner from '../RecruitingBanner';

const Balloon1Page: React.FC = () => (
  <div className="aleasat-page">
    <section className="aleasat-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Balloon 1</h1>
          <p className="hero-subtitle">High Altitude Balloon Mission 1</p>
          <p className="hero-description">Latobius was the first High Altitude Balloon launched by SFU Satellite Design Team, testing integration capabilities before CSDC4.</p>
        </div>
        <div className="hero-image">
          <img src="/images/site/image8.jpeg" alt="Balloon 1" className="aleasat-main-image" loading="eager" decoding="async" />
        </div>
      </div>
    </section>
    <RecruitingBanner program="balloon" />
    <section className="project-narrative">
      <div className="container">
        <h2>About Balloon 1</h2>
        <p>
          Balloon 1, also known as Latobius, was our first high altitude balloon mission. It provided a foundation for future projects and helped the team develop essential integration skills.
        </p>
      </div>
    </section>
  </div>
);

export default Balloon1Page;
