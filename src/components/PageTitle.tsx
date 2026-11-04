import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROJECT_PAGES } from '../content/projects';

const PAGE_TITLES: Record<string, string> = {
  '/rover': 'Rover',
  '/rover/apply': 'Rover Applications',
  '/projects': 'Projects',
  '/projects/aleasat': 'ALEASAT',
  '/projects/balloon3': 'Balloon 3',
  '/sponsors': 'Sponsors',
  '/outreach': 'Outreach',
  '/about': 'About',
  '/contact': 'Contact Us',
  '/join': 'Join',
  ...Object.fromEntries(PROJECT_PAGES.map((project) => [`/projects/${project.slug}`, project.title]))
};

const PageTitle: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isHome = pathname === '/' || pathname === '/website';
    const title = PAGE_TITLES[pathname.replace(/\/$/, '')] ?? 'Page not found';
    document.title = isHome ? 'SFU Satellite' : `${title} | SFU Satellite`;
  }, [pathname]);

  return null;
};

export default PageTitle;
