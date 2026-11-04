import React from 'react';
import { Link } from 'react-router-dom';
import { INSTAGRAM_URL } from '../content/contact';
import { PROGRAMS, Program, recruitingSummary } from '../content/recruitment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import LoopVideo from '../components/LoopVideo';
import './Join.css';

interface JoinProps {
  programs?: Program[];
}

const Join: React.FC<JoinProps> = ({ programs = PROGRAMS }) => {
  const open = programs.filter((program) => program.open);
  const closed = programs.filter((program) => !program.open);

  return (
    <div className="join-page">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>Join us</h1>
          <p>Develop your skills, prepare for a future career, and build lasting connections within our alumni network.</p>
        </div>
      </header>

      <div className="container join-body">
        <p className="join-summary">{recruitingSummary(programs)}</p>

        {open.map((program) => (
          <section key={program.id} className="join-program">
            <div className="join-program-header">
              <h2>{program.name}</h2>
              <span className="join-program-links">
                {program.packageUrl && (
                  <a href={program.packageUrl} target="_blank" rel="noopener noreferrer">Hiring package</a>
                )}
                <Link to={program.page}>About this program</Link>
              </span>
            </div>
            {program.deadline && <p className="join-deadline">Apply by {program.deadline}</p>}

            <ul className="join-roles">
              {program.roles.map((role) => (
                <li key={role.name}>
                  <div className="join-role">
                    {role.icon && <span className="card-icon" aria-hidden="true"><FontAwesomeIcon icon={role.icon} /></span>}
                    <div>
                      <h3>{role.name}</h3>
                      <p>{role.description}</p>
                    </div>
                  </div>
                  <a
                    href={role.form}
                    className="btn btn-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Apply for ${role.name}, ${program.name}`}
                  >
                    Apply <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="join-life">
          <h2>The team at work</h2>
          <div className="join-life-grid">
            <figure>
              <LoopVideo name="team-session" label="Team members working on laptops during a session in a lecture hall" />
              <figcaption>A team work session</figcaption>
            </figure>
            <figure>
              <img src="/images/team/team-presentation.jpg" alt="Team members at tables watching a presentation in a timber-framed hall" loading="lazy" />
              <figcaption>A team presentation</figcaption>
            </figure>
            <figure>
              <img src="/images/team/team-social.jpg" alt="Team members laughing and holding up lettuce leaves while preparing food together" loading="lazy" />
              <figcaption>Preparing food at a team event</figcaption>
            </figure>
          </div>
        </section>

        {closed.length > 0 && (
          <section className="join-closed">
            <h2>Not recruiting right now</h2>
            <ul>
              {closed.map((program) => (
                <li key={program.id}>
                  <Link to={program.page}>{program.name}</Link>
                  {program.closedNote && <span>{program.closedNote}</span>}
                  {program.roles[0] && (
                    <a href={program.roles[0].form} target="_blank" rel="noopener noreferrer">
                      View the closed form
                    </a>
                  )}
                  {program.packageUrl && (
                    <a href={program.packageUrl} target="_blank" rel="noopener noreferrer">
                      Hiring package
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p>
              Interested anyway? <Link to="/contact?subject=Joining%20SFU%20SAT">Get in touch</Link> and tell us what you would like to work on, or follow us on{' '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a> to hear when applications open.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Join;
