import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure the CSS is properly imported
import { CONTACT_EMAIL } from './contactConfig';

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
          <Link to="/rover/apply">Apply</Link>
          <Link to="/sponsors">Sponsor us</Link>
          <Link to="/contact">Contact</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
      </div>
      <p className="footer-legal">© 2016 - 2026 SFU Satellite Design Team</p>
    </footer>
  );
};

export default Footer;
