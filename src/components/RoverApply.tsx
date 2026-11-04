import React from 'react';
import { Link } from 'react-router-dom';
import RoverRunnerGame from './rover/RoverRunnerGame';
import RoverScene from './rover/RoverScene';
import { getProgram } from './recruitment';
import './RoverApply.css';

const rover = getProgram('rover');
const TEAM_FORMS = rover?.open ? rover.roles : [];

const RoverApply: React.FC = () => {
  return (
    <div className="rover-apply-page">
      <section className="ra-hero">
        <div className="ra-hero-grid">
          <div className="ra-copy">
            <h1>Rover Team Applications</h1>
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
          <p>
            {TEAM_FORMS.length > 0
              ? 'Select one subsystem form to apply to. You can submit more than one if your skillset spans teams.'
              : <>Rover recruitment is closed right now. See <Link to="/join">what is open</Link>.</>}
          </p>
        </div>

        <div className="ra-team-grid">
          {TEAM_FORMS.map((team) => (
            <a
              key={team.name}
              className="ra-team-card"
              href={team.form}
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