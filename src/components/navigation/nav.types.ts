/**
 * A dropped-down page to display under another page in the navigation
 */
export interface NavPage {
  name: string;
  path: string | null;
}

/**
 * The primary page appearing in the navigation for a dropdown group
 */
export interface NavGroup extends NavPage {
  subpages: NavPage[];
}


/**
 * A social link
 */
export interface SocialLink {
  icon: string;
  url: string;
  label: string;
}