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

## Content updates

[HOW_TO_UPDATE.md](HOW_TO_UPDATE.md) explains how to change content, including recruitment, events, sponsors, projects and photos.

Confirm sponsor names, tiers and logos, and event details, before publishing them.

## Rover

Rover content is in `src/content/rover.ts` and `src/pages/Rover.tsx`.

The application page is `src/pages/RoverApply.tsx`. Its game and 3D model are in `src/components/rover/`, and its form links are in `src/content/recruitment.ts`.

## Navigation

Edit `src/components/Navbar.tsx`.

Routes are registered in `src/App.tsx`. Pages listed in `PROJECT_PAGES` in `src/content/projects.ts` get their routes automatically.

## Home page 3D flight

The flight is in `src/components/MissionSequence.tsx` (text and scrolling) and `src/components/missionScene.ts` (the 3D scene).

Earth and Mars are painted into textures once at startup. Avoid adding work that runs for every pixel on every frame, because it makes scrolling slow.

After changing it, scroll the home page on an average laptop and a phone.

## Soundtrack

The tracks are listed in `src/content/soundtrack.ts`. Use the video ID of an official YouTube upload, ideally a "Provided to YouTube" track that shows still album art.

Keep the YouTube player visible and do not make it start by itself. Do not host downloaded copies of the music.

## Videos

Clips are in `public/videos/`, each as an `.mp4` with a `.jpg` poster of the same name. Keep them short, silent and small, and remove their metadata when converting.

Confirm permission before publishing footage of people or test facilities.

## Contact form

GitHub Pages cannot send email, so `src/pages/Contact.tsx` submits to Web3Forms, which delivers messages to the team inbox.

The team address and access key are in `src/content/contact.ts`. The Web3Forms access key is public by design. To change the receiving inbox, create a new key with that address.

While the key is empty, the form opens the visitor's email app instead.

After changing either value, send a real test message from the live site and confirm that it arrives.

Never put SMTP passwords or private API keys in frontend code.

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
