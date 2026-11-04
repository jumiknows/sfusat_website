import React from 'react';
import './CSDC5.css';


const CSDC5Page: React.FC = () => (
  <div className="aleasat-page">
    {/* Hero Section */}
    <section className="aleasat-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-heading">Canadian Satellite Design Challenge 5</h1>
          <p className="hero-subtitle">Refining our Skills</p>
        </div>
        <div className="hero-image">
          <img src="/images/site/image3.png" alt="CSDC5" className="aleasat-main-image" loading="eager" decoding="async" />
        </div>
      </div>
    </section>

    {/* Project Narrative Section */}
    <section className="project-narrative">
      <div className="container">
        <h2>Taking the Selfie out of This World</h2>
        <p>
          In the 5th round of the CSDC, teams are challenged to undertake the ultimate, global educational outreach program. The CubeSat that is required from each team must be able to communicate with anyone on earth who has an amateur radio licence, otherwise known as an ARO (Amateur Radio Operator).
        </p>
        <p>
          The ARO should be able to call the satellite and ask for a selfie, the cube satellite will then tell the ARO when the selfie will take place and then take a photo of the ARO's location and downlink it immediately along with Canadian photos and stories relating to the Aerospace industry here in Canada.
        </p>
        <p>
          The secondary payload was a modified non-viral cell line to study the effects of radiation and microgravity on the reversal of HIV latency.
        </p>
        <p>
          Canadian Satellite Design Challenge 5 was to operate from Q3 2018 - Q3 2020. In December of 2019 we decided to pivot away from this project to focus our resources on ALEASAT. Much of the hardware design was reused from CSDC5 for ALEASAT as well as the primary payload.
        </p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <img src="/images/projects/image20" alt="CSDC5 Hardware 1" style={{ maxWidth: '300px', borderRadius: '16px' }} />
          <img src="/images/projects/image21" alt="CSDC5 Hardware 2" style={{ maxWidth: '300px', borderRadius: '16px' }} />
          <img src="/images/projects/image22" alt="CSDC5 Hardware 3" style={{ maxWidth: '300px', borderRadius: '16px' }} />
        </div>
      </div>
    </section>
  </div>
);

export default CSDC5Page;
