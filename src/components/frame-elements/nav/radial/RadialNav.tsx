'use client'

import React, {CSSProperties, useRef, useState} from "react";
import styles from "./radialnav.module.css";
import radialNavItemsJson from "@/data/radial-nav-items.json";
import {useOnClickOutside} from 'usehooks-ts'
import {usePathname, useRouter} from "next/navigation";
import type {
  HydratedRadialNavItem,
  PositionedRadialNavItem,
  RadialNavItemData
} from "@/types/radial-nav-item";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

// Components
/**
 * Radial navigation menu for small (mobile) screens.
 * @constructor
 */
export default function RadialNav({ className }: { className?: string }) {
  // Ensure the correct group is displayed on menu open
  const currentPath = usePathname();
  const [menuGroup, setMenuGroup] = useState(() => determineMenuGroup(currentPath));

  // Close when clicking outside
  const menuRef = useRef<HTMLDivElement>(null!);
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = () => {
    setIsOpen(false);
  }

  useOnClickOutside(menuRef, handleClickOutside);

  // Handle clicking the menu icon itself
  const toggleMenu = () => {
    if (!isOpen) {
      setMenuGroup(determineMenuGroup(currentPath));
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  // Hydrate nav items (position and actions)
  const router = useRouter();
  const [menuGroups] = useState(
      () => buildMenuGroups(router, setMenuGroup, setIsOpen, () => currentPath));

  return (
      <nav className={`${styles.radialNav} ${className}`}>
        <button
            className={`${styles.menuButton} ${isOpen ? styles.isOpen : ''}`}
            onClick={toggleMenu}
            aria-label={"Show Navigation Menu"}
        ><span className={`material-symbols-sharp ${styles.menuIcon}`}>menu</span></button>
        <div className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`} ref={menuRef}>
          <div className={`${styles.menuGroup} ${styles.main} ${menuGroup === "main" ? styles.isSelected : ""}`}>
            {menuGroups.main.map((item: PositionedRadialNavItem) => {
              const selected = isSelected(item, currentPath) ? styles.selected : "";
              return (
                  <RadialNavItem key={item.label} navItem={item} className={
                    `${styles[item.label.toLowerCase().replace(" ", "")]} 
                    ${selected}`}
                  />
              )
            })}
          </div>
          <div className={`${styles.menuGroup} ${styles.about} ${menuGroup === "about" ? styles.isSelected : ""}`}>
            {menuGroups.about.map((item: PositionedRadialNavItem) => {
              const selected = isSelected(item, currentPath) ? styles.selected : "";
              return (
                  <RadialNavItem key={item.label} navItem={item} className={
                    `${styles[item.label.toLowerCase().replace(" ", "")]} 
                    ${selected}`}
                  />
              )
            })}
          </div>
          <div className={`${styles.menuGroup} ${styles.myWork} ${menuGroup === "work" ? styles.isSelected : ""}`}>
            {menuGroups.work.map((item: PositionedRadialNavItem) => {
              const selected = isSelected(item, currentPath) ? styles.selected : "";
              return (
                  <RadialNavItem key={item.label} navItem={item} className={
                    `${styles[item.label.toLowerCase().replace(" ", "")]} 
                    ${selected}`}
                  />
              )
            })}
          </div>
        </div>
      </nav>
  )
}

function RadialNavItem(
    {navItem, className}:
    {navItem: PositionedRadialNavItem; className?: string; inlineStyles?: CSSProperties})
{
  const inlineStyles = {
    left: navItem.x,
    bottom: navItem.y
  }

  return (
      <button className={`${styles.navItem} ${className}`} style={inlineStyles}
              onClick={navItem.onClick} aria-label={navItem.actionDesc}
      >
        <span className={`${styles.navItemIcon} material-symbols-sharp`}>{navItem.iconName}</span>
        <p>{navItem.label}</p>
      </button>
  )
}

// Utilities
/**
 * Builds all the menu groups for the radial nav to display using the JSON defined at the top of
 * this file.
 *
 * @param router the app router (used to generate item actions)
 * @param groupChanger the groupChanger method (used to generate item actions)
 * @param menuToggler the method to toggle the menu's display
 * @param currentPath the method to obtain the client's current path
 */
function buildMenuGroups(
    router: AppRouterInstance, groupChanger: (group: string) => void,
    menuToggler: (show: boolean) => void, currentPath: () => string):
    {main: PositionedRadialNavItem[], about: PositionedRadialNavItem[], work: PositionedRadialNavItem[]}
{
  const mainGroupTemplate: RadialNavItemData[] = radialNavItemsJson.main;
  const aboutGroupTemplate: RadialNavItemData[] = radialNavItemsJson.about;
  const workGroupTemplate: RadialNavItemData[] = radialNavItemsJson.work;

  // Hydrate these nav items
  const universalItemsTemplate: RadialNavItemData[] = radialNavItemsJson.inAllGroups;

  // Hydrate the universal items first
  const universalItems: HydratedRadialNavItem[] = buildRadialNavItemGroup(
      universalItemsTemplate, [], router, groupChanger, menuToggler, currentPath
  );

  return {
    main: buildRadialNavItemGroup(mainGroupTemplate, [], router, groupChanger, menuToggler,
        currentPath),
    about: buildRadialNavItemGroup(aboutGroupTemplate, universalItems, router, groupChanger,
        menuToggler, currentPath),
    work: buildRadialNavItemGroup(workGroupTemplate, universalItems, router, groupChanger,
        menuToggler, currentPath)
  }
}

/**
 * Hydrates and positions each item using its data to create a complete, display-ready radial
 * nav item group.
 *
 * @param rawItems the raw, data-only items to hydrate and position
 * @param additions pre-hydrated items to prepend to the group
 * @param router the app router (used to generate item actions)
 * @param groupChanger the groupChanger method (used to generate item actions)
 * @param menuToggler the method to toggle the menu's display
 * @param currentPath the method to obtain the client's current path
 */
function buildRadialNavItemGroup(
    rawItems: RadialNavItemData[], additions: HydratedRadialNavItem[], router: AppRouterInstance,
    groupChanger: (group: string) => void, menuToggler: (show: boolean) => void,
    currentPath: () => string
): PositionedRadialNavItem[] {
  // Assign each item the correct onClick action
  let hydratedItems: HydratedRadialNavItem[] = [];
  for (const item of rawItems) {
    // Determine the correct action
    let onClick: () => void = () => {};
    if ("path" in item.target) {
      const path = item.target.path;
      onClick = () => {
        if (path != currentPath()) {
          router.push(path);
        }
        menuToggler(false);
      }
    } else if ("group" in item.target) {
      const group = item.target.group;
      onClick = () => groupChanger(group);
    }

    // Build the item and push it to the list
    hydratedItems.push({
      label: item.label,
      iconName: item.iconName,
      target: item.target,
      actionDesc: item.actionDesc,
      onClick: onClick
    })
  }

  // Prepend all the additions
  hydratedItems = [...additions, ...hydratedItems];

  // Position each item
  const distance = 0.70; // % from centerpoint to circumference along radius
  const maxSpan = 160; // degrees of circumference to consider
  const displaceFrom = {x: "50%", y: "50%"}; // origin of translation
  const centerItemPos = {x: "50%", y: "57%"}; // place center item here

  return hydratedItems.map((item, index, list) => {
    const {x, y}: {
      x: string,
      y: string
    } = findItemPlacement(index, list.length, distance, maxSpan, displaceFrom, centerItemPos);
    return {
      label: item.label,
      iconName: item.iconName,
      target: item.target,
      actionDesc: item.actionDesc,
      onClick: item.onClick,
      x: x,
      y: y
    }
  });
}

/**
 * Determines the radial placement of the nav item within its group context.
 *
 * @param index the index of the item within its group
 * @param totalItems the total number of items within its group
 * @param distance the desired distance along the radius towards the circumference (a percent)
 * @param maxSpan the maximum angle that defines the portion of the radial menu items can be
 * placed within
 * @param displaceFrom the origin to base displacements off of (x,y) in the context of the menu
 * @param centerItemPos where to place the bottom center item (if the position is used)
 */
function findItemPlacement(
    index: number, totalItems: number, distance: number, maxSpan: number,
    displaceFrom: {x: string, y: string}, centerItemPos: {x: string, y: string}): {x: string, y: string}
{
  // Place the first element of a 4-element+ group in the very center
  if (index == 0 && (totalItems > 3 || totalItems == 1)) {
    return centerItemPos;
  }

  // Menu dimensions
  const dimension = 20;
  const maxDimension = `${dimension}rem`;

  // Determine the number of items that lie along the radius
  const numRadialItems: number = totalItems > 3 ? totalItems - 2 : totalItems - 1;

  // Determine left and right placement boundaries based on radial item count
  const span = ((numRadialItems * 0.06) + 0.70) * maxSpan;
  const largerAngle: number = 90 + (span / 2);
  const smallerAngle: number = 90 - (span / 2);

  // Determine the required angle increment based on the arrangement the item count requires
  const angleIncrements: number = (largerAngle - smallerAngle) / (numRadialItems);
  const indexShift: number = totalItems > 3 ? 1 : 0;
  const angleInRadians = (largerAngle - (angleIncrements * (index - indexShift))) * Math.PI / 180;

  // Determine the max radius from the centerpoint to an item
  const maxRadius = `${dimension / 2}rem * ${distance}`; // dim/2 = radius;

  // Convert the polar coords to cartesian
  const maxX = `${maxRadius} * cos(${angleInRadians})`;
  const maxY = `${maxRadius} * sin(${angleInRadians})`;

  // Scale the cartesian coords against current dimensions, then offset for origin
  const scaledX = `calc((${maxX} / ${maxDimension} * 100%) + ${displaceFrom.x})`;
  const scaledY = `calc((${maxY} / ${maxDimension} * 100%) + ${displaceFrom.y})`;

  return {x: scaledX, y: scaledY};
}

/**
 * Determines the radial nav menu group given the current pathname.
 * @param currentPath the pathname whose radial nav group to determine
 */
function determineMenuGroup(currentPath: string): string {
  if (currentPath.startsWith("/about") || currentPath === "/contact") {
    return "about";
  } else if (currentPath.startsWith("/my-work")) {
    return "work";
  } else {
    return "main";
  }
}

/**
 * Determines whether the current radial nav item should be rendered as "selected", based on
 * whether the user is on its current page or on a page in its group.
 *
 * @param item the item whose selected status to check
 * @param currentPath the client's current path
 */
function isSelected(item: RadialNavItemData, currentPath: string): boolean {
  if ("path" in item.target) {
    const path = item.target.path;
    return path === currentPath;
  } else if ("group" in item.target) {
    const group = item.target.group;
    const inGroup = determineMenuGroup(currentPath);
    return inGroup === group;
  }

  return false;
}
