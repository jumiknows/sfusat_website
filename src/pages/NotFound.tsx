import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const NotFound: React.FC = () => {
  return (
    <div className="contact-container not-found">
      <h1 style={{ color: '#fff' }}>Page not found</h1>
      <p style={{ color: '#b4bac2' }}>The page you are looking for may have moved or no longer exists.</p>
      <div className="contact-buttons">
        <Link to="/" className="btn btn-solid">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
