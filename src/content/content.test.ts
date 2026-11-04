// Catches mistakes in the content files, such as a mistyped image name, before they reach the site.
import fs from 'fs';
import path from 'path';
import { HOME_MISSIONS, HOME_SPONSORS } from './home';
import { ALEASAT_PHOTOS, ALEASAT_TEST_PHOTOS, BALLOON3_PHOTOS, OUTREACH_PHOTOS, ROVER_PHOTOS } from './galleries';
import { PROJECT_PAGES, PROJECTS } from './projects';
import { PROGRAMS } from './recruitment';
import { SPONSOR_TIERS } from './sponsors';
import { TEAMS } from './about';
import { EVENTS } from './events';
import PAGES from './pages.json';

const inPublicFolder = (file: string) => fs.existsSync(path.join(process.cwd(), 'public', file));

const images = [
  ...HOME_MISSIONS.map((item) => item.image),
  ...HOME_SPONSORS.map((item) => item.src),
  ...ALEASAT_PHOTOS.map((item) => item.url),
  ...ALEASAT_TEST_PHOTOS.map((item) => item.src),
  ...BALLOON3_PHOTOS.map((item) => item.url),
  ...OUTREACH_PHOTOS.map((item) => item.url),
  ...ROVER_PHOTOS.map((item) => item.url),
  ...PROJECTS.map((item) => item.image),
  ...PROJECT_PAGES.flatMap((item) => [item.image, ...(item.photos ?? []).map((photo) => photo.src)]),
  ...SPONSOR_TIERS.flatMap((tier) => tier.sponsors.map((sponsor) => sponsor.logo)),
  ...TEAMS.map((item) => item.image)
];

test.each(images)('image file exists: %s', (image) => {
  expect(inPublicFolder(image)).toBe(true);
});

test('every project card links to a page that exists', () => {
  const pages = ['/rover', '/projects/aleasat', '/projects/balloon3', ...PROJECT_PAGES.map((page) => `/projects/${page.slug}`)];

  PROJECTS.forEach((project) => {
    expect(pages).toContain(project.link);
  });
});

test('every open recruitment program has roles with form links', () => {
  PROGRAMS.filter((program) => program.open).forEach((program) => {
    expect(program.roles.length).toBeGreaterThan(0);
    program.roles.forEach((role) => {
      expect(role.form).toMatch(/^https:\/\//);
    });
  });
});

test('every page has search details', () => {
  const paths = PAGES.map((page) => page.path);

  [...PROJECTS.map((project) => project.link), ...PROJECT_PAGES.map((page) => `/projects/${page.slug}`)].forEach((path) => {
    expect(paths).toContain(path);
  });
  PAGES.forEach((page) => {
    expect(page.description.length).toBeGreaterThan(30);
    expect(page.description.length).toBeLessThanOrEqual(200);
  });
});

test('every sponsor has a description', () => {
  SPONSOR_TIERS.flatMap((tier) => tier.sponsors).forEach((sponsor) => {
    expect(sponsor.about.length).toBeGreaterThan(10);
  });
});

test('events are listed newest year first', () => {
  const years = EVENTS.map((entry) => Number(entry.year));

  expect(years).toEqual([...years].sort((a, b) => b - a));
});
