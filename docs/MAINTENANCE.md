# Website Maintenance Guide

This document is for the next SFU SAT website maintainer. It focuses on the tasks that are likely to happen repeatedly during the school year.

## 1. Start with the current production code

Before making changes:

```bash
git checkout main
git pull
git checkout -b content/short-description
npm install
npm start
```

Use a branch instead of editing `main` directly.

## 2. Update the home page

Main file:

```text
src/components/Home.tsx
```

The home page currently contains:

- the main hero;
- ALEASAT promotion;
- sponsor logo highlights;
- links to Projects, Sponsors, and Contact.

Images used locally are mostly under:

```text
public/images/hero/
public/images/sponsors/
```

If a home-page image changes, confirm the replacement is compressed and still looks good on mobile.

## 3. Add or update a project

The project grid is defined in:

```text
src/components/Projects.tsx
```

Projects are represented by a typed array with a title, image, description, and optional internal link.

For a new full project page:

1. create a component under `src/components/pages/`;
2. create the page stylesheet beside it if needed;
3. add the route to `src/App.tsx`;
4. add the project card to `src/components/Projects.tsx`;
5. add local media under `public/images/projects/` or another clearly named project folder;
6. test direct navigation to the new URL.

Keep route names short and lowercase.

## 4. Update ALEASAT or balloon mission pages

Mission detail pages live under:

```text
src/components/pages/
```

Current pages include:

- `Aleasat.tsx`
- `Balloon1.tsx`
- `Balloon2.tsx`
- `Balloon3.tsx`
- `CCP1.tsx`
- `CSDC4.tsx`
- `CSDC5.tsx`

Some of these pages currently reference media hosted outside this repository. If those external files are moved or removed, the website can break without a code change.

For important long-term media, prefer stable team-owned storage and document the source.

## 5. Update sponsors

Main file:

```text
src/components/Sponsors.tsx
```

Sponsor logo files are stored under:

```text
public/images/sponsors/
```

When changing sponsors:

1. confirm the sponsor name and tier with the team lead responsible for sponsorship;
2. use the approved current logo;
3. confirm the logo usage is permitted;
4. update the sponsor description if needed;
5. check both the Sponsors page and Home page, because the Home page contains a separate set of featured sponsor logos.

Do not leave a former sponsor displayed as current unless that is intentional.

## 6. Update outreach

Main file:

```text
src/components/Outreach.tsx
```

Outreach slideshow assets are under:

```text
public/images/outreach/
```

The event list is currently maintained directly in the component.

For each new event:

- add the event to the correct year;
- use a concise event title and month/year where known;
- add approved photos if available;
- use descriptive alt text rather than generic labels when practical.

## 7. Update team descriptions

Main file:

```text
src/components/About.tsx
```

The specialized team descriptions are stored in the `teams` array in that component.

When a subteam changes:

- update the team name;
- update the description;
- update the image source;
- verify the number shown in the team statistics still matches reality.

Do not guess titles, roles, or member identities for the website. Confirm them with the member or current team leadership.

## 8. Update rover recruitment

Main files:

```text
src/components/Rover.tsx
src/components/RoverApply.tsx
src/components/rover/
```

Rover media is stored under:

```text
public/images/rover/
public/models/
```

Check recruitment dates, application links, competition dates, and technical descriptions before each recruitment cycle.

## 9. Update navigation

Main file:

```text
src/components/Navbar.tsx
```

Routes themselves are registered in:

```text
src/App.tsx
```

When adding a new top-level page, update both places if it should appear in the public navigation.

## 10. Contact form

Frontend:

```text
src/components/Contact.tsx
```

Backend:

```text
netlify/functions/contact.js
```

The frontend POSTs to:

```text
/.netlify/functions/contact
```

The backend uses SMTP environment variables:

```text
SMTP_HOST
SMTP_USER
SMTP_PASS
SMTP_PORT
```

The production recipient and SMTP configuration should be reviewed during every maintainer handover.

Do not hard-code new passwords or tokens into the function.

To test the full contact flow locally, run the project through Netlify CLI instead of only `npm start`.

## 11. Deployment

The current repository has:

```text
netlify.toml
```

with:

- `npm run build` as the build command;
- `build/` as the published output;
- `netlify/functions` as the functions directory;
- a fallback redirect to `index.html` for React Router.

Before considering a change ready:

```bash
npm run build
```

Then check the affected routes manually.

The repository also still contains a GitHub Pages deployment script and a `gh-pages` branch from the older deployment approach. Do not assume those are the current production path.

## 12. Domain and service access

The codebase alone is not enough to operate the website.

At least two active team members should know who controls:

- the GitHub repository;
- Netlify;
- `sfusat.org` DNS/domain settings;
- the SMTP/email service;
- approved team photos and sponsor media.

Keep credentials in the appropriate password manager or service access controls, not in GitHub.

## 13. Recommended future cleanup

The highest-value refactors are:

1. move project, sponsor, outreach, and team content into typed data files instead of large JSX files;
2. remove stale commented-out code;
3. add CI that runs the production build and tests on pull requests;
4. expand automated tests for navigation and forms;
5. decide whether external GitHub-hosted media should move into team-controlled assets;
6. remove the legacy GitHub Pages deployment path once the team confirms Netlify is permanent;
7. plan a future migration away from Create React App rather than doing it during routine content work.

These are maintenance improvements, not prerequisites for normal website updates.
