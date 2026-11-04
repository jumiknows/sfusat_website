# How to Update the Website

Start here. Most updates only change one file in `src/content/`, and you do not need to know React.

## Where things are

```text
src/content/      The words, photos and links on the site. Most updates happen here.
src/pages/        One file for each page, plus its stylesheet.
src/components/   Parts shared between pages, such as the navbar and slideshow.
src/theme.css     Shared colours, text sizes and buttons.
public/images/    Photos and logos.
public/videos/    Short video clips.
```

## Common updates

| I want to change | Edit |
|---|---|
| Open or close recruitment | `src/content/recruitment.ts` |
| Outreach events | `src/content/events.ts` |
| Sponsors | `src/content/sponsors.ts` |
| Teams, milestones, values, mission | `src/content/about.ts` |
| Project cards and shorter project pages | `src/content/projects.ts` |
| Slideshow photos | `src/content/galleries.ts` |
| Rover subsystems | `src/content/rover.ts` |
| Home page numbers, logos and mission cards | `src/content/home.ts` |
| Email, social media links and contact form | `src/content/contact.ts` |
| Music tracks | `src/content/soundtrack.ts` |
| ALEASAT or Balloon 3 story text | `src/pages/Aleasat.tsx`, `src/pages/Balloon3.tsx` |
| Home page 3D flight text | `src/components/MissionSequence.tsx` |
| Navbar links | `src/components/Navbar.tsx` |

## Examples

### Add an outreach event

Open `src/content/events.ts` and add a line at the top of the right year:

```ts
{
  year: '2026',
  events: [
    'Science World visit November 2026',
    'SFU Surge StormHacks, reward track and judges October 2026'
  ]
}
```

For a new year, add a new block at the top of the list.

### Open recruitment for a program

Open `src/content/recruitment.ts`, find the program, set `open: true` and list its roles:

```ts
{
  id: 'balloon',
  name: 'High Altitude Balloon',
  open: true,
  page: '/projects/balloon3',
  deadline: 'January 31, 2027',
  roles: [
    {
      icon: faCode,
      name: 'Software',
      description: 'Flight computer and data logging',
      form: 'https://forms.gle/your-form'
    }
  ]
}
```

The Join page, Contact page, home page and project page banners all update from this file. To close recruitment, set `open: false`.

ALEASAT shares its postings and application form with UBC Orbit, so check that both sites agree before opening it.

### Add a sponsor

1. Put the logo in `public/images/sponsors/sponsor/`. Use a version with dark text, because cards are white.
2. Open `src/content/sponsors.ts` and add an entry to the right tier. Add one or two plain sentences saying what the organization does.
3. If the sponsor should also appear on the home page, add it to `HOME_SPONSORS` in `src/content/home.ts`.

### Add a project

1. Put its photo in `public/images/projects/`.
2. Open `src/content/projects.ts`.
3. Add a card to `PROJECTS`, with `link: '/projects/your-project'`.
4. Add an entry to `PROJECT_PAGES`, with `slug: 'your-project'`. The page and its address are created for you.
5. Add its title and a search description to `src/content/pages.json`. This is what Google shows.

The previous and next project links update by themselves.

### Replace a photo

1. Put the new photo in the matching folder in `public/images/`.
2. Update its path in the content file. Search the project for the old file name if you are unsure where it is used.
3. Write `alt` text that describes the photo, such as `Team members launching a balloon`.

Keep photos under about 500 KB and 2400px wide. Use clear file names, such as `balloon3-launch.jpg`. Do not credit people by name.

## Writing for the site

Use plain, factual wording. Say what the team did, with real details.

Avoid slogans and buzzwords such as "pushing the boundaries", "cutting-edge" or "journey".

Confirm public information with the appropriate team lead before publishing it.

## Search results

Each page's title and description for Google are in `src/content/pages.json`. Keep descriptions plain and under 200 characters.

The build creates a real page for every address in that file, and the sitemap, using `scripts/generate-pages.js`.

## Check your work

```bash
npm start
npm run check
```

`npm start` shows the site at http://localhost:3000.

`npm run check` tests the site. It also finds common content mistakes, such as a mistyped image name or a project card that links to a page that does not exist.

Look at the pages you changed on desktop and on a phone. Then follow [CONTRIBUTING.md](../CONTRIBUTING.md) to open a pull request.

## Changing how something looks

Each page has its own stylesheet next to it in `src/pages/`.

`src/theme.css` loads last and holds shared styles, along with some page styles that have not been moved yet. If a change in a page stylesheet has no effect, search `src/theme.css` for the same class name.

When you add a stylesheet to a page, also import it in `src/App.tsx`, above `theme.css`.

## If something goes wrong

Paste the error into your team channel with the name of the file you changed. To undo changes you have not committed, run `git checkout -- path/to/file`.
