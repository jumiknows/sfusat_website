// Runs after every build. GitHub Pages answers unknown addresses with a 404, which keeps inner pages
// out of Google. This writes a real page for each address in src/content/pages.json, with its own
// title and description, and writes the sitemap.
const fs = require('fs');
const path = require('path');

const SITE = 'https://sfusat.org';
const build = path.join(__dirname, '..', 'build');
const pages = require('../src/content/pages.json');
const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`generate-pages: index.html is missing ${pattern}`);
  }
  return html.replace(pattern, replacement);
};

pages.forEach(({ path: route, title, description }) => {
  const url = route === '/' ? `${SITE}/` : `${SITE}${route}/`;
  const fullTitle = escapeHtml(route === '/' ? title : `${title} | SFU Satellite`);
  const text = escapeHtml(description);

  let html = template;
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${fullTitle}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${text}"/>`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${fullTitle}"/>`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${text}"/>`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}"/>`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}"/>`);

  const folder = path.join(build, route);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), html);
});

const urls = pages
  .map(({ path: route }) => `  <url><loc>${route === '/' ? `${SITE}/` : `${SITE}${route}/`}</loc></url>`)
  .join('\n');
fs.writeFileSync(
  path.join(build, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`generate-pages: wrote ${pages.length} pages and sitemap.xml`);
