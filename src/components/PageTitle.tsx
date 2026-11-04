import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PAGES from '../content/pages.json';

const SITE = 'https://sfusat.org';

const setMeta = (selector: string, attribute: string, value: string) => {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
};

// Keeps the browser tab and search details in step with the current page
const PageTitle: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const page = PAGES.find((entry) => entry.path === path);

    if (!page) {
      document.title = 'Page not found | SFU Satellite';
      return;
    }

    const title = page.path === '/' ? page.title : `${page.title} | SFU Satellite`;
    const url = page.path === '/' ? `${SITE}/` : `${SITE}${page.path}/`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [pathname]);

  return null;
};

export default PageTitle;
