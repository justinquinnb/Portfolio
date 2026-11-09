"use client"

import SingleColCarousel from "./SingleColCarousel";
import React, {JSX} from "react";
import styles from "./coltolistcarousel.module.css";
import {useCarousel} from "@/components/carousel/fragments/useCarousel";
import ListCarousel, {ListCarouselItem} from "@/components/carousel/ListCarousel";


/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param expandedItems the items to display when in dual-pane mode, if different from the
 * single-pane items
 * @param initialSelection the index of the item to initially display
 * @param staticContent the static content to display adjacent to the cycling items
 * @param showSelectors whether to display the dot selectors
 * @param showNavArrows whether to display the navigation arrows
 * @param autoPlay whether to automatically cycle through the items
 * @param delay the delay between each item change, in milliseconds (automatically lengthened when in dual-pane mode)
 * @constructor
 */
export default function ColToSplitCarousel(
    {
      items,
      initialSelection = 0,
      staticContent,
      showSelectors = true,
      showNavArrows = true,
      autoPlay = true,
      delay = 4000
    }:
    {
      items: ListCarouselItem[];
      initialSelection?: number;
      staticContent?: JSX.Element;
      showSelectors?: boolean;
      showNavArrows?: boolean;
      autoPlay?: boolean;
      delay?: number;
    }
) {
  const carouselControls = useCarousel(initialSelection, items.length, autoPlay, delay);

  return (
      <>
        <SingleColCarousel items={items}
                           staticContent={staticContent} showSelectors={showSelectors}
                           showNavArrows={showNavArrows}
                           carouselControls={carouselControls}
                           className={styles.singleColCarousel}
        />
        <ListCarousel items={items}
                           staticContent={staticContent}
                           carouselControls={carouselControls}
                           className={styles.listCarousel}
        />
      </>
  )
}