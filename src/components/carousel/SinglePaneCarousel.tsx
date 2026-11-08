import {CarouselItem} from "@/types/carousel-item";
import {JSX} from "react";
import styles from "./singlepanecarousel.module.css";
import CarouselDotsSelector from "./fragments/CarouselDotsSelector";
import Image from "next/image";
import CarouselNavArrow from "./fragments/CarouselNavArrow";
import {CarouselControls} from "@/types/carousel-controls";

/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param staticContent the static content to display adjacent to the cycling items
 * @param showSelectors whether to display the dot selectors
 * @param showNavArrows whether to display the navigation arrows
 * @param carouselControls the controls for the carousel
 * @param className any classes to apply to the component
 * @constructor
 */
export default function SinglePaneCarousel(
    {
      items, staticContent, showSelectors = true, showNavArrows = true, carouselControls, className = ""
    }:
    {
      items: CarouselItem[];
      staticContent?: JSX.Element;
      showSelectors?: boolean;
      showNavArrows?: boolean;
      carouselControls: CarouselControls;
      className?: string;
    }) {

  const {
    currentIndex,
    selectNextItem,
    selectPreviousItem,
    selectItem,
    transitionOrigin,
    transitionDirection,
    transitionComplete
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

  return (
      <div className={`${styles.carousel} ${className}`}>
        <div className={styles.imageTrack}>
          {transitionOrigin != null ? (
              <Image
                  key={`previous-${transitionOrigin}`}
                  src={items[transitionOrigin].backgroundImg.src}
                  alt={items[transitionOrigin].backgroundImg.alt}
                  className={`${styles.displayImage} ${
                      transitionDirection === "forward" ? styles.slideOutForward : styles.slideOutBackward
                  }`}
              />
          ) : null}
          <Image
              key={`current-${currentIndex}`}
              src={items[currentIndex].backgroundImg.src}
              alt={items[currentIndex].backgroundImg.alt}
              className={`${styles.displayImage} ${
                  items[currentIndex]
                      ? transitionDirection === "forward"
                          ? styles.slideInForward
                          : styles.slideInBackward
                      : ""
              }`}
              onAnimationEnd={transitionComplete}
          />
        </div>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              <div className={styles.primaryDisplayBoxContent}>
                {leftArrow}
                {items[currentIndex].overlayContent}
                {rightArrow}
              </div>
              {horizontalDotSelectors}
            </div>
          </div>
        </div>
      </div>
  )
}
