# Contributing to the SFU SAT Website

This repository is maintained by SFU Satellite Design Team members. Keep changes understandable enough that a future student maintainer can pick up the project without needing the original developer.

## Local setup

```bash
git clone https://github.com/jumiknows/sfusat_website.git
cd sfusat_website
npm install
npm start
```

Normal local development uses the React development server. No Netlify CLI is required.

## Branch workflow

For anything larger than a typo or a single content correction, create a short-lived branch from the latest `main`.

Examples:

- `feat/new-project-page`
- `fix/mobile-navbar`
- `content/update-sponsors`
- `docs/maintainer-notes`
- `refactor/project-data`

Keep one logical change per branch.

## Before opening a pull request

Run:

```bash
npm run build
```

Then manually check the pages you changed.

Verify:

- desktop layout;
- mobile layout;
- route navigation;
- images and alt text;
- external links;
- browser console for obvious errors.

## Pull request expectations

Explain:

1. what changed;
2. why it changed;
3. which pages were tested;
4. whether routes, media, deployment, DNS, or external services are affected;
5. any follow-up work.

Screenshots are useful for visible changes.

## Content changes

Keep public copy factual and current.

Before adding or changing a sponsor, project, team member, event, role, or external claim, confirm the information with the appropriate SFU SAT lead.

Do not put temporary planning notes, passwords, personal information, private emails, or unpublished project information into public source files.

## Images and media

Prefer compressed files with clear names.

Good:

```text
public/images/projects/aleasat-integration-test.jpg
public/images/outreach/2026-science-world.jpg
```

Avoid:

```text
IMG_3928-final-final2.jpg
newphoto.png
Screenshot 2026-09-01.png
```

Use meaningful alt text for images that communicate content.

## Code style

The codebase uses React, TypeScript, and component-specific CSS.

When editing existing pages:

- follow the surrounding component style;
- keep TypeScript strictness intact;
- avoid duplicating large JSX blocks when typed data or a reusable component is clearer;
- keep route registration in `src/App.tsx`;
- avoid adding a dependency for something simple enough to solve with the existing stack;
- remove abandoned commented-out experiments once a final approach is agreed on.

## Deployment

The production website is hosted on **GitHub Pages**.

After a change is merged into `main`, deploy from an up-to-date local `main` branch:

```bash
git checkout main
git pull
npm install
npm run deploy
```

`npm run deploy` builds the project and publishes `build/` to the generated `gh-pages` branch.

Do not edit `gh-pages` manually and do not delete it while GitHub Pages uses it as the production source.

## Domain and DNS

`sfusat.org` is managed through Squarespace. Squarespace handles the domain registration and DNS; GitHub Pages serves the actual website.

Only maintainers who need domain access should receive the Squarespace account permissions. Never commit credentials or payment details.

## Legacy Netlify files

The repository still contains `netlify.toml` and `netlify/functions/` from an older approach.

They are not the current production hosting path. Do not add new Netlify-specific dependencies or workflows unless the team intentionally decides to use Netlify again.

The existing contact page still references a Netlify-style function endpoint, so treat that integration as legacy until a supported backend is configured.

## Secrets

Never commit:

- GitHub tokens;
- Squarespace credentials or recovery codes;
- API keys;
- SMTP passwords;
- DNS credentials;
- private keys;
- production cookies or browser data.

## Handover

When leaving the web team, make sure another active member knows:

- how to run the site locally;
- how to deploy with `npm run deploy`;
- that `gh-pages` is generated production output;
- who controls GitHub Pages settings;
- who controls `sfusat.org` and its Squarespace renewal/DNS;
- where approved team media and sponsor assets are stored.

Update [docs/MAINTENANCE.md](docs/MAINTENANCE.md) whenever one of these workflows changes.
