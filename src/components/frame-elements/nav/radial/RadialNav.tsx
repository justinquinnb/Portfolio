'use client'

import React, {useEffect, useRef} from "react";
import styles from "./radialnav.module.css";
import {useOnClickOutside, useTimeout} from 'usehooks-ts'
import {usePathname} from "next/navigation";

/**
 * Radial navigation menu for small (mobile) screens.
 * @constructor
 */
export default function RadialNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null!);

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
  let menuGroup = "main";
  if (currentPath.startsWith("/about") || currentPath === "/contact") {
    menuGroup = "me";
  } else if (currentPath.startsWith("/my-work")) {
    menuGroup = "work";
  }

  return (
      <nav className={`${styles.radialNav} ${className}`}>
        <button
            className={`${styles.menuButton} ${isOpen ? styles.isOpen : ''}`}
            onClick={toggleMenu}
            aria-label={"Show Navigation Menu"}
        ><span className={`material-symbols-sharp ${styles.menuIcon}`}>menu</span></button>
        <div className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`} ref={menuRef}>
          <div className={`${styles.menuGroup} ${styles.main} ${menuGroup === "main" ? styles.isSelected : ""}`}>
            <p>Main</p>
          </div>
          <div className={`${styles.menuGroup} ${styles.me} ${menuGroup === "me" ? styles.isSelected : ""}`}>
            <p>Me</p>
          </div>
          <div className={`${styles.menuGroup} ${styles.myWork} ${menuGroup === "work" ? styles.isSelected : ""}`}>
            <p>Work</p>
          </div>
        </div>
      </nav>
  )
}