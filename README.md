# SFU Satellite Design Team Website

Official website for the Simon Fraser University Satellite Design Team.

**Live site:** https://sfusat.org

This repository contains the public SFU SAT website, project pages, sponsor and outreach content, rover recruitment pages, and the contact form backend used by the site.

## What this repository contains

The site is a React and TypeScript single-page application. Most public-facing content currently lives directly in React components, while images and 3D assets live under `public/`.

Main areas of the site:

| Area | Route | Source |
| --- | --- | --- |
| Home | `/` | `src/components/Home.tsx` |
| Projects | `/projects` | `src/components/Projects.tsx` |
| ALEASAT | `/projects/aleasat` | `src/components/pages/Aleasat.tsx` |
| Balloon missions | `/projects/balloon1`, `balloon2`, `balloon3` | `src/components/pages/` |
| CSDC missions | `/projects/csdc4`, `csdc5` | `src/components/pages/` |
| CCP1 | `/projects/ccp1` | `src/components/pages/CCP1.tsx` |
| Rover | `/rover` | `src/components/Rover.tsx` |
| Rover application | `/rover/apply` | `src/components/RoverApply.tsx` |
| Sponsors | `/sponsors` | `src/components/Sponsors.tsx` |
| Outreach | `/outreach` | `src/components/Outreach.tsx` |
| About | `/about` | `src/components/About.tsx` |
| Contact | `/contact` | `src/components/Contact.tsx` |

Routing is defined in `src/App.tsx`.

## Stack

- React 18
- TypeScript
- React Router
- Create React App / `react-scripts`
- Three.js for rover-related 3D work
- Netlify for production hosting and serverless functions
- Nodemailer for contact-form email delivery

## Repository structure

```text
sfusat_website/
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   └── components/
│       ├── Home.tsx
│       ├── Projects.tsx
│       ├── Sponsors.tsx
│       ├── Outreach.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Rover.tsx
│       ├── RoverApply.tsx
│       ├── pages/              # Individual mission/project pages
│       └── rover/              # Rover 3D/game components
├── public/
│   ├── images/
│   ├── logos/
│   └── models/
├── netlify/
│   └── functions/
│       ├── contact.js
│       └── swagger.json
├── netlify.toml
├── package.json
└── tsconfig.json
```

## Local development

### Prerequisites

Install:

- Git
- Node.js 18 or newer
- npm

### Setup

```bash
git clone https://github.com/jumiknows/sfusat_website.git
cd sfusat_website
npm install
npm start
```

The React development server runs at:

```text
http://localhost:3000
```

### Run the site with Netlify Functions

The contact form calls `/.netlify/functions/contact`. Running only `npm start` does not provide that serverless endpoint.

To test the frontend and Netlify Function together:

```bash
npx netlify-cli dev
```

The Netlify CLI will proxy the React app and expose the local functions endpoint.

## Environment variables

The contact function reads SMTP credentials from environment variables.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SMTP_HOST` | Yes | SMTP server hostname |
| `SMTP_USER` | Yes | SMTP account username |
| `SMTP_PASS` | Yes | SMTP account password |
| `SMTP_PORT` | No | SMTP port. Defaults to `587` |

Do not commit credentials to this repository.

For production, configure these values in the Netlify project environment settings.

For local Netlify testing, use local environment configuration supported by the Netlify CLI. Keep local secret files out of Git.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the React development server |
| `npm test` | Run the React test runner |
| `npm run build` | Create the production build in `build/` |
| `npm run deploy` | Legacy GitHub Pages deployment command |

The production configuration in this repository is Netlify-based. The `gh-pages` command remains in `package.json` from an older deployment path and should not be used for the production site unless the team intentionally switches hosting back to GitHub Pages.

## Deployment

Production deployment is configured by `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "build"
functions = "netlify/functions"
```

Netlify also redirects unknown paths to `/index.html` so React Router routes work when a visitor refreshes a project page directly.

The custom domain tracked by this repository is `sfusat.org`.

Before deploying a content or UI change:

1. Run `npm run build`.
2. Check the affected page locally.
3. Test desktop and mobile layouts.
4. Check internal navigation and image paths.
5. If the contact form changed, test it through the Netlify development environment.
6. Open a pull request and have another team member review the change when possible.

## Updating website content

A lot of content is currently component-based rather than stored in a CMS or JSON data layer. This is important for future maintainers.

Common update locations:

- Projects and project cards: `src/components/Projects.tsx`
- Project detail pages: `src/components/pages/`
- Sponsors: `src/components/Sponsors.tsx`
- Outreach photos and event history: `src/components/Outreach.tsx`
- Team descriptions: `src/components/About.tsx`
- Rover recruitment content: `src/components/Rover.tsx` and `RoverApply.tsx`
- Main navigation: `src/components/Navbar.tsx`
- Contact form: `src/components/Contact.tsx`
- Contact backend: `netlify/functions/contact.js`
- Local site images: `public/images/`
- 3D assets: `public/models/`

See [docs/MAINTENANCE.md](docs/MAINTENANCE.md) for step-by-step maintenance notes.

## Development workflow

Please avoid making large edits directly on `main`.

A simple team workflow is:

```text
main
  |
  +-- feat/...
  +-- fix/...
  +-- docs/...
       |
       v
   Pull Request
       |
       v
  review + build check
       |
       v
      main
```

Example branch names:

```text
feat/new-project-page
fix/mobile-navbar
docs/update-maintainer-guide
content/update-sponsors
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution and review checklist.

## Testing checklist

There is currently only a small automated test surface, so manual QA is still important.

For website changes, verify:

- the production build completes;
- the modified route loads directly;
- navbar links still work;
- desktop and mobile layouts remain usable;
- images have meaningful `alt` text;
- new images are reasonably compressed;
- external links are current;
- forms provide success and error feedback;
- no credentials or private team data are committed.

## Known technical debt

The site works, but there are several areas worth improving over time:

- much of the content is embedded directly in React components;
- repeated project and sponsor markup could move to typed data structures;
- the current Create React App stack is aging;
- automated tests are limited;
- some media is loaded from external GitHub-hosted assets rather than this repository;
- deployment history includes both GitHub Pages and Netlify conventions;
- contact-form configuration should be reviewed whenever maintainership changes.

These are good refactoring opportunities, but they do not need to block normal content updates.

## Team handover

When website ownership changes, the outgoing maintainer should make sure the new maintainer has access to:

- this GitHub repository;
- the production Netlify project;
- the `sfusat.org` domain/DNS management;
- the SMTP account or replacement email service used by the contact form;
- the shared source for approved team photos, project media, sponsor logos, and outreach assets.

Do not place account passwords or service credentials in this README, repository issues, or source code.

## Contributing

Team members are welcome to improve the site. Start with [CONTRIBUTING.md](CONTRIBUTING.md), then open an issue or pull request for anything beyond a very small content correction.

## License and ownership

This repository is maintained for the SFU Satellite Design Team website. Website content, team media, sponsor assets, and third-party logos may have rights or usage restrictions separate from the source code. Do not assume that every image or logo in the repository is freely reusable outside the SFU SAT website.

## Contact

SFU Satellite Design Team  
Simon Fraser University  
Burnaby, British Columbia  
https://sfusat.org
