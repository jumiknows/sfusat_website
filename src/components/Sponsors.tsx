import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faMedal, faTrophy } from '@fortawesome/free-solid-svg-icons';
import SectionNav from './SectionNav';
import './Sponsors.css';

const Sponsors: React.FC = () => {
  // Preload critical sponsor images
  useEffect(() => {
    const preloadImages = [
      "/images/sponsors/sponsor/Momentus.png",
      "/images/sponsors/sponsor/mda.png",
      "/images/sponsors/sponsor/agi.png",
      "/images/sponsors/sponsor/csa.png",
      "/images/sponsors/sponsor/DigiKey.png"
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
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
          { id: 'silver', label: 'Silver' },
          { id: 'bronze', label: 'Bronze' },
          { id: 'why', label: 'Why sponsor' }
        ]}
      />
      <div className="container">
        
        {/* Platinum Sponsors Section */}
        <section className="sponsor-tier platinum" id="platinum">
          <h2 className="tier-title"><FontAwesomeIcon icon={faTrophy} /> Platinum Sponsors</h2>
          
          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/Momentus.png" 
                alt="Momentus Space" 
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>Momentus Space</h3>
              <p>
                Founded in 2017, Momentus was born out of countless discussions with satellite operators looking for rides to destinations which weren't commercially 
                being offered. Their mission is simple: they want enterprise and existence to flourish in space and they know that creating truly efficient in-space 
                transportation will make that possible.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/sfss.png" 
                alt="Simon Fraser Student Society" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>Simon Fraser Student Society</h3>
              <p>
                The Simon Fraser Student Society is a student-led organization that represents and advocates for the interests of the 25,000+ undergraduate students 
                at SFU. They are the not-for-profit support network and voice for students at SFU and provide services and support to make student life better.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/agi.png" 
                alt="AGI" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>AGI</h3>
              <p>
                At AGI, they've been crafting breakthroughs since 1989. Their software is integral to the success of hundreds of organizations throughout the 
                aerospace, defense, and telecommunications industries, among others. Some of the most important air, space, and defense programs of the past 30 
                years have relied on the products they build.
              </p>
            </div>
          </div>
        </section>

        {/* Silver Sponsors Section */}
        <section className="sponsor-tier silver" id="silver">
          <h2 className="tier-title"><FontAwesomeIcon icon={faMedal} /> Silver Sponsors</h2>
          
          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/mda.png" 
                alt="MDA" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>MDA</h3>
              <p>
                MDA develops and delivers advanced surveillance and intelligence solutions, defence and maritime systems, radar geospatial imagery, space robotics, 
                satellite antennas, and communication subsystems. From locations across Canada, MDA's global reach and heritage serving international markets with 
                innovative and iconic solutions for space and terrestrial applications is unparalleled.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/csa.png" 
                alt="Canadian Space Agency" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>Canadian Space Agency</h3>
              <p>
                Established in March 1989, the CSA is a federal agency responsible for managing all of Canada's civil space-related activities. The objectives of the 
                Agency are to promote the peaceful use and development of space, to advance the knowledge of space through science and to ensure that space 
                science and technology provide social and economic benefits for Canadians.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/SFUAerospace.jpeg" 
                alt="SFU Aerospace" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>SFU Aerospace</h3>
              <p>
                SFU Aerospace is a joint initiative among the three largest aerospace teams at Simon Fraser University: they are an administrative team working to 
                represent each design team in their efforts for funding and resources. Together, they represent over 140 students and their ambitious goals from 
                designing and building satellites, rockets, and autonomous drones.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/SFUFAS.png" 
                alt="SFU Faculty of Applied Science" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>SFU Faculty of Applied Science</h3>
              <p>
                In the Faculty of Applied Sciences, they are shaping tomorrow's technology leaders in computing science and engineering. They offer challenging 
                areas of study complemented by unique learning experiences to foster a spirit of innovation and entrepreneurship, professional growth and leadership 
                ability.
              </p>
            </div>
          </div>
        </section>

        {/* Bronze Sponsors Section */}
        <section className="sponsor-tier bronze" id="bronze">
          <h2 className="tier-title"><FontAwesomeIcon icon={faAward} /> Bronze Sponsors</h2>
          
          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/tallysman.png" 
                alt="Tallysman Wireless" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>Tallysman Wireless</h3>
              <p>
                Tallysman® is a developer, manufacturer, and provider of GNSS, Iridium and Globalstar antennas and accessories in support of their customers who are 
                engaged in a broad range of satellite-based positioning, navigation, and data applications. Based in Ottawa Canada, Tallysman is focused on high 
                function, high performance technology and solutions. Their core competencies include digital wireless networks, RF and Global Navigation Satellite 
                Systems (GNSS) component design.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/MSE-Logo.jpg" 
                alt="SFU Mechatronic Systems Engineering" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>SFU Mechatronic Systems Engineering</h3>
              <p>
                Mechatronics is a dynamic, multidisciplinary subject combining three engineering fields: mechanical, electrical and software engineering. This highly 
                integrated approach creates smart, inventive and evermore efficient solutions for a wide range of high-tech engineering problems.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/SFUCS.jpg" 
                alt="SFU Computing Science" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>SFU Computing Science</h3>
              <p>
                The School of Computing Science follows SFU's tradition of excellence in teaching and research. Their research is world-renowned, and their students 
                graduate with advanced knowledge in areas such as networks, multimedia, healthcare and telecommunications. Many graduates apply their broad-
                based skills as entrepreneurs and business leaders in their field.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/SFUENSC.jpg" 
                alt="SFU Engineering Science" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>SFU Engineering Science</h3>
              <p>
                Their students acquire a rich foundation of skills then work with the faculty to drive and develop new ideas within their five main program areas: 
                biomedical engineering, computer engineering, electronics engineering, engineering physics and systems engineering.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/valispace.png" 
                alt="Valispace" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>Valispace</h3>
              <p>
                The limits of today's engineering are not the imagination of engineers, but the tools for collaboration: the more complex a product becomes, the more 
                engineers need to work together on it. They want small engineering teams to be able to design highly complex systems fast and cheap 
                and big engineering teams to build things which seem like magic to us today.
              </p>
            </div>
          </div>

          <div className="sponsor-item">
            <div className="sponsor-logo">
              <img 
                src="/images/sponsors/sponsor/DigiKey.png" 
                alt="Digi-Key" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sponsor-content">
              <h3>Digi-Key</h3>
              <p>
                Headquartered in Thief River Falls, Minnesota, USA, Digi-Key is one of the fastest growing distributors of electronic components in the world. Today 
                Digi-Key offers the world's largest selection of electronic components in stock and available for immediate shipment. From prototype to production, 
                they are here to fuel innovation all over the world.
              </p>
            </div>
          </div>
        </section>

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
