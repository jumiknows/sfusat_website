import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const balloon3Images = [
  "image1","image2","image3","image4","image5","image6","image7","image8.jpg","image9","image10","image11","image12","image13","image14","image15","image16","image17","image18","image19","image20","image21","image22","image23","image24"
];

const Balloon3Page: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % balloon3Images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % balloon3Images.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + balloon3Images.length) % balloon3Images.length);
  };

  return (
    <div className="aleasat-page">
      {/* Hero Section */}
      <section className="aleasat-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-heading">High Altitude Balloon 3</h1>
            <p className="hero-subtitle">Seeing What’s Possible</p>
            <p className="hero-description">
              The SFU Aerospace High Altitude Balloon team launched their balloon in Carbon, Alberta on August 28th, 2021. The objective of the project was to help students gain skills so they could go on to work on other SFU Satellite projects. This was the first balloon launch that was successfully recovered.
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="/images/balloon3/image8.jpg" 
              alt="Balloon 3 Launch Team" 
              className="aleasat-main-image"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Project Narrative Section */}
      <section className="project-narrative">
        <div className="container">
          <h2>Reaching New Heights</h2>
          <p>
            The SFU Aerospace High Altitude Balloon team launched their balloon in Carbon, Alberta on August 28th, 2021. The objective of the project was to help students gain skills so they could go on to work on other SFU Satellite projects. This was the first balloon launch that was successfully recovered. The balloon ascended 34km (110,000 ft) before burst and 83.5km overland during the 2-hour ascent and 1-hour descent. The design of the payload was divided into several systems, communications, payload, computing, power, and structure.
          </p>
          <p>
            The Communications team was tasked with implementing and validating a communications link that would facilitate the transmission and reception of telemetry and status data to be used when tracking and recovering the payload. For a team with little RF knowledge going into the project, the task of designing such a system was daunting yet exciting. A 915Mhz LoRa-based system was chosen due to its long-range and low power consumption, with a trade-off in throughput. This was paired with an 8-element Yagi antenna at the ground station and a Whip antenna on the balloon, alongside a SPOT Trace for redundancy.
          </p>
          <p>
            In addition to the communication link, Comms was responsible for tracking the balloon during the flight and determining the payload’s final landing location. A web app was written to display the collected data in real-time. During flight, the LoRa link held up well and tracking didn’t prove too difficult as a constant link was maintained until 10 minutes prior to landing. The longest confirmed range was determined to be approximately 37 km, with larger distances likely possible. Overall, the Comms team is thrilled with the results and looks forward to working with radio devices in the future.
          </p>
          <p>
            The Payload subsystem had the most creative freedom to determine the purpose of their team and decided on 3 goals: Capture camera footage of the flight, create a unique mission crest, and conduct a science experiment. The previous balloons SFU SAT had sent up had not recovered any onboard footage which is something the team wanted to try with this payload. Having a view from near-space is not something that people see often, and it would be an excellent method to generate interest and engagement for SFU SAT in the future. The mission crests were inspired by the golden records on the Voyager probes but instead of gold, 3D printed plastic was used. In the scientific experiment, the effects of UV light from the upper atmosphere were tested. Some UV detecting paper was mounted to the side of the balloon and had 4 setups for light exposure: fully shielded, fully exposed, covered in cloth, and covered with a UV camera lens. In the end, a significant difference between the materials in the upper atmosphere was not found, but as they say, no result is still a result! 
          </p>
          <p>
            The Computing team was responsible for accessing and logging flight data from the sensors on the payload and retrieving GPS information to forward to the communications system. Two independent computing systems were used to ensure that if one failed at least half the system would still function. The systems were divided for the sensors and logging data, and another module for the GPS and communications. An Arduino mega was used for the sensor portion and an Arduino Uno for the GPS and communications.
          </p>
          <p>
            Throughout the project, the Power team was responsible for ensuring key components of the balloon payload were supplied with an ample and consistent amount of power. One obstacle the team had to deal with was potential noise from the batteries that could interfere with other components on the balloon. In the end, the solution was to wrap the batteries in tinfoil. Based on the lack of interference during the flight, this technique appeared to be effective.
          </p>
          <p>
            The Structure Team was responsible for determining the payload shape, materials, parachute, balloon, and connections. The trapezoidal shape is meant to steady the payload as it falls, which was observed when the GoPro footage stabilized after the initial descent from the balloon bursting. The team chose extruded polystyrene foam for ease of cutting angled edges and distributing load throughout the structure. Kapton tape was used on the outer structure for its wide temperature range and resistance to puncture. Macrame, consisting of reef knots, was chosen for the netting and connections between components, which distributed the load throughout the system. As a result, there was no visible strain on the payload structure even as the system underwent jolts throughout its ascent, followed by the turbulent balloon burst. The Structure Team chose a hydrogen-filled balloon for its ascent rate and environmental sustainability. Choosing hydrogen gas allowed the balloon to reach approximately 34 km, which exceeded the project's goal of 32 km.
          </p>
        </div>
      </section>

      {/* Slideshow Section (bottom, like Aleasat) */}
      <section className="development-gallery">
        <div className="container">
          <div className="gallery-header">
            <h2>Development Gallery</h2>
            <p>See highlights from the Balloon 3 mission</p>
          </div>
          <div className="slideshow-container">
            <div
              className="slideshow-wrapper"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {balloon3Images.map((img, idx) => (
                <div className="slide" key={img}>
                  <div className="slide-content">
                    <img
                      src={`/images/balloon3/${img}`}
                      alt={`Balloon 3 Gallery ${idx + 1}`}
                      className="aleasat-main-image"
                      loading={idx < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation */}
            <button className="slide-arrow slide-arrow-left" onClick={prevSlide} aria-label="Previous image">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="slide-arrow slide-arrow-right" onClick={nextSlide} aria-label="Next image">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Balloon3Page;
