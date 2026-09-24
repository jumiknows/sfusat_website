# SFU Satellite Design Team Website

Website for the SFU Satellite Design Team.

Live site: https://sfusat.org

## Run locally

```bash
git clone https://github.com/jumiknows/sfusat_website.git
cd sfusat_website
npm ci
npm start
```

Open http://localhost:3000.

## Stack

React, TypeScript, React Router, Three.js and GitHub Pages.

Squarespace manages the sfusat.org domain and DNS.

## Common files

Home page: `src/components/Home.tsx`

Projects: `src/components/Projects.tsx`

Project pages: `src/components/pages/`

Rover: `src/components/Rover.tsx`

Sponsors: `src/components/Sponsors.tsx`

Outreach: `src/components/Outreach.tsx`

Team information: `src/components/About.tsx`

Contact page: `src/components/Contact.tsx`

Navigation: `src/components/Navbar.tsx`

Routes: `src/App.tsx`

Images: `public/images/`

3D models: `public/models/`

## Before opening a pull request

Run:

```bash
npm run check
```

Then check the pages you changed on desktop and mobile.

Pull requests also run automated checks in GitHub Actions.

## Deployment

Production is deployed automatically after a change reaches `main`.

The deployment workflow builds the site and publishes it to the `gh-pages` branch.

Do not edit `gh-pages` directly.

## Working on the website

New contributors should start with [docs/ONBOARDING.md](docs/ONBOARDING.md).

Team workflow and ticket guidance are in [docs/PROJECT_WORKFLOW.md](docs/PROJECT_WORKFLOW.md).

Recurring maintenance is documented in [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

Contribution rules are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Contact form

The repository still contains an older Netlify contact backend. GitHub Pages cannot run Netlify Functions.

The replacement is tracked in Issue 4.

## Custom email

Planning for sfusat.org email addresses is tracked in Issue 6.

Do not change DNS records for email until the team has approved a provider and rollout plan.

## Security

Never commit passwords, API keys, recovery codes, payment information or private member information.
