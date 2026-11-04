import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import InstagramIcon from './InstagramIcon';
import './Footer.css'; // Ensure the CSS is properly imported
import { CONTACT_EMAIL, INSTAGRAM_URL } from './contactConfig';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/icons/sfusatlogo.png" alt="SFU SAT" />
          <p>The SFU Satellite Design Team at Simon Fraser University.</p>
        </div>
        <nav aria-label="Footer">
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
          <a href={`mailto:${CONTACT_EMAIL}`} className="footer-icon-link"><FontAwesomeIcon icon={faEnvelope} /> {CONTACT_EMAIL}</a>
          <a href={INSTAGRAM_URL} className="footer-icon-link" target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram</a>
        </nav>
      </div>
      <p className="footer-legal">© 2016 - 2026 SFU Satellite Design Team</p>
    </footer>
  );
};

export default Footer;
