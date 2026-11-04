import React from 'react';
import { Link } from 'react-router-dom';
import SocialIcon from './SocialIcon';
import './Footer.css'; // Ensure the CSS is properly imported
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../content/contact';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/icons/sfusatlogo.png" alt="SFU SAT" />
          <p>The SFU Satellite Design Team at Simon Fraser University.</p>
        </div>
        <nav aria-label="Explore">
          <h2>Explore</h2>
          <Link to="/projects">Projects</Link>
          <Link to="/rover">Rover</Link>
          <Link to="/outreach">Outreach</Link>
          <Link to="/about">About</Link>
        </nav>
        <nav aria-label="Get involved">
          <h2>Get involved</h2>
          <Link to="/join">Join</Link>
          <Link to="/sponsors">Sponsor us</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer-connect">
          <h2>Connect</h2>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <div className="footer-social">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.network} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <SocialIcon network={link.network} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <p>© 2016 - 2026 SFU Satellite Design Team</p>
      </div>
    </footer>
  );
};

export default Footer;
