# Contributing to the SFU SAT Website

This repository is maintained by SFU Satellite Design Team members. The goal is to keep the public website easy for the next student maintainer to understand and update.

## Before you start

For anything larger than a typo or a single content correction, create a short-lived branch from the latest `main`.

Recommended branch names:

- `feat/new-project-page`
- `fix/mobile-navbar`
- `content/update-sponsors`
- `docs/maintainer-notes`
- `refactor/project-data`

Keep one logical change per branch.

## Local setup

```bash
git clone https://github.com/jumiknows/sfusat_website.git
cd sfusat_website
npm install
npm start
```

For changes that involve the contact form or Netlify Functions:

```bash
npx netlify-cli dev
```

## Before opening a pull request

Run:

```bash
npm run build
```

Then manually check the pages you changed.

At minimum, verify:

- desktop layout;
- mobile layout;
- route navigation;
- images and alt text;
- external links;
- browser console for obvious errors;
- contact form behavior if relevant.

## Pull request expectations

A pull request should explain:

1. what changed;
2. why the change was needed;
3. which pages were tested;
4. whether media, routes, forms, deployment, or environment variables changed;
5. any follow-up work that remains.

Screenshots are helpful for visual changes.

## Content changes

Keep website copy factual, current, and understandable to someone outside the team.

Before adding a sponsor, project, team member, event, or external claim, verify the information with the appropriate SFU SAT lead.

Avoid putting temporary notes, internal planning comments, credentials, personal phone numbers, private email threads, or unpublished project information into public source files.

## Images and media

Prefer files that are reasonably compressed and named for what they contain.

Good:

```text
public/images/projects/aleasat-integration-test.jpg
public/images/outreach/2026-science-world.jpg
```

Avoid names such as:

```text
IMG_3928-final-final2.jpg
newphoto.png
Screenshot 2026-09-01.png
```

Use meaningful alt text for images that communicate content.

## Code style

This codebase uses React, TypeScript, and component-specific CSS.

When editing existing pages:

- follow the style of the surrounding component;
- keep TypeScript strictness intact;
- avoid copying large blocks of nearly identical markup when a typed array or reusable component would be clearer;
- keep routing changes centralized in `src/App.tsx`;
- do not add dependencies for something that can be handled simply with the existing stack;
- remove commented-out experiments once the final behavior is agreed on.

## Secrets and service configuration

Never commit:

- SMTP passwords;
- API keys;
- Netlify tokens;
- DNS credentials;
- private keys;
- production cookies or browser data.

The contact function expects SMTP configuration through environment variables. See the main README for the required names.

## Deployment

The repository currently contains Netlify production configuration and an older GitHub Pages deployment script.

Treat Netlify as the production path unless the team explicitly decides otherwise.

Do not run `npm run deploy` against production as part of a normal contribution without confirming the hosting plan with the current website maintainer.

## Handover

If you are leaving the web team, make sure at least one active member understands:

- where site content lives;
- how the site is deployed;
- how the contact form works;
- who has access to Netlify and domain/DNS settings;
- where original team media and sponsor assets are stored.

Update [docs/MAINTENANCE.md](docs/MAINTENANCE.md) when a workflow changes.
