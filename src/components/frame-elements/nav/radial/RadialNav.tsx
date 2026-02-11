'use client'

import React, {useRef} from "react";
import styles from "./radialnav.module.css";
import {useOnClickOutside} from 'usehooks-ts'
import {usePathname, useRouter} from "next/navigation";
import type {RadialNavItem} from "@/types/radial-nav-item";

/**
 * Radial navigation menu for small (mobile) screens.
 * @constructor
 */
export default function RadialNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [menuGroup, setMenuGroup] = React.useState("main");
  const menuRef = useRef<HTMLDivElement>(null!);
  const router = useRouter();

  // Close when clicking outside
  const handleClickOutside = () => {
    setIsOpen(false);
  }

  useOnClickOutside(menuRef, handleClickOutside);

  // Handle clicking the menu icon itself
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  // Ensure the correct group is displayed on menu open
  const currentPath = usePathname();
  React.useEffect(() => {
    if (currentPath.startsWith("/about") || currentPath === "/contact") {
      setMenuGroup("about");
    } else if (currentPath.startsWith("/my-work")) {
      setMenuGroup("work");
    } else {
      setMenuGroup("main");
    }
  }, [currentPath]);

  // Page group definitions
  const universalGroupItems: RadialNavItem[] = [
    {label: "Other Pages", iconName: "arrow_top_left", onClick: () => setMenuGroup("main"),
      actionDesc: "View all page groups"},
  ];

  const mainGroup: RadialNavItem[] = [
    {label: "Home", iconName: "house", onClick: () => router.push("/"),
      actionDesc: "Go to homepage"},
    {label: "About", iconName: "article_person", onClick: () => setMenuGroup("about"),
      actionDesc: "View page selection group for biography, resume, and contact pages"},
    {label: "My Work", iconName: "gallery_thumbnail", onClick: () => setMenuGroup("work"),
      actionDesc: "View page selection group for my software, graphic design, photography, and music work"}
  ]

  const aboutGroup: RadialNavItem[] = [
    {label: "Biography", iconName: "badge", onClick: () => router.push("/about/bio"),
      actionDesc: "Go to biography page"},
    {label: "Resume", iconName: "description", onClick: () => router.push("/about/resume"),
      actionDesc: "Go to resume page"},
    {label: "Contact", iconName: "mail", onClick: () => router.push("/contact"),
      actionDesc: "Go to contact page"},
    ...universalGroupItems
  ];

  const workGroup: RadialNavItem[] = [
    {label: "Software", iconName: "terminal", onClick: () => router.push("/my-work/software"),
      actionDesc: "Go to my software projects page"},
    {label: "Graphics", iconName: "design_services", onClick: () => router.push("/my-work/graphics"),
      actionDesc: "Go to my graphics page"},
    {label: "Photos", iconName: "photo_camera", onClick: () => router.push("/my-work/photos"),
      actionDesc: "Go to my photos page"},
    {label: "Music", iconName: "music_note", onClick: () => router.push("/my-work/music"),
      actionDesc: "Go to my music page"},
    ...universalGroupItems
  ];

  return (
      <nav className={`${styles.radialNav} ${className}`}>
        <button
            className={`${styles.menuButton} ${isOpen ? styles.isOpen : ''}`}
            onClick={toggleMenu}
            aria-label={"Show Navigation Menu"}
        ><span className={`material-symbols-sharp ${styles.menuIcon}`}>menu</span></button>
        <div className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`} ref={menuRef}>
          <div className={`${styles.menuGroup} ${styles.main} ${menuGroup === "main" ? styles.isSelected : ""}`}>
            {mainGroup.map((item) =>
                <RadialNavItem key={item.label} navItem={item} className={item.label.toLowerCase()}/>
            )}
          </div>
          <div className={`${styles.menuGroup} ${styles.about} ${menuGroup === "about" ? styles.isSelected : ""}`}>
            {aboutGroup.map((item) =>
                <RadialNavItem key={item.label} navItem={item} className={item.label.toLowerCase()}/>
            )}
          </div>
          <div className={`${styles.menuGroup} ${styles.myWork} ${menuGroup === "work" ? styles.isSelected : ""}`}>
            {workGroup.map((item) =>
                <RadialNavItem key={item.label} navItem={item} className={item.label.toLowerCase()}/>
            )}
          </div>
        </div>
      </nav>
  )
}

function RadialNavItem(
    {navItem, className}:
    {navItem: RadialNavItem; className?: string})
{
  return (
      <button className={`${styles.navItem} ${className}`} onClick={navItem.onClick} aria-label={navItem.actionDesc}>
        <span className={`${styles.navItemIcon} material-symbols-sharp`}>{navItem.iconName}</span>
        <p>{navItem.label}</p>
      </button>
  )
}
