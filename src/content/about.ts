export const MISSION = [
  'For the past several years, SFU Satellite Design Team has existed with a clear goal: to provide education and training for future engineers interested in the space industry. The projects we have worked on so far have provided us with extensive knowledge of space systems.',
  'Members work on real space hardware during their undergraduate degrees, which prepares them for careers in the aerospace sector after graduation.'
];

export const TEAM_STATS = [
  { value: '50+', label: 'Team Members' },
  { value: '7', label: 'Specialized Teams' },
  { value: '10+', label: 'Years Active' }
];

export const TEAMS = [
  {
    id: 1,
    name: "Attitude Determination and Control System (ADCS)",
    image: "/images/site/adcs.png",
    description: "Attitude Determination and Control System (ADCS) is in charge of the various sensors used to determine the orientation and position of the satellite, as well as re-orienting the satellite when necessary. With the many sensors onboard a satellite, the ADCS team is currently working on a sensor fusion and filtration algorithm to eliminate noise for the On-Board Computer (OBC). Additionally, the team is designing and building a custom test rig for the satellite actuators, which will simultaneously test the magnetorquers and control algorithm."
  },
  {
    id: 2,
    name: "Command and Data Handling (C&DH)",
    image: "/images/site/obc.jpg",
    description: "The Command and Data Handling team (C&DH) works hard to develop the onboard computer (OBC) for our satellites. We design custom circuit boards and create specialized firmware to meet the satellite's needs. We also handle the management of executing commands, storing data, and gathering telemetry."
  },
  {
    id: 3,
    name: "Communications",
    image: "/images/site/comms.jpg",
    description: "The communications, or RF (Radio Frequency) team, ensures that the satellite can communicate with our ground station back on earth. This communication link will handle the downlink of satellite telemetry and payload data, as well as the uplink of telecommands."
  },
  {
    id: 4,
    name: "Electrical Power System (EPS)",
    image: "/images/site/eps.jpg",
    description: "The EPS team oversees generation, charging, storage, and budgeting of energy in the satellite. This can go from running models using code and simulation software to researching, designing and testing printable circuit boards (PCBs). Batteries can be highly sensitive, so our job in a nutshell is to make sure the satellite does not run out of power or have any exploding parts."
  },
  {
    id: 5,
    name: "Payload",
    image: "/images/site/payload.jpg",
    description: "Every project has a payload or reason for existing, and the payload team is in charge of building that. What we do specifically changes from project to project: Previous examples are atmospheric sensors, cameras, and calibration equipment for ground systems. For ALEASAT we are developing a centrifuge payload, which is an adapted reaction wheel. The team has already designed and manufactured a small prototype and is currently building a test rig to verify different operating modes."
  },
  {
    id: 6,
    name: "Structure",
    image: "/images/site/structure.png",
    description: "The structure team is responsible for holding the satellite together under extreme conditions. The team ensures all components are securely mounted within the satellite to survive extreme temperatures and vibrations during launch. They also develop the antenna deployment systems, and perform extensive simulation analyses to ensure the satellite will survive in orbit."
  },
  {
    id: 7,
    name: "Mission Operations (Mops)",
    image: "/images/site/mops.png",
    description: "The Mission Operations team (Mops) is responsible for operating the satellite after it launches. This includes assigning missions for the satellite, sending commands to the satellite, accepting image requests from the general public and capturing images for them. We build and operate our control center, Barbour's Cut, which aids our operation and allows for public image requests."
  }
];

// Oldest first
export const MILESTONES = [
  { date: '2016', text: 'First outreach events on record, including SheTalks and a CleanTech demo.' },
  { date: '2018', text: 'Canadian Satellite Design Challenge 5 begins.' },
  { date: 'January 2020', text: 'ALEASAT begins with UBC Orbit.' },
  { date: 'August 2021', text: 'Balloon 3 launches from Carbon, Alberta, reaches 34 km and is recovered.' },
  { date: 'January 2024', text: 'ALEASAT is selected for the February 2024 test window of ESA\'s Fly Your Satellite! Test Opportunities programme.' },
  { date: 'June 2026', text: 'The ALEASAT engineering model is tested at ESA\'s CubeSat Support Facility in Belgium.' },
  { date: 'August 2027', text: 'Polaris is headed for the Canadian International Rover Challenge.' },
  { date: '2028', text: 'Target launch date for ALEASAT.' }
];

export const VALUES = [
  { title: 'Education First', text: 'Members teach each other and build technical and professional skills.' },
  { title: 'Collaboration', text: 'We build satellites as a team, and everyone\'s input counts.' },
  { title: 'Innovation', text: 'We try new technologies so members graduate familiar with current space engineering.' },
  { title: 'Community Impact', text: 'Through outreach, we show younger students what careers in STEM and space can look like.' }
];
