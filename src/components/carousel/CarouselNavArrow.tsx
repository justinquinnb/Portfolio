import styles from "./singlepanecarousel.module.css";
import React from "react";

/**
 * A navigation arrow for a carousel.
 * @param className the class name to apply to the component
 * @param direction the direction of the arrow
 * @param onClick the function to call when the arrow is clicked
 * @constructor
 */
export default function CarouselNavArrow(
    {className, direction, onClick}: {
      className?: string;
      direction: "left" | "right" | "up" | "down",
      onClick: () => void
    }) {
  let iconName: string;

  switch (direction) {
    case "left":
      iconName = "chevron_left";
      break;
    case "right":
      iconName = "chevron_right";
      break;
    case "up":
      iconName = "keyboard_arrow_up";
      break;
    case "down":
      iconName = "keyboard_arrow_down";
      break;
  }

  return (
      <button className={`${styles.navArrowButton} ${className}`} onClick={onClick}
              aria-label={(direction === "left" || direction === "up" ? "Previous" : "Next") + " item"}
      >
        <span className={`material-symbols-sharp ${styles.navArrowIcon}`}>{iconName}</span>
      </button>
  )
}