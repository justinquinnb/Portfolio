'use client'

import React, {CSSProperties, useEffect, useRef, useState} from "react";
import styles from "./radialnav.module.css";
import {useOnClickOutside} from 'usehooks-ts'
import {usePathname, useRouter} from "next/navigation";
import type {RadialNavItem} from "@/types/radial-nav-item";

/**
 * Radial navigation menu for small (mobile) screens.
 * @constructor
 */
export default function RadialNav({ className }: { className?: string }) {
  // Ensure the correct group is displayed on menu open
  const currentPath = usePathname();
  const [menuGroup, setMenuGroup] = React.useState(() => {
    if (currentPath.startsWith("/about") || currentPath === "/contact") {
      return "about";
    } else if (currentPath.startsWith("/my-work")) {
      return "work";
    } else {
      return "main";
    }
  });
  const menuRef = useRef<HTMLDivElement>(null!);
  const router = useRouter();

  // Close when clicking outside
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = () => {
    setIsOpen(false);
  }

  useOnClickOutside(menuRef, handleClickOutside);

  // Handle clicking the menu icon itself
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  // Page group definitions
  const universalGroupItems: RadialNavItem[] = [
    {label: "Categories", iconName: "arrow_top_left", onClick: () => setMenuGroup("main"),
      actionDesc: "View all page groups"},
  ];

  const mainGroup: RadialNavItem[] = [
    {label: "About", iconName: "article_person", onClick: () => setMenuGroup("about"),
      actionDesc: "View page selection group for biography, resume, and contact pages"},
    {label: "Home", iconName: "house", onClick: () => router.push("/"),
      actionDesc: "Go to homepage"},
    {label: "My Work", iconName: "gallery_thumbnail", onClick: () => setMenuGroup("work"),
      actionDesc: "View page selection group for my software, graphic design, photography, and music work"}
  ]

  const aboutGroup: RadialNavItem[] = [
    ...universalGroupItems,
    {label: "Biography", iconName: "badge", onClick: () => router.push("/about/bio"),
      actionDesc: "Go to biography page"},
    {label: "Resume", iconName: "description", onClick: () => router.push("/about/resume"),
      actionDesc: "Go to resume page"},
    {label: "Contact", iconName: "mail", onClick: () => router.push("/contact"),
      actionDesc: "Go to contact page"}
  ];

  const workGroup: RadialNavItem[] = [
    ...universalGroupItems,
    {label: "Photos", iconName: "photo_camera", onClick: () => router.push("/my-work/photos"),
      actionDesc: "Go to my photos page"},
    {label: "Software", iconName: "terminal", onClick: () => router.push("/my-work/software"),
      actionDesc: "Go to my software projects page"},
    {label: "Graphics", iconName: "design_services", onClick: () => router.push("/my-work/graphics"),
      actionDesc: "Go to my graphics page"},
    {label: "Music", iconName: "music_note", onClick: () => router.push("/my-work/music"),
      actionDesc: "Go to my music page"}
  ];

  function findNavPlacement(
      index: number, totalItems: number, distance: number, maxSpan: number,
      origin: {x: string, y: string}): {x: string, y: string}
  {
    // Place the first element of a 4-element+ group in the very center
    if (index == 0 && totalItems > 3) {
      return origin;
    }

    // Menu dimensions
    const dimension = 20;
    const maxDimension = `${dimension}rem`;

    // Determine left and right placement boundaries
    const largerAngle: number = 90 + (maxSpan / 2);
    const smallerAngle: number = 90 - (maxSpan / 2);

    // Determine the required angle increment based on the arrangement the item count requires
    const numRadialItems: number = totalItems > 3 ? totalItems - 2 : totalItems - 1;
    const angleIncrements: number = (largerAngle - smallerAngle) / (numRadialItems);
    const indexShift: number = totalItems > 3 ? 1 : 0;
    const angleInRadians = (largerAngle - (angleIncrements * (index - indexShift))) * Math.PI / 180;

    // Determine the max radius from the centerpoint to an item
    const maxRadius = `${dimension / 2}rem * ${distanceFromCenter}`; // dim/2 = radius;

    // Convert the polar coords to cartesian
    const maxX = `${maxRadius} * cos(${angleInRadians})`;
    const maxY = `${maxRadius} * sin(${angleInRadians})`;

    // Scale the cartesian coords against current dimensions, then offset for origin
    const scaledX = `calc((${maxX} / ${maxDimension} * 100%) + ${origin.x})`;
    const scaledY = `calc((${maxY} / ${maxDimension} * 100%) + ${origin.y})`;

    return {x: scaledX, y: scaledY};
  }

  const distanceFromCenter = 0.70; // % from centerpoint to circumference along radius
  const maxSpan = 160; // degrees of circumference to consider
  const origin = {x: "50%", y: "50%"}; // origin of translation

  return (
      <nav className={`${styles.radialNav} ${className}`}>
        <button
            className={`${styles.menuButton} ${isOpen ? styles.isOpen : ''}`}
            onClick={toggleMenu}
            aria-label={"Show Navigation Menu"}
        ><span className={`material-symbols-sharp ${styles.menuIcon}`}>menu</span></button>
        <div className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`} ref={menuRef}>
          <div className={`${styles.menuGroup} ${styles.main} ${menuGroup === "main" ? styles.isSelected : ""}`}>
            {mainGroup.map((item: RadialNavItem, index: number, list: RadialNavItem[]) => {
              const position: {x: string, y: string} = findNavPlacement(
                  index, list.length, distanceFromCenter, maxSpan, origin);
              return (
                  <RadialNavItem key={item.label} navItem={item}
                                 inlineStyles={{left: position.x, bottom: position.y}}
                                 className={item.label.toLowerCase().replace(" ", "")}/>
              )
            })}
          </div>
          <div className={`${styles.menuGroup} ${styles.about} ${menuGroup === "about" ? styles.isSelected : ""}`}>
            {aboutGroup.map((item: RadialNavItem, index: number, list: RadialNavItem[]) => {
              const position: {x: string, y: string} = findNavPlacement(
                  index, list.length, distanceFromCenter, maxSpan, origin);
              return (
                  <RadialNavItem key={item.label} navItem={item}
                                 inlineStyles={{left: position.x, bottom: position.y}}
                                 className={item.label.toLowerCase().replace(" ", "")}/>
              )
            })}
          </div>
          <div className={`${styles.menuGroup} ${styles.myWork} ${menuGroup === "work" ? styles.isSelected : ""}`}>
            {workGroup.map((item: RadialNavItem, index: number, list: RadialNavItem[]) => {
              const position: {x: string, y: string} = findNavPlacement(
                  index, list.length, distanceFromCenter, maxSpan, origin);
              return (
                  <RadialNavItem key={item.label} navItem={item}
                                 inlineStyles={{left: position.x, bottom: position.y}}
                                 className={item.label.toLowerCase().replace(" ", "")}/>
              )
            })}
          </div>
        </div>
      </nav>
  )
}

function RadialNavItem(
    {navItem, className, inlineStyles}:
    {navItem: RadialNavItem; className?: string; inlineStyles?: CSSProperties})
{
  return (
      <button className={`${styles.navItem} ${className}`} style={inlineStyles} onClick={navItem.onClick} aria-label={navItem.actionDesc}>
        <span className={`${styles.navItemIcon} material-symbols-sharp`}>{navItem.iconName}</span>
        <p>{navItem.label}</p>
      </button>
  )
}
