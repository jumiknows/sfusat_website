import { faBatteryFull, faRobot, faRoute, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';

export const ROVER_SUBSYSTEMS = [
  {
    icon: faRobot,
    name: 'Robotic Arm',
    summary: 'A multi-axis arm for handling objects',
    details: [
      'Multi-axis manipulator with inverse kinematics',
      'Custom end-effector tooling for object manipulation',
      'Force feedback and collision detection'
    ]
  },
  {
    icon: faTowerBroadcast,
    name: 'Communications',
    summary: 'Long-range radio telemetry and command',
    details: [
      'Reliable radio link over 1km+ distance',
      'Low-latency video streaming pipeline',
      'Redundant command and telemetry protocols'
    ]
  },
  {
    icon: faRoute,
    name: 'Mobility',
    summary: 'All-terrain autonomous navigation',
    details: [
      'Advanced suspension for rough terrain',
      'GPS-denied localization via sensor fusion',
      'Autonomous path planning and obstacle avoidance'
    ]
  },
  {
    icon: faBatteryFull,
    name: 'Power Systems',
    summary: 'Keeps the rover powered for the full mission',
    details: [
      'High-capacity battery with thermal management',
      'Intelligent power distribution and monitoring',
      'Optimized energy efficiency across subsystems'
    ]
  }
];
