import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBookOpen, faBullhorn, faCalendarDays, faCompass, faCube, faEarthAmericas, faFlagCheckered, faFlask, faHandshake, faLayerGroup, faLightbulb, faMicrochip, faPeopleGroup, faRocket, faSatellite, faTowerBroadcast, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import SectionNav from './SectionNav';
import './About.css';

const SECTIONS = [
  { id: 'mission', label: 'Mission' },
  { id: 'teams', label: 'Teams' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'values', label: 'Values' }
];

const MILESTONES = [
  { date: '2016', icon: faBullhorn, text: 'First outreach events on record, including SheTalks and a CleanTech demo.' },
  { date: '2018', icon: faTrophy, text: 'Canadian Satellite Design Challenge 5 begins.' },
  { date: 'January 2020', icon: faSatellite, text: 'ALEASAT begins with UBC Orbit.' },
  { date: 'August 2021', icon: faRocket, text: 'Balloon 3 launches from Carbon, Alberta, reaches 34 km and is recovered.' },
  { date: 'January 2024', icon: faFlagCheckered, text: 'ALEASAT is selected for the February 2024 test window of ESA\'s Fly Your Satellite! Test Opportunities programme.' },
  { date: 'June 2026', icon: faFlask, text: 'The ALEASAT engineering model is tested at ESA\'s CubeSat Support Facility in Belgium.' },
  { date: 'August 2027', icon: faFlagCheckered, text: 'Polaris is headed for the Canadian International Rover Challenge.' },
  { date: '2028', icon: faSatellite, text: 'Target launch date for ALEASAT.' }
];

const AboutPage: React.FC = () => {
  // Preload critical images
  useEffect(() => {
    const preloadImages = [
      "/images/site/team.jpg",
      "/images/site/adcs.png",
      "/images/site/obc.jpg"
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  const teams = [
    {
      id: 1,
      icon: faCompass,
      name: "Attitude Determination and Control System (ADCS)",
      image: "/images/site/adcs.png",
      description: "Attitude Determination and Control System (ADCS) is in charge of the various sensors used to determine the orientation and position of the satellite, as well as re-orienting the satellite when necessary. With the many sensors onboard a satellite, the ADCS team is currently working on a sensor fusion and filtration algorithm to eliminate noise for the On-Board Computer (OBC). Additionally, the team is designing and building a custom test rig for the satellite actuators, which will simultaneously test the magnetorquers and control algorithm."
    },
    {
      id: 2,
      icon: faMicrochip,
      name: "Command and Data Handling (C&DH)",
      image: "/images/site/obc.jpg",
      description: "The Command and Data Handling team (C&DH) works hard to develop the onboard computer (OBC) for our satellites. We design custom circuit boards and create specialized firmware to meet the satellite's needs. We also handle the management of executing commands, storing data, and gathering telemetry."
    },
    {
      id: 3,
      icon: faTowerBroadcast,
      name: "Communications",
      image: "/images/site/comms.jpg",
      description: "The communications, or RF (Radio Frequency) team, ensures that the satellite can communicate with our ground station back on earth. This communication link will handle the downlink of satellite telemetry and payload data, as well as the uplink of telecommands."
    },
    {
      id: 4,
      icon: faBolt,
      name: "Electrical Power System (EPS)",
      image: "/images/site/eps.jpg",
      description: "The EPS team oversees generation, charging, storage, and budgeting of energy in the satellite. This can go from running models using code and simulation software to researching, designing and testing printable circuit boards (PCBs). Batteries can be highly sensitive, so our job in a nutshell is to make sure the satellite does not run out of power or have any exploding parts."
    },
    {
      id: 5,
      icon: faFlask,
      name: "Payload",
      image: "/images/site/payload.jpg",
      description: "Every project has a payload or reason for existing, and the payload team is in charge of building that. What we do specifically changes from project to project: Previous examples are atmospheric sensors, cameras, and calibration equipment for ground systems. For ALEASAT we are developing a centrifuge payload, which is an adapted reaction wheel. The team has already designed and manufactured a small prototype and is currently building a test rig to verify different operating modes."
    },
    {
      id: 6,
      icon: faCube,
      name: "Structure",
      image: "/images/site/structure.png",
      description: "The structure team is responsible for holding the satellite together under extreme conditions. The team ensures all components are securely mounted within the satellite to survive extreme temperatures and vibrations during launch. They also develop the antenna deployment systems, and perform extensive simulation analyses to ensure the satellite will survive in orbit."
    },
    {
      id: 7,
      icon: faEarthAmericas,
      name: "Mission Operations (Mops)",
      image: "/images/site/mops.png",
      description: "The Mission Operations team (Mops) is responsible for operating the satellite after it launches. This includes assigning missions for the satellite, sending commands to the satellite, accepting image requests from the general public and capturing images for them. We build and operate our control center, Barbour's Cut, which aids our operation and allows for public image requests."
    }
  ];

  return (
    <div className="about-page">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>About</h1>
          <p>A space engineering organization at Simon Fraser University.</p>
        </div>
      </header>
      <SectionNav label="On this page" sections={SECTIONS} />
      {/* Hero Section */}
      {/* <section className="about-hero">
        <div className="about-hero-content">
          <h1>About SFU Satellite Design Team</h1>
          <p className="about-hero-subtitle">
            Inspiring the next generation of space explorers through hands-on satellite engineering and educational outreach
          </p>
        </div>
      </section> */}

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
              <p>
                For the past several years, SFU Satellite Design Team has existed with a clear goal: to provide 
                education and training for future engineers interested in the space industry. The projects we have 
                worked on so far have provided us with extensive knowledge of space systems.
              </p>
              <p>
                Our team allows our members to reach their full potential now in undergrad to prepare them for a 
                fulfilling career in the Aerospace sector after graduation. We believe in learning by doing, 
                tackling real-world engineering challenges that matter.
              </p>
              <div className="mission-stats">
                <div className="stat-item">
                  <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faUsers} /></span>
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Team Members</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faLayerGroup} /></span>
                  <span className="stat-number">7</span>
                  <span className="stat-label">Specialized Teams</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faCalendarDays} /></span>
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years Active</span>
                </div>
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
                    <h3><span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={team.icon} /></span>{team.name}</h3>
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
                <i className="milestone-icon" aria-hidden="true"><FontAwesomeIcon icon={milestone.icon} /></i>
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
            <div className="value-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faBookOpen} /></span>
              <h3>Education First</h3>
              <p>Members teach each other and build technical and professional skills.</p>
            </div>
            <div className="value-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faHandshake} /></span>
              <h3>Collaboration</h3>
              <p>We build satellites as a team, and everyone's input counts.</p>
            </div>
            <div className="value-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faLightbulb} /></span>
              <h3>Innovation</h3>
              <p>We try new technologies so members graduate familiar with current space engineering.</p>
            </div>
            <div className="value-card">
              <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={faPeopleGroup} /></span>
              <h3>Community Impact</h3>
              <p>Through outreach, we show younger students what careers in STEM and space can look like.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;