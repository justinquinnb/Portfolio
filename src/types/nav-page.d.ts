export interface NavPage {
  name: string;
  path: string;
}

export interface NavGroup extends NavPage {
  visitable: boolean;
  subpages: NavPage[];
}
