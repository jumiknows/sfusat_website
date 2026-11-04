import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES: Record<string, string> = {
  '/rover': 'Rover',
  '/rover/apply': 'Rover Applications',
  '/projects': 'Projects',
  '/projects/aleasat': 'ALEASAT',
  '/projects/balloon3': 'Balloon 3',
  '/projects/csdc5': 'CSDC5',
  '/projects/ccp1': 'CCP1',
  '/projects/balloon2': 'Balloon 2',
  '/projects/csdc4': 'CSDC4',
  '/projects/balloon1': 'Balloon 1',
  '/sponsors': 'Sponsors',
  '/outreach': 'Outreach',
  '/about': 'About',
  '/contact': 'Contact Us',
  '/join': 'Join'
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
