import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const NotFound: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Page not found</h1>
      <p>The page you are looking for may have moved or no longer exists.</p>
      <div className="contact-buttons">
        <Link to="/" className="contact-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
