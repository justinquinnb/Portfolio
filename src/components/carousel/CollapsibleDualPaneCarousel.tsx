import SinglePaneCarousel from "@/components/carousel/SinglePaneCarousel";
import styles from "@/components/carousel/collapsibledualpanecarousel.module.css";
import DualPaneCarousel from "@/components/carousel/DualPaneCarousel";
import React, {JSX} from "react";
import {CarouselItem} from "@/types/carousel-item";

/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param expandedItems the items to display when in dual-pane mode, if different from the
 * single-pane items
 * @param initialSelection the index of the item to initially display
 * @param staticContent the static content to display adjacent to the cycling items
 * @param selectorsType the type of item selectors to display, if any
 * @param showNavArrows whether to display the navigation arrows
 * @param autoPlay whether to automatically cycle through the items
 * @param delay the delay between each item change, in milliseconds
 * @param className any classes to apply to the component
 * @constructor
 */
export default function CollapsibleDualPaneCarousel(
    {
      items,
      expandedItems = items,
      initialSelection = 0,
      staticContent,
      selectorsType = "dots",
      showNavArrows = true,
      autoPlay = true,
      delay = 4000,
      className = ""
    }:
    {
      items: CarouselItem[];
      expandedItems?: CarouselItem[];
      initialSelection?: number;
      staticContent?: JSX.Element;
      selectorsType?: "dots" | "images" | "both" | "none";
      showNavArrows?: boolean;
      autoPlay?: boolean;
      delay?: number;
      className?: string;
    }
) {


  return (
      <>
        <SinglePaneCarousel
            className={`${styles.singlePaneCarousel} ${className}`} items={items} initialSelection={initialSelection}
            staticContent={staticContent} selectorsType={selectorsType}
            showNavArrows={showNavArrows}
            autoPlay={autoPlay} delay={delay}
        />
        <DualPaneCarousel
            className={`${styles.dualPaneCarousel} ${className}`} items={expandedItems}
            initialSelection={initialSelection}
            staticContent={staticContent} selectorsType={selectorsType}
            showNavArrows={showNavArrows}
            autoPlay={autoPlay} delay={delay * 1.2} // Because it's wider and "heavier"
        />
      </>
  )
}