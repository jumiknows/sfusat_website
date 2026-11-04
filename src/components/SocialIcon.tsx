import React from 'react';

// The project's icon set has no brand logos, so these are drawn inline
const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1" />
    </>
  ),
  linkedin: (
    <path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1.7 6h3.4v12H2.300ZM9 9h3.200v1.700C12.900 9.500 14.300 8.700 16 8.700c3.600 0 5 2.300 5 5.900V21h-3.400v-5.700c0-1.900-.6-3.300-2.300-3.300-1.800 0-2.900 1.300-2.900 3.300V21H9Z" />
  ),
  facebook: (
    <path d="M14 22v-8.500h2.900l.5-3.500H14V7.900c0-1 .3-1.700 1.800-1.700h1.700V3.100c-.3 0-1.300-.1-2.500-.1-2.600 0-4.300 1.600-4.300 4.400V10H8v3.500h2.700V22Z" />
  )
};

interface SocialIconProps {
  network: keyof typeof ICONS;
}

const SocialIcon: React.FC<SocialIconProps> = ({ network }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    {ICONS[network]}
  </svg>
);

export default SocialIcon;
