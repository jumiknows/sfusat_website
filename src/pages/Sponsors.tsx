import React from 'react';
import { Link } from 'react-router-dom';
import SectionNav from '../components/SectionNav';
import { SPONSOR_TIERS } from '../content/sponsors';
import './Sponsors.css';

const Sponsors: React.FC = () => {
  return (
    <div className="sponsors-page">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1>Sponsors</h1>
          <p>Organizations that support our work.</p>
          <Link to="/contact?subject=Sponsorship" className="btn btn-solid page-hero-action">Become a sponsor</Link>
        </div>
      </header>
      <SectionNav
        label="On this page"
        sections={[
          { id: 'platinum', label: 'Platinum' },
          { id: 'gold', label: 'Gold' },
          { id: 'silver', label: 'Silver' },
          { id: 'bronze', label: 'Bronze' },
          { id: 'why', label: 'Why sponsor' }
        ]}
      />
      <div className="container">
        
        {SPONSOR_TIERS.map((tier) => (
          <section key={tier.id} className={`sponsor-tier ${tier.id}`} id={tier.id}>
            <h2 className="tier-title">{tier.title}</h2>
            <ul className="sponsor-grid">
              {tier.sponsors.map((sponsor) => (
                <li key={sponsor.name} className="sponsor-card">
                  <div className="sponsor-card-logo">
                    <img src={sponsor.logo} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="sponsor-card-text">
                    <h3>{sponsor.name}</h3>
                    <p>{sponsor.about}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Why Sponsor Us Section */}
        <section className="why-sponsor" id="why">
          <div>
            <h2>Why Sponsor Us?</h2>
            <p>
            The SFU Satellite Design Team is the product of the hard work and dedication from SFU students on providing opportunities to the community. Our success and progress could not 
            be achieved without support from sponsors and community leaders. With your support, the team can continue to inspire future generations of space explorers, engineers and 
            business leaders through technological development and educational outreach.
          </p>
          </div>
          <div className="why-sponsor-action">
            <h3>Help Us Build a Satellite</h3>
            <Link to="/contact?subject=Sponsorship" className="btn btn-solid">Contact us</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsors;
