"use client"

import SingleColCarousel from "./SingleColCarousel";
import SplitPaneCarousel from "./SplitPaneCarousel";
import React, {JSX} from "react";
import styles from "./coltosplitcarousel.module.css";
import {CarouselItem} from "./fragments/carousel-item";
import {useCarousel} from "@/components/carousel/fragments/useCarousel";
import CarouselFrame from "@/components/carousel/fragments/CarouselFrame";
import CarouselNavArrow from "@/components/carousel/fragments/CarouselNavArrow";
import CarouselDotsSelector from "@/components/carousel/fragments/CarouselDotsSelector";

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
      expandedItems = items,
      initialSelection = 0,
      staticContent,
      showSelectors = true,
      showNavArrows = true,
      autoPlay = true,
      delay = 4000
    }:
    {
      items: CarouselItem[];
      expandedItems?: CarouselItem[];
      initialSelection?: number;
      staticContent?: JSX.Element;
      showSelectors?: boolean;
      showNavArrows?: boolean;
      autoPlay?: boolean;
      delay?: number;
    }
) {
  const carouselControls = useCarousel(initialSelection, items.length, autoPlay, delay);
  const {
    currentIndex,
    selectNextItem,
    selectPreviousItem,
    selectItem
  } = carouselControls;

  const horizontalDotSelectors: JSX.Element | null = (showSelectors) ?
      (<CarouselDotsSelector className={styles.horizontalDotSelectors} itemCount={items.length}
                             selectedIndex={currentIndex}
                             onSelect={(index) => {
                               selectItem(index);
                             }}/>)
      : null;

  const leftArrow: JSX.Element | null = (showNavArrows) ?
      <CarouselNavArrow
          className={styles.leftArrow}
          direction="left"
          onClick={() => {
            selectPreviousItem()
          }}
      /> : null;
  const rightArrow: JSX.Element | null = (showNavArrows) ?
      <CarouselNavArrow
          className={styles.rightArrow}
          direction="right"
          onClick={() => {
            selectNextItem()
          }}
      /> : null;

  const verticalNav: JSX.Element | null = (showNavArrows) ? (
      <div className={styles.verticalNav}>
        <CarouselNavArrow
            className={styles.upArrow}
            direction="up"
            onClick={() => {
              selectPreviousItem()
            }}
        />
        {(showSelectors) ? (
            <CarouselDotsSelector vertical={true} onSelect={index => {
              selectItem(index);
            }} itemCount={items.length} selectedIndex={currentIndex}/>
        ) : null
        }
        <CarouselNavArrow
            className={styles.downArrow}
            direction="down"
            onClick={() => {
              selectNextItem()
            }}
        />
      </div>
  ) : null;

  const completeItems: CarouselItem[] = items.map((briefItem, index) => {
    return {
      backgroundImg: briefItem.backgroundImg,
      overlayContent: (
          <>
            <div className={styles.content}>
              <div className={styles.staticContent}>
                {staticContent}
              </div>
              <div className={`${styles.dynamicContent} ${styles.brief}`}>
                <div className={styles.primaryDisplayBoxContent}>
                  {leftArrow}
                  <div className={styles.itemContent}>
                    {briefItem.overlayContent}
                  </div>
                  {rightArrow}
                </div>
                {horizontalDotSelectors}
              </div>
              <div className={`${styles.dynamicContent} ${styles.expanded}`}>
                {verticalNav}
                {expandedItems[index].overlayContent}
              </div>
            </div>
          </>
      )
    }
  })

  return (
      <CarouselFrame items={completeItems} carouselControls={carouselControls}/>
  )
}