import { faCalendarDays, faPeopleGroup, faRocket, faUsers } from '@fortawesome/free-solid-svg-icons';

export const HOME_STATS = [
  { value: '15,200', label: 'People reached through outreach', icon: faPeopleGroup },
  { value: '45+', label: 'Outreach events', icon: faCalendarDays },
  { value: '50+', label: 'Team members', icon: faUsers },
  { value: '10+', label: 'Years active', icon: faRocket }
];

export const HOME_SPONSORS = [
  { src: '/images/sponsors/sponsor/Momentus.png', name: 'Momentus' },
  { src: '/images/sponsors/sponsor/mda.png', name: 'MDA' },
  { src: '/images/sponsors/sponsor/agi.png', name: 'AGI' },
  { src: '/images/sponsors/sponsor/DigiKey.png', name: 'DigiKey' },
  { src: '/images/sponsors/sponsor/valispace.png', name: 'Valispace' },
  { src: '/images/sponsors/sponsor/csa.png', name: 'Canadian Space Agency' }
];

export const HOME_MISSIONS = [
  {
    to: '/projects/aleasat',
    name: 'ALEASAT',
    detail: 'Our flagship CubeSat',
    image: '/images/aleasat/finished-cube.jpg',
    alt: 'The assembled ALEASAT cube with blue test wiring, beside a small model cube'
  },
  {
    to: '/projects/balloon3',
    name: 'Balloon 3',
    detail: 'Launched from Carbon, Alberta',
    image: '/images/balloon3/image8.jpg',
    alt: 'From the Balloon 3 mission'
  },
  {
    to: '/rover',
    name: 'Polaris',
    detail: 'Canadian International Rover Challenge',
    image: '/images/rover/sfusat-recruitment-poster.png',
    alt: 'Canadian International Rover Challenge logo',
    isLogo: true
  }
];
