# SFU Satellite Design Team Website

Website for the SFU Satellite Design Team.

**Live:** https://sfusat.org

## Setup

```bash
git clone https://github.com/jumiknows/sfusat_website.git
cd sfusat_website
npm install
npm start
```

Local site:

```text
http://localhost:3000
```

## Stack

- React
- TypeScript
- React Router
- Three.js
- GitHub Pages
- Squarespace DNS

## Where things are

| Change | File |
| --- | --- |
| Home page | `src/components/Home.tsx` |
| Projects | `src/components/Projects.tsx` |
| Project pages | `src/components/pages/` |
| Rover | `src/components/Rover.tsx` |
| Sponsors | `src/components/Sponsors.tsx` |
| Outreach | `src/components/Outreach.tsx` |
| Team info | `src/components/About.tsx` |
| Contact page | `src/components/Contact.tsx` |
| Navigation | `src/components/Navbar.tsx` |
| Routes | `src/App.tsx` |
| Images | `public/images/` |
| 3D models | `public/models/` |

For recurring website updates, see [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

## Development workflow

Use a branch for normal work.

```bash
git checkout main
git pull
git checkout -b feat/short-description
```

Before opening a pull request:

```bash
npm run build
```

Then check the changed page on desktop and mobile.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the team workflow.

## Deploy

The website is hosted on **GitHub Pages**.

```bash
git checkout main
git pull
npm install
npm run deploy
```

`npm run deploy` builds the site and publishes it to the `gh-pages` branch.

**Do not edit or delete `gh-pages`.** It contains the live website build.

After deploying, check:

- https://sfusat.org loads
- the pages you changed work
- mobile layout still looks right
- direct links to project pages work

## Domain

`sfusat.org` is managed through **Squarespace**.

Squarespace handles the domain and DNS. GitHub Pages hosts the website.

The Squarespace domain plan is currently about **$20 per year**.

The repository `CNAME` should remain:

```text
sfusat.org
```

Do not change DNS records unless you know what the record is used for.

## Contact form

The repo still contains an old Netlify contact backend. GitHub Pages cannot run Netlify Functions.

The replacement is tracked in [Issue #4](https://github.com/jumiknows/sfusat_website/issues/4).

## Custom email

Planning for addresses such as `president@sfusat.org` is tracked in [Issue #6](https://github.com/jumiknows/sfusat_website/issues/6).

Do not change the Squarespace DNS for email until a mail provider and rollout plan are approved.

## Handover

The next website maintainer should have access to:

- this GitHub repository
- GitHub Pages settings
- Squarespace domain and DNS
- approved team images and sponsor assets

Keep passwords, recovery codes, and payment information out of GitHub.
