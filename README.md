# SFU Satellite Design Team Website

Official website for the Simon Fraser University Satellite Design Team.

**Live site:** https://sfusat.org

The website is a React and TypeScript single-page application hosted on **GitHub Pages**. The custom `sfusat.org` domain and DNS are managed through **Squarespace** on the team's paid domain plan, currently about $20 per year.

## Hosting at a glance

| Responsibility | Current setup |
| --- | --- |
| Source code | `main` branch |
| Website hosting | GitHub Pages |
| Production build | `gh-pages` branch |
| Deployment command | `npm run deploy` |
| Custom domain | `sfusat.org` |
| Domain and DNS management | Squarespace |
| Domain configuration in GitHub Pages | `CNAME` containing `sfusat.org` |

The `gh-pages` branch is generated deployment output. **Do not delete it and do not edit it by hand.**

## What this repository contains

Most public-facing content currently lives directly in React components, while images and 3D assets live under `public/`.

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
- GitHub Pages for production hosting
- Squarespace for the `sfusat.org` domain and DNS

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
├── docs/
│   └── MAINTENANCE.md
├── CNAME
├── package.json
└── tsconfig.json
```

The repository still contains older Netlify-related files. They are **not the current production hosting path** and should be treated as legacy until the team decides whether to remove or repurpose them.

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

The development server runs at:

```text
http://localhost:3000
```

No Netlify CLI or `npx netlify-cli` workflow is required for normal website development.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the local React development server |
| `npm test` | Run the React test runner |
| `npm run build` | Create the production build in `build/` |
| `npm run deploy` | Build and publish the site to the `gh-pages` branch |

The `predeploy` script automatically runs `npm run build` before `gh-pages -d build`.

## Deployment

Production is hosted with GitHub Pages.

The deployment flow is:

```text
main
  |
  | npm run deploy
  v
npm run build
  |
  v
build/
  |
  | gh-pages -d build
  v
gh-pages branch
  |
  v
GitHub Pages
  |
  v
sfusat.org
```

To deploy:

```bash
git checkout main
git pull
npm install
npm run deploy
```

After deployment:

1. confirm the `gh-pages` branch received a new deployment commit;
2. open https://sfusat.org;
3. test the pages changed in the release;
4. test at least one desktop and one mobile layout;
5. verify direct navigation to important routes;
6. confirm the custom domain still resolves correctly.

The `gh-pages` branch contains generated files such as `index.html`, `static/`, site assets, and the production `CNAME`.

## Custom domain and DNS

The website itself is hosted by **GitHub Pages**.

The domain `sfusat.org` and its DNS settings are managed through **Squarespace**. The team currently pays approximately **$20 per year** for the domain plan.

These are separate responsibilities:

```text
Squarespace
  domain registration + DNS
            |
            v
        sfusat.org
            |
            v
     GitHub Pages
       website host
```

When website ownership changes, the new maintainer should receive the appropriate Squarespace domain/DNS access in addition to GitHub repository access.

Do not put Squarespace passwords, recovery codes, or payment information in this repository.

## Contact form note

The current source includes an older Netlify function under `netlify/functions/contact.js`, and `Contact.tsx` still references a Netlify-style endpoint.

**GitHub Pages is static hosting and does not execute Netlify Functions.** Therefore, the contact form backend should not be considered operational through GitHub Pages unless the team has separately configured an external service for that endpoint.

Treat the current contact backend as legacy code until it is replaced or connected to a supported hosted service.

## Updating website content

Common update locations:

- Projects and project cards: `src/components/Projects.tsx`
- Project detail pages: `src/components/pages/`
- Sponsors: `src/components/Sponsors.tsx`
- Outreach photos and event history: `src/components/Outreach.tsx`
- Team descriptions: `src/components/About.tsx`
- Rover recruitment content: `src/components/Rover.tsx` and `RoverApply.tsx`
- Main navigation: `src/components/Navbar.tsx`
- Contact page: `src/components/Contact.tsx`
- Local images: `public/images/`
- 3D assets: `public/models/`

See [docs/MAINTENANCE.md](docs/MAINTENANCE.md) for recurring maintenance steps.

## Development workflow

Avoid making significant changes directly on `main`.

```text
main
  |
  +-- feat/...
  +-- fix/...
  +-- content/...
  +-- docs/...
       |
       v
   Pull Request
       |
       v
 review + build
       |
       v
      main
       |
       | npm run deploy
       v
   gh-pages
```

Example branch names:

```text
feat/new-project-page
fix/mobile-navbar
content/update-sponsors
docs/update-maintainer-guide
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution checklist.

## Testing checklist

There is currently only a small automated test surface, so manual QA is important.

Before deploying, verify:

- `npm run build` completes;
- modified routes load correctly;
- navbar links work;
- desktop and mobile layouts remain usable;
- images have useful `alt` text;
- new images are reasonably compressed;
- external links are current;
- the browser console has no obvious new errors;
- no credentials or private team data are committed.

## Known technical debt

Useful future improvements include:

- move repeated project, sponsor, outreach, and team content into typed data files;
- remove stale commented-out code;
- add CI that runs the production build and tests on pull requests;
- expand automated tests for routing and interactive components;
- review externally hosted GitHub media and move important long-term assets under team control;
- remove obsolete Netlify configuration after confirming nothing still depends on it;
- replace or properly host the current contact-form backend;
- plan a future migration away from Create React App separately from normal content updates.

## Team handover

The outgoing website maintainer should make sure the next maintainer understands and can access:

- this GitHub repository;
- GitHub Pages settings for the repository;
- the `gh-pages` deployment workflow;
- Squarespace access for `sfusat.org` domain registration and DNS;
- the annual domain renewal/payment owner;
- approved team photos, project media, and sponsor logos;
- any external service eventually used for forms or email.

Do not place account passwords or service credentials in GitHub.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md). For anything beyond a tiny content correction, use a short-lived branch and pull request.

## License and ownership

This repository is maintained for the SFU Satellite Design Team website. Team media, sponsor assets, and third-party logos may have usage restrictions separate from the source code.

## Contact

SFU Satellite Design Team  
Simon Fraser University  
Burnaby, British Columbia  
https://sfusat.org
