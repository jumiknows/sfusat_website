export const ROVER_SUBSYSTEMS = [
  {
    name: 'Robotic Arm',
    summary: 'A multi-axis arm for handling objects',
    details: [
      'Multi-axis manipulator with inverse kinematics',
      'Custom end-effector tooling for object manipulation',
      'Force feedback and collision detection'
    ]
  },
  {
    name: 'Communications',
    summary: 'Long-range radio telemetry and command',
    details: [
      'Reliable radio link over 1km+ distance',
      'Low-latency video streaming pipeline',
      'Redundant command and telemetry protocols'
    ]
  },
  {
    name: 'Mobility',
    summary: 'All-terrain autonomous navigation',
    details: [
      'Advanced suspension for rough terrain',
      'GPS-denied localization via sensor fusion',
      'Autonomous path planning and obstacle avoidance'
    ]
  },
  {
    name: 'Power Systems',
    summary: 'Keeps the rover powered for the full mission',
    details: [
      'High-capacity battery with thermal management',
      'Intelligent power distribution and monitoring',
      'Optimized energy efficiency across subsystems'
    ]
  }
];
