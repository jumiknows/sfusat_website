// Everything about recruitment lives here. To open a program, set `open: true` and add its roles.
// To close it, set `open: false`. Buttons and banners across the site update from this list.

export interface Role {
  name: string;
  description: string;
  form: string;
}

export interface Program {
  id: string;
  name: string;
  open: boolean;
  page: string; // Where visitors can read about the program
  deadline?: string; // Shown only when set, such as 'January 31, 2027'
  closedNote?: string; // Shown while the program is closed
  packageUrl?: string; // Hiring package with the full role descriptions
  roles: Role[];
}

export const PROGRAMS: Program[] = [
  {
    id: 'rover',
    name: 'Polaris Rover',
    open: true,
    page: '/rover',
    roles: [
      {
        name: 'Software',
        description: 'Autonomy, controls, perception, and mission software',
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSf0SaFq3Bp5PqquvxhZ8WYsAXaWIjtLDgnjWsL0O-mt5ab3Dw/viewform?usp=dialog'
      },
      {
        name: 'Mechanical',
        description: 'Chassis, suspension, drivetrain, and CAD integration',
        form: 'https://forms.gle/iHwPVg9Wqh6QCRJL8'
      },
      {
        name: 'Communications',
        description: 'Ground station, networking, and telemetry pipelines',
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSdOkB6Hx3VihP10OrrLxeD1P9fog0bEIZX-iHOpLv0BTzj3EQ/viewform?usp=publish-editor'
      },
      {
        name: 'Payload',
        description: 'Science instruments and mission operations support',
        form: 'https://forms.gle/HDMQYYj9xsUTTHzGA'
      },
      {
        name: 'Electrical',
        description: 'Power systems, embedded design, and board bring-up',
        form: 'https://forms.gle/buF63Tt6xngTQuGN6'
      }
    ]
  },
  {
    id: 'aleasat',
    name: 'ALEASAT',
    open: false,
    page: '/projects/aleasat',
    closedNote: 'Applications closed January 19, 2026',
    // Shared with UBC Orbit, which hosts it. SFU SAT members apply to the same postings.
    packageUrl: 'https://drive.google.com/drive/folders/1n6QCLkcxDga5NRTx_VBeEZObuoaJOnIY',
    roles: [
      {
        name: 'ALEASAT Member',
        description: 'Join the team building our flagship CubeSat',
        // This address shows the closing notice until the form is reopened
        form: 'https://docs.google.com/forms/d/e/1FAIpQLSdHqglWMx5xpFFCtf8Tkl3q9vlhY5wDIDRLySIR-AVogFQr7Q/viewform'
      }
    ]
  },
  {
    id: 'balloon',
    name: 'High Altitude Balloon',
    open: false,
    page: '/projects/balloon3',
    roles: []
  }
];

export const isRecruiting = (id: string, programs: Program[] = PROGRAMS) =>
  programs.some((program) => program.id === id && program.open);

export const getProgram = (id: string, programs: Program[] = PROGRAMS) =>
  programs.find((program) => program.id === id);

export const recruitingSummary = (programs: Program[] = PROGRAMS) => {
  const names = programs.filter((program) => program.open).map((program) => program.name);

  if (names.length === 0) {
    return 'We are not recruiting right now.';
  }

  const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return `We are recruiting for ${list}.`;
};
