'use client'

import React, {useRef} from "react";
import styles from "./radialnav.module.css";
import { useOnClickOutside } from 'usehooks-ts'

/**
 * Radial navigation menu for small (mobile) screens.
 * @constructor
 */
export default function RadialNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [menuGroup, setMenuGroup] = React.useState("Main");
  const ref = useRef<HTMLDivElement>(null!);

  // Close when clicking outside
  const handleClickOutside = () => {
    setIsOpen(false);
  }

  useOnClickOutside(ref, handleClickOutside);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(`isOpen is now: ${isOpen}`);
  }

  return (
      <nav className={`${styles.radial_nav} ${className}`} ref={ref}>
        <div>
          <button
              className={`${styles.menu_button} ${isOpen ? styles.is_open : ''}`}
              onClick={toggleMenu}
              aria-label={"Show Navigation Menu"}
          >Button</button>
          <div className={`${styles.menu} ${isOpen ? styles.is_open : ''}`}>
            <div className={styles.main}>
              <p>MENU!</p>
            </div>
            <div className={styles.about}>

            </div>
            <div className={styles.my_work}>

            </div>
          </div>
        </div>
      </nav>
  )
}