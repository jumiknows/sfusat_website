# Website Maintenance Guide

This guide covers recurring work for the SFU SAT website.

## Start from main

```bash
git checkout main
git pull
git checkout -b content/short-description
npm ci
npm start
```

Do not make normal changes directly on main.

## Home page

Edit `src/components/Home.tsx`.

Check the hero, ALEASAT section, featured sponsors and links after changes.

Local images are mainly under `public/images/hero/` and `public/images/sponsors/`.

## Projects

The project grid is in `src/components/Projects.tsx`.

Full project pages are in `src/components/pages/`.

When adding a new project page:

1. Add the page component.
2. Add its route in `src/App.tsx`.
3. Add the project to the project grid.
4. Add approved media.
5. Test the route directly.
6. Check desktop and mobile layouts.

## Sponsors

Edit `src/components/Sponsors.tsx`.

Sponsor images are under `public/images/sponsors/`.

Confirm the sponsor name, tier and approved logo before publishing changes.

Also check the featured sponsors on the home page.

## Outreach

Edit `src/components/Outreach.tsx`.

Outreach images are under `public/images/outreach/`.

Use approved event information and clear image alt text.

## Team information

Edit `src/components/About.tsx`.

Confirm names, roles, team descriptions and photos with the current team.

Do not guess a person's identity or role from a photo.

## Rover

The main files are:

`src/components/Rover.tsx`

`src/components/RoverApply.tsx`

`src/components/rover/`

Check recruitment dates, links and competition information before each recruitment cycle.

## Navigation

Edit `src/components/Navbar.tsx`.

Routes are registered in `src/App.tsx`.

When adding a top level page, check whether it also belongs in the main navigation.

## Contact form

The repository contains an older Netlify function in `netlify/functions/contact.js`.

The current production site is on GitHub Pages. GitHub Pages cannot execute that Netlify function.

Do not assume the contact backend works until the team has configured a supported service.

Never put SMTP passwords or API keys in frontend code.

## Checks

Before opening a pull request, run:

```bash
npm run check
```

GitHub Actions repeats the automated checks on the pull request.

## Deployment

Do not deploy production from a personal laptop.

After an approved change reaches main, GitHub Actions builds the site and publishes it to the `gh-pages` branch.

Do not edit the generated `gh-pages` branch.

After deployment, verify https://sfusat.org and the pages that changed.

## Domain

GitHub Pages serves the website.

Squarespace manages the sfusat.org domain and DNS.

At least two active members should know who controls repository administration, GitHub Pages settings and Squarespace access.

Keep credentials and payment information outside GitHub.

## Regular cleanup

Review stale issues and pull requests.

Review Dependabot updates.

Check failed workflows.

Remove old commented code when it is no longer useful.

Check important external image links.

Keep onboarding and maintenance instructions current when the workflow changes.
