import styles from "./carousel.module.css";
import React from "react";

/**
 * A navigation arrow for a carousel.
 * @param direction the direction of the arrow
 * @param onClick the function to call when the arrow is clicked
 * @constructor
 */
export default function CarouselNavArrow(
    {direction, onClick}: {direction: "left" | "right" | "up" | "down", onClick: () => void})
{
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
      <button className={styles.navArrowButton} onClick={onClick}
          aria-label={(direction === "left" || direction === "up" ? "Previous" : "Next") + " item"}
      >
        <span className={`material-symbols-sharp ${styles.navArrowIcon}`}>{iconName}</span>
      </button>
  )
}