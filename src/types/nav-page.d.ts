/**
 * A navbar page
 */
export interface NavbarPage {
  name: string;
  path: string;
}

/**
 * A navbar page group
 */
export interface NavbarGroup extends NavbarPage {
  visitable: boolean;
  subpages: NavPage[];
}
