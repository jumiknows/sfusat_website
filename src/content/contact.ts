// GitHub Pages cannot send email, so the contact form is delivered by Web3Forms.
// Create a key at https://web3forms.com using the team inbox below. Submissions go to
// the address the key was created with. This key is designed to be public, so it is safe
// to commit. While it is empty, the form offers to open the visitor's email app instead.
export const CONTACT_EMAIL = 'sfusat@sfu.ca';
export const CONTACT_FORM_ENDPOINT = 'https://api.web3forms.com/submit';
export const CONTACT_FORM_ACCESS_KEY = '3e704491-3948-4857-8524-47673b632505';
export const INSTAGRAM_URL = 'https://www.instagram.com/sfu.satellite/';
export const SOCIAL_LINKS = [
  { network: 'instagram', label: 'Instagram', handle: '@sfu.satellite', url: INSTAGRAM_URL },
  { network: 'linkedin', label: 'LinkedIn', handle: 'SFU Satellite Design Team', url: 'https://www.linkedin.com/company/sfu-satellite-design/' },
  { network: 'facebook', label: 'Facebook', handle: 'sfu.satellite', url: 'https://www.facebook.com/sfu.satellite/' }
] as const;
