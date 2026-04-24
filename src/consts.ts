// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'QuICC group';
export const SITE_DESCRIPTION = 'Quantum Information, Computation and Communication — Research group at ICC, Universidad de Buenos Aires.';

export const CV_URL = '';

export const CONTACT = {
  organization: 'QuICC — ICC, Universidad de Buenos Aires',
  addressLines: [
    'Buenos Aires, Argentina',
  ],
  emails: [
    'quicc-group@gmail.com',
  ],
};

export type SocialIcon = 'website' | 'scholar' | 'email' | 'github' | 'linkedin' | 'twitter';

export const SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  icon: SocialIcon;
}> = [
  {
    label: 'GitHub',
    href: '',
    icon: 'github',
  },
  {
    label: 'Email',
    href: 'mailto:',
    icon: 'email',
  },
  {
    label: 'LinkedIn',
    href: '',
    icon: 'linkedin',
  },
  {
    label: 'X',
    href: '',
    icon: 'twitter',
  },
];

export const FOOTER_CREDIT = {
  designerName: 'QuICC — ICC, UBA',
  designerUrl: '',
  sourceLabel: 'Based on Astro Scholar',
  sourceUrl: 'https://github.com/shravanngoswamii/astro-scholar',
};
