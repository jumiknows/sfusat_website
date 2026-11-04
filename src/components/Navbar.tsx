// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Soundtrack from './Soundtrack';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/outreach', label: 'Outreach' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact Us' }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isPastHero, setIsPastHero] = useState(false);
  const isOverlay = location.pathname === '/' && !isPastHero;

  // On the home page the bar sits over the flight sequence, then turns solid
  useEffect(() => {
    let pending = 0;
    const update = () => {
      pending = 0;
      const mission = document.querySelector('.mission');
      setIsPastHero(mission ? mission.getBoundingClientRect().bottom <= window.innerHeight : true);
    };
    const handleScroll = () => {
      pending = pending || requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(pending);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const navbar = document.querySelector('.navbar');
      const isClickInsideNavbar = navbar?.contains(target);
      
      if (!isClickInsideNavbar && isOpen) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${location.pathname === '/' ? 'navbar-home' : ''} ${isOverlay ? 'navbar-overlay' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-logo">
        <Link to="/" aria-label="SFU SAT Home">
          <img 
            src="/images/icons/sfusatlogo.png" 
            alt="SFU SAT Logo" 
            className="logo-button" 
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>
      
      <Soundtrack />

      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="navbar-menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      <ul
        className={`navbar-links ${isOpen ? 'open' : ''}`}
        id="navbar-menu"
      >
        {NAV_ITEMS.map(({ to, label }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

          return (
            <li key={to}>
              <Link
                to={to}
                onClick={closeMenu}
                className={isActive ? 'active' : ''}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
        <li className="navbar-join">
          <Link to="/join" onClick={closeMenu} aria-current={location.pathname === '/join' ? 'page' : undefined}>
            Join
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
