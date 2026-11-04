import React from 'react';
import SectionNav from '../components/SectionNav';
import { MILESTONES, MISSION, TEAMS as teams, TEAM_STATS, VALUES } from '../content/about';
import './About.css';

const SECTIONS = [
  { id: 'mission', label: 'Mission' },
  { id: 'teams', label: 'Teams' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'values', label: 'Values' }
];

const AboutPage: React.FC = () => {
    return (
    <div className="about-page">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>About</h1>
          <p>A space engineering organization at Simon Fraser University.</p>
        </div>
      </header>
      <SectionNav label="On this page" sections={SECTIONS} />
      {/* Mission Section */}
      <section className="about-mission" id="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-image">
              <img
                src="/images/site/team.jpg"
                alt="SFU Satellite Design Team"
                className="team-photo"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="mission-text">
              <h2>Our Mission</h2>
              {MISSION.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="mission-stats">
                {TEAM_STATS.map((stat) => (
                  <div key={stat.label} className="stat-item">
                    <span className="stat-number">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="about-teams" id="teams">
        <div className="container">
          <div className="teams-header">
            <h2>Our Teams</h2>
            {/* <p>Each team brings unique expertise to our satellite projects, working together to achieve mission success.</p> */}
          </div>
          
          <div className="teams-grid">
            {teams.map((team, index) => (
              <div 
                key={team.id} 
                className={`team-card ${index % 2 === 0 ? 'team-card-left' : 'team-card-right'}`}
              >
                <div className="team-card-content">
                  <div className="team-info">
                    <h3>{team.name}</h3>
                    <p>{team.description}</p>
                  </div>
                  <div className="team-image">
                    <img 
                      src={team.image} 
                      alt={team.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="about-milestones" id="milestones">
        <div className="container">
          <h2>Milestones</h2>
          <ol>
            {MILESTONES.map((milestone) => (
              <li key={milestone.date}>
                <span>{milestone.date}</span>
                <p>{milestone.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values" id="values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {VALUES.map((value) => (
              <div key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;