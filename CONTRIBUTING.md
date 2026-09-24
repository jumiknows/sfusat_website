# Contributing to the SFU SAT Website

Keep changes simple enough that another student can understand and maintain them later.

## Start from the latest main branch

```bash
git checkout main
git pull
git checkout -b feat/short-description
```

Use one branch for one logical change.

Common branch names:

`feat/new-project-page`

`fix/mobile-navbar`

`content/update-sponsors`

`docs/update-onboarding`

`refactor/project-data`

## Before opening a pull request

Run:

```bash
npm run check
```

Then check the affected pages on desktop and mobile.

Look for broken navigation, missing images, layout problems and browser console errors.

## Pull requests

Explain what changed, why it changed and how you tested it.

Add screenshots when the change is visual.

Keep pull requests focused. If a change contains several unrelated tasks, split it before review.

## Content changes

Confirm public information with the appropriate team lead before publishing it.

This includes sponsors, project details, member roles, recruitment information and event information.

Do not guess member identities, titles or private information.

## Images

Use clear file names and compressed images.

Prefer names such as:

```text
public/images/projects/aleasat-integration-test.jpg
public/images/outreach/2026-science-world.jpg
```

Avoid camera defaults, screenshots with unclear names and duplicate final versions.

## Code

Follow the existing React and TypeScript structure.

Keep routes in `src/App.tsx`.

Prefer reusable components or typed data when the same structure appears several times.

Do not add a new dependency when the existing stack already solves the problem.

Remove abandoned code once the final approach is agreed on.

## Deployment

Do not deploy from a personal laptop.

Changes merged into `main` are checked and deployed by GitHub Actions.

Do not edit the generated `gh-pages` branch.

## Services

GitHub Pages hosts the website.

Squarespace manages the domain and DNS.

The Netlify files in this repository are legacy files. Do not build new work around them unless the team intentionally returns to Netlify.

## Secrets

Keep tokens, passwords, private keys, DNS credentials, SMTP credentials and recovery codes out of GitHub.
