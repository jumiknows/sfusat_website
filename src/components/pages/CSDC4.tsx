import React from 'react';
import './CSDC4.css';


const CSDC4Page: React.FC = () => (
  <div className="aleasat-page">
    {/* Hero Section */}
    <section className="aleasat-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-heading">Canadian Satellite Design Challenge 4</h1>
          <p className="hero-subtitle">Our Debut</p>
        </div>
        <div className="hero-image">
          <img src="https://media.githubusercontent.com/media/balloon4computing/artifact/main/image6.jpeg" alt="CSDC4" className="aleasat-main-image" loading="eager" decoding="async" />
        </div>
      </div>
    </section>

    {/* Project Narrative Section */}
    <section className="project-narrative">
      <div className="container">
        <h2>The Start of Something...</h2>
        <p>
          The Canadian Satellite Design Challenge is a Canada-wide competition for teams of university students (undergraduate and graduate) to design and build a small satellite. The satellites will undergo full launch and space environmental qualification testing.
        </p>
        <p>
          The SFU Satellite Design Team participated in this event with our payload to be a radio calibration source for one of Canada's largest radio telescopes. This mission would greatly aid in the precision of their observations contributing to Canadian scientific research into the age of the universe and its expansion, in particular, dark energy.
        </p>
        <p>
          Even though it was our first competition and we are a small program, during our Critical Design Review (CDR) by qualified space industry personal we achieved 5th place out of 15+ Universities. Where we were only beaten by large universities with dedicated aerospace programs.
        </p>
        <p>
          During this time we developed custom hardware for every system within our team. We scored particularly well on our Command & Data Handling and Radio Frequency systems which led to our participation in the Canadian CubeSat Project 1.
        </p>
        <p>
          Through the sponsorships of Telus, Mobify, EGBC, Solidworks, SFSS and FAS we were able to design and build a cube satellite while also keeping educational outreach with both high school and elementary school students a priority.
        </p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <img src="/images/projects/image19" alt="CSDC4 Hardware 1" style={{ maxWidth: '300px', borderRadius: '16px' }} />
          <img src="/images/projects/image17" alt="CSDC4 Hardware 2" style={{ maxWidth: '300px', borderRadius: '16px' }} />
        </div>
      </div>
    </section>
  </div>
);

export default CSDC4Page;
