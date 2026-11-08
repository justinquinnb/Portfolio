import {CarouselItem} from "@/types/carousel-item";
import {JSX} from "react";
import styles from "./dualpanecarousel.module.css";
import CarouselDotsSelector from "./fragments/CarouselDotsSelector";
import Image from "next/image";
import CarouselNavArrow from "./fragments/CarouselNavArrow";
import {CarouselControls} from "@/types/carousel-controls";


/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param initialSelection the index of the item to initially display
 * @param staticContent the static content to display adjacent to the cycling items
 * @param showSelectors whether to show the dot selectors
 * @param showNavArrows whether to display the navigation arrows
 * @param carouselControls the controls for the carousel
 * @param className any classes to apply to the component
 * @constructor
 */
export default function DualPaneCarousel(
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
                  transitionOrigin != null
                      ? transitionDirection === "forward"
                          ? styles.slideInForward
                          : styles.slideInBackward
                      : ""
              }`}
              onAnimationEnd={() => transitionComplete()}
          />
        </div>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              {verticalNav}
              {items[currentIndex].overlayContent}
            </div>
          </div>
        </div>
      </div>
  )
}
