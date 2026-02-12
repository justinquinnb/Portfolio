/**
 * A radial nav item, which can be a page link or action
 */
export interface RadialNavItemData {
  label: string;
  iconName: string;
  target: {path: string} | {group: string};
  actionDesc: string;
}

/**
 * A radial nav item with its action specified
 */
export interface HydratedRadialNavItem extends RadialNavItemData {
  onClick?: () => void;
}

/**
 * A radial nav item with its position specified
 */
export interface PositionedRadialNavItem extends HydratedRadialNavItem {
  x: string;
  y: string;
}