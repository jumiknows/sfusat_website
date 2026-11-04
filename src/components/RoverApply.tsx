import React from 'react';
import RoverRunnerGame from './rover/RoverRunnerGame';
import RoverScene from './rover/RoverScene';
import './RoverApply.css';

const TEAM_FORMS = [
  {
    name: 'Software',
    description: 'Autonomy, controls, perception, and mission software',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf0SaFq3Bp5PqquvxhZ8WYsAXaWIjtLDgnjWsL0O-mt5ab3Dw/viewform?usp=dialog',
  },
  {
    name: 'Mechanical',
    description: 'Chassis, suspension, drivetrain, and CAD integration',
    url: 'https://forms.gle/iHwPVg9Wqh6QCRJL8',
  },
  {
    name: 'Communications',
    description: 'Ground station, networking, and telemetry pipelines',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdOkB6Hx3VihP10OrrLxeD1P9fog0bEIZX-iHOpLv0BTzj3EQ/viewform?usp=publish-editor',
  },
  {
    name: 'Payload',
    description: 'Science instruments and mission operations support',
    url: 'https://forms.gle/HDMQYYj9xsUTTHzGA',
  },
  {
    name: 'Electrical',
    description: 'Power systems, embedded design, and board bring-up',
    url: 'https://forms.gle/buF63Tt6xngTQuGN6',
  },
];

const RoverApply: React.FC = () => {
  return (
    <div className="rover-apply-page">
      <section className="ra-hero">
        <div className="ra-hero-grid">
          <div className="ra-copy">
            <h1>Choose your subsystem. Build a rover that navigates rugged terrain.</h1>
            <p>
              Apply to join the rover team. Pick the subsystem that fits your skills, or try Rover
              Runner first.
            </p>
            <a className="ra-scroll" href="#team-forms">
              Jump to Team Applications
            </a>
          </div>

          <div className="ra-stage" aria-label="Rover mission visual">
            <RoverScene />
          </div>
        </div>
      </section>

      <section className="ra-game">
        <div className="ra-game-header">
          <h2>Rover Runner</h2>
          <p>
            Press Space or tap Jump to dodge boulders.
          </p>
        </div>

        <RoverRunnerGame />
      </section>

      <section className="ra-team-forms" id="team-forms">
        <div className="ra-team-heading">
          <h2>Team Application Forms</h2>
          <p>Select one subsystem form to apply to. You can submit more than one if your skillset spans teams.</p>
        </div>

        <div className="ra-team-grid">
          {TEAM_FORMS.map((team) => (
            <a
              key={team.name}
              className="ra-team-card"
              href={team.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <span>Open Form</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RoverApply;