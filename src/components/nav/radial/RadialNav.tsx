'use client'

import React, {useEffect, useRef} from "react";
import styles from "./radialnav.module.css";
import {useOnClickOutside, useTimeout} from 'usehooks-ts'

/**
 * Radial navigation menu for small (mobile) screens.
 * @constructor
 */
export default function RadialNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [menuGroup, setMenuGroup] = React.useState("Main");

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

  const isScrolling = false;

  return (
      <nav className={`${styles.radial_nav} ${className}`}>
        <button
            className={`${styles.menu_button} ${isOpen ? styles.is_open : ''}
              ${isScrolling ? styles.is_scrolling : ''}`}
            onClick={toggleMenu}
            aria-label={"Show Navigation Menu"}
        ><span className={`material-symbols-sharp ${styles.menu_icon}`}>menu</span></button>
        <div className={`${styles.menu} ${isOpen ? styles.is_open : ''}`} ref={menuRef}>
          <div className={styles.main}>
            <p>MENU!</p>
          </div>
          <div className={styles.about}>

          </div>
          <div className={styles.my_work}>

          </div>
        </div>
      </nav>
  )
}