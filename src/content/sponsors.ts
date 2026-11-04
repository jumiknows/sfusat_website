// One entry per sponsor. Confirm the name, tier, logo and description with the team lead first.
// logo: a file in public/images/sponsors/sponsor/, with dark text because cards are white.
// about: one or two plain sentences saying what the organization does.
export interface Sponsor {
  name: string;
  logo: string;
  about: string;
}

const logo = (file: string) => `/images/sponsors/sponsor/${file}`;

export const SPONSOR_TIERS: { id: string; title: string; sponsors: Sponsor[] }[] = [
  {
    id: 'platinum',
    title: 'Platinum Sponsors',
    sponsors: [
      {
        name: 'Momentus Space',
        logo: logo('Momentus.png'),
        about:
          'Founded in 2017, Momentus provides in-space transportation, moving satellites to the orbits they need after launch.'
      },
      {
        name: 'Pillon Holdings',
        logo: logo('pillon-holdings.png'),
        about:
          'A privately held BC company established in 2013. Its companies provide electronics manufacturing, including Dorigo Systems, which has built electronics since 1988.'
      },
      {
        name: 'AGI',
        logo: logo('agi-logo.png'),
        about:
          'Makes modelling and simulation software for aerospace and defence, including Systems Tool Kit (STK). AGI is now the US national security division of Ansys.'
      },
      {
        name: 'UBC Radio Science Lab',
        logo: logo('radio-science-lab.png'),
        about:
          'A lab in UBC\'s Department of Electrical and Computer Engineering that researches radio science and electromagnetic compatibility.'
      },
      {
        name: 'Simon Fraser Student Society',
        logo: logo('sfss-logo.png'),
        about:
          'The student-led society that represents and advocates for more than 25,000 undergraduate students at SFU.'
      },
      {
        name: 'Canadian Space Agency',
        logo: logo('csa-logo.png'),
        about:
          'The federal agency established in 1989 to manage Canada\'s civil space activities, including space science and technology.'
      },
      {
        name: 'Ebco',
        logo: logo('ebco.svg'),
        about:
          'A manufacturing company based in Richmond, BC, working in precision machining and fabrication.'
      },
      {
        name: 'TRIUMF',
        logo: logo('triumf.png'),
        about:
          'Canada\'s particle accelerator centre, based in Vancouver.'
      }
    ]
  },
  {
    id: 'gold',
    title: 'Gold Sponsors',
    sponsors: [
      {
        name: 'UBC Electrical and Computer Engineering',
        logo: logo('ubc-ece.png'),
        about:
          'The UBC department offering undergraduate and graduate programs in electrical and computer engineering.'
      },
      {
        name: 'Harwin',
        logo: logo('harwin.png'),
        about:
          'Manufactures high-reliability connectors, EMC shielding and PCB hardware, including vibration-resistant connectors for aerospace and defence.'
      },
      {
        name: 'Altium',
        logo: logo('altium.svg'),
        about:
          'Makes electronics design software that connects PCB design, collaboration and manufacturing.'
      }
    ]
  },
  {
    id: 'silver',
    title: 'Silver Sponsors',
    sponsors: [
      {
        name: 'UBC Faculty of Applied Science',
        logo: logo('ubc-applied-science.png'),
        about:
          'UBC\'s faculty for engineering and related professional programs.'
      },
      {
        name: 'Affinity',
        logo: logo('affinity.png'),
        about:
          'Works with customers from concept to component.'
      },
      {
        name: 'SFU Faculty of Applied Science',
        logo: logo('SFUFAS.png'),
        about:
          'The SFU faculty for computing science and engineering, home to the schools that many team members study in.'
      },
      {
        name: 'Engineers and Geoscientists BC',
        logo: logo('EGBC_logo_vert_web.png'),
        about:
          'The regulator of the engineering and geoscience professions in British Columbia.'
      },
      {
        name: 'Candor Circuit Boards',
        logo: logo('candor.svg'),
        about:
          'A Canadian manufacturer of custom printed circuit boards, specializing in HDI and heavy copper boards.'
      },
      {
        name: 'IEEE',
        logo: logo('ieee.png'),
        about:
          'The professional association for electrical, electronics and computing engineering, known for its technical standards and publications.'
      },
      {
        name: 'MDA',
        logo: logo('mda-logo.png'),
        about:
          'A Canadian space company that builds satellite systems, antennas and space robotics, with more than 450 missions in its history.'
      },
      {
        name: 'Hansen Industries',
        logo: logo('hansen.png'),
        about:
          'Provides sheet metal fabrication and precision machining in Vancouver and Richmond, BC.'
      },
      {
        name: 'SFU Aerospace',
        logo: logo('SFUAerospace.jpeg'),
        about:
          'An administrative group that represents SFU\'s aerospace design teams in their efforts to secure funding and resources.'
      },
      {
        name: 'UBC Engineering Physics',
        logo: logo('ubc-engineering-physics.png'),
        about:
          'An accredited UBC Bachelor of Applied Science program, administered by the Department of Physics and Astronomy.'
      }
    ]
  },
  {
    id: 'bronze',
    title: 'Bronze Sponsors',
    sponsors: [
      {
        name: 'Ansys',
        logo: logo('ansys.svg'),
        about:
          'Develops engineering simulation software used to test designs before they are built.'
      },
      {
        name: 'Canadian Satellite Design Challenge',
        logo: logo('csdc-logo.png'),
        about:
          'A Canada-wide competition for university teams to design and build small satellites.'
      },
      {
        name: 'TekSavvy',
        logo: logo('teksavvy.png'),
        about:
          'A Canadian provider of home internet, phone and TV.'
      },
      {
        name: 'Valispace',
        logo: logo('valispace.png'),
        about:
          'Makes requirements management software for hardware engineering, now part of Altium\'s tools as Requirements Portal.'
      },
      {
        name: 'SolidWorks',
        logo: logo('solidworks.svg'),
        about:
          '3D CAD software for mechanical design, used across engineering teams and industry.'
      },
      {
        name: 'SFU Computing Science',
        logo: logo('SFUCS.jpg'),
        about:
          'SFU\'s School of Computing Science, which has offered computing education and research for 50 years.'
      },
      {
        name: 'Tallysman Wireless',
        logo: logo('tallysman.png'),
        about:
          'An Ottawa-based maker of GNSS antennas for satellite positioning and navigation, now part of Calian.'
      },
      {
        name: 'SFU Mechatronic Systems Engineering',
        logo: logo('MSE-Logo.jpg'),
        about:
          'The SFU school combining mechanical, electrical and software engineering.'
      },
      {
        name: 'SFU Engineering Science',
        logo: logo('SFUENSC.jpg'),
        about:
          'The SFU school with programs in biomedical, computer, electronics and systems engineering, and engineering physics.'
      },
      {
        name: 'DigiKey',
        logo: logo('digikey.svg'),
        about:
          'An electronic components distributor headquartered in Thief River Falls, Minnesota, with millions of parts available.'
      },
      {
        name: 'SFU Aerospace Physiology Laboratory',
        logo: logo('aerospace-physiology-lab.png'),
        about:
          'An SFU lab that partners with the ALEASAT project on its miniaturized human centrifuge payload.'
      }
    ]
  }
];
