// Cards on the Projects page, newest first, in the order they appear.
// To add a project: add a card here, and add a page to PROJECT_PAGES below.

export interface Project {
  title: string;
  image: string;
  description: string;
  link?: string;
  imageClassName?: string;
  imagePosition?: string;
}

export const PROJECTS: Project[] = [
  { 
    title: 'Polaris', 
    image: '/images/rover/sfusat-recruitment-poster.png', 
    description: 'Design and deploy an autonomous rover for the Canadian International Rover Challenge. The work covers robotics, autonomy, and systems integration.', 
    link: '/rover',
    imageClassName: 'project-image-contain'
  },
  { 
    title: 'ALEASAT', 
    image: '/images/aleasat/finished-cube.jpg', 
    description: 'Our most ambitious project yet. Alongside UBC Orbit, we are sending a 1U cube satellite into space. The satellite will provide research data relating to human physiology and will provide pictures of Earth for amateur radio operators.', 
    link: '/projects/aleasat' 
  },
  { 
    title: 'Balloon 3', 
    image: '/images/site/team-launch.jpg', 
    description: 'Repeating our tradition for our new recruits we launched our most successful balloon yet.', 
    link: '/projects/balloon3',
    imagePosition: 'center 70%'
  },
  { 
    title: 'CSDC5', 
    image: '/images/site/image3.png', 
    description: 'Our second time in the competition and utilizing what we learned from the previous one we continued to develop our custom hardware.', 
    link: '/projects/csdc5',
    imageClassName: 'project-image-contain'
  },
  { 
    title: 'CCP1', 
    image: '/images/site/ccp1-night.jpg', 
    description: 'Building from our success of CSDC4 we partnered with 2 other universities to build a 2U cube satellite funded from the Canadian Space Agency.', 
    link: '/projects/ccp1' 
  },
  { 
    title: 'Balloon 2', 
    image: '/images/site/image5.jpg', 
    description: 'The first balloon helped us gain invaluable experience so we did it again to help our new members. Many of the leads from this project went on to lead CSDC5 and ALEA.', 
    link: '/projects/balloon2' 
  },
  { 
    title: 'CSDC4', 
    image: '/images/site/image6.jpeg', 
    description: 'Our first competition and opportunity to prove ourselves as satellite engineers.', 
    link: '/projects/csdc4' 
  },
  { 
    title: 'Balloon 1', 
    image: '/images/site/image8.jpeg', 
    description: 'Latobius was the first High Altitude Balloon launched by SFU Satellite Design Team. This mission was used to test our integration capabilities before starting on CSDC4.', 
    link: '/projects/balloon1' 
  }
];

export interface ProjectPageContent {
  slug: string; // The address: /projects/slug
  title: string; // Shown in the browser tab
  heading: string;
  subtitle: string;
  description?: string;
  image: string;
  imageAlt: string;
  fullWidthPhoto?: boolean; // Use for photos at least 1600px wide
  longHeading?: boolean; // Smaller heading for long names
  recruitingProgram?: string; // An id from recruitment.ts
  storyHeading: string;
  story: string[]; // One entry per paragraph
  photos?: { src: string; alt: string }[];
}

// ALEASAT and Balloon 3 have their own longer pages in src/pages/.
export const PROJECT_PAGES: ProjectPageContent[] = [
  {
    slug: 'balloon2',
    title: 'Balloon 2',
    heading: 'Balloon 2',
    subtitle: 'High Altitude Balloon Mission 2',
    description: 'Our second high altitude balloon mission, providing invaluable experience for new members and future project leads.',
    image: '/images/site/image5.jpg',
    imageAlt: 'Balloon 2',
    fullWidthPhoto: true,
    recruitingProgram: 'balloon',
    storyHeading: 'About Balloon 2',
    story: [
      'Balloon 2 built on the success of our first mission, allowing new members to gain hands-on experience in high altitude ballooning. Many participants from this project went on to lead future satellite and balloon missions.'
    ]
  },
  {
    slug: 'csdc5',
    title: 'CSDC5',
    heading: 'Canadian Satellite Design Challenge 5',
    subtitle: 'Refining our Skills',
    image: '/images/site/image3.png',
    imageAlt: 'CSDC5',
    longHeading: true,
    storyHeading: 'Taking the Selfie out of This World',
    story: [
      'In the 5th round of the CSDC, teams are challenged to undertake the ultimate, global educational outreach program. The CubeSat that is required from each team must be able to communicate with anyone on earth who has an amateur radio licence, otherwise known as an ARO (Amateur Radio Operator).',
      'The ARO should be able to call the satellite and ask for a selfie, the cube satellite will then tell the ARO when the selfie will take place and then take a photo of the ARO\'s location and downlink it immediately along with Canadian photos and stories relating to the Aerospace industry here in Canada.',
      'The secondary payload was a modified non-viral cell line to study the effects of radiation and microgravity on the reversal of HIV latency.',
      'Canadian Satellite Design Challenge 5 was to operate from Q3 2018 - Q3 2020. In December of 2019 we decided to pivot away from this project to focus our resources on ALEASAT. Much of the hardware design was reused from CSDC5 for ALEASAT as well as the primary payload.'
    ],
    photos: [
      { src: '/images/projects/image20', alt: 'CSDC5 Hardware 1' },
      { src: '/images/projects/image21', alt: 'CSDC5 Hardware 2' },
      { src: '/images/projects/image22', alt: 'CSDC5 Hardware 3' }
    ]
  },
  {
    slug: 'ccp1',
    title: 'CCP1',
    heading: 'CCP1',
    subtitle: 'Canadian CubeSat Project 1',
    description: 'A collaboration with two other universities to build a 2U CubeSat, funded by the Canadian Space Agency.',
    image: '/images/site/ccp1-night.jpg',
    imageAlt: 'CCP1',
    fullWidthPhoto: true,
    storyHeading: 'About CCP1',
    story: [
      'CCP1 was a major step forward for our team, partnering with other universities to design and build a 2U CubeSat. Supported by the Canadian Space Agency, this project expanded our technical capabilities and fostered collaboration across institutions.'
    ]
  },
  {
    slug: 'csdc4',
    title: 'CSDC4',
    heading: 'Canadian Satellite Design Challenge 4',
    subtitle: 'Our Debut',
    image: '/images/site/image6.jpeg',
    imageAlt: 'CSDC4',
    longHeading: true,
    storyHeading: 'The Start of Something...',
    story: [
      'The Canadian Satellite Design Challenge is a Canada-wide competition for teams of university students (undergraduate and graduate) to design and build a small satellite. The satellites will undergo full launch and space environmental qualification testing.',
      'The SFU Satellite Design Team participated in this event with our payload to be a radio calibration source for one of Canada\'s largest radio telescopes. This mission would greatly aid in the precision of their observations contributing to Canadian scientific research into the age of the universe and its expansion, in particular, dark energy.',
      'Even though it was our first competition and we are a small program, during our Critical Design Review (CDR) by qualified space industry personal we achieved 5th place out of 15+ Universities. Where we were only beaten by large universities with dedicated aerospace programs.',
      'During this time we developed custom hardware for every system within our team. We scored particularly well on our Command & Data Handling and Radio Frequency systems which led to our participation in the Canadian CubeSat Project 1.',
      'Through the sponsorships of Telus, Mobify, EGBC, Solidworks, SFSS and FAS we were able to design and build a cube satellite while also keeping educational outreach with both high school and elementary school students a priority.'
    ],
    photos: [
      { src: '/images/projects/image19', alt: 'CSDC4 Hardware 1' },
      { src: '/images/projects/image17', alt: 'CSDC4 Hardware 2' }
    ]
  },
  {
    slug: 'balloon1',
    title: 'Balloon 1',
    heading: 'Balloon 1',
    subtitle: 'High Altitude Balloon Mission 1',
    description: 'Latobius was the first High Altitude Balloon launched by SFU Satellite Design Team, testing integration capabilities before CSDC4.',
    image: '/images/site/image8.jpeg',
    imageAlt: 'Balloon 1',
    recruitingProgram: 'balloon',
    storyHeading: 'About Balloon 1',
    story: [
      'Balloon 1, also known as Latobius, was our first high altitude balloon mission. It provided a foundation for future projects and helped the team develop essential integration skills.'
    ]
  }
];
