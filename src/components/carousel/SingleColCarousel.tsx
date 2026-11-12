import {CarouselItem} from "./fragments/carousel-item";
import {JSX} from "react";
import styles from "./singlecolcarousel.module.css";
import CarouselDotsSelector from "./fragments/CarouselDotsSelector";
import CarouselNavArrow from "./fragments/CarouselNavArrow";
import {CarouselControls} from "./fragments/carousel-controls";
import CarouselFrame from "@/components/carousel/fragments/CarouselFrame";

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
export default function SingleColCarousel(
    {
      items,
      staticContent,
      showSelectors = true,
      showNavArrows = true,
      carouselControls,
      className = ""
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

  const completeItems: CarouselItem[] = items.map(base => {
    return {
      backgroundImg: base.backgroundImg,
      overlayContent: (
          <div className={styles.content}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              <div className={styles.primaryDisplayBoxContent}>
                {leftArrow}
                <div className={styles.itemContent}>
                  {base.overlayContent}
                </div>
                {rightArrow}
              </div>
              {horizontalDotSelectors}
            </div>
          </div>
      )
    }
  })

  return (
      <CarouselFrame items={completeItems} carouselControls={carouselControls}
                     className={className} imageFilterClassName={styles.bgImageFilter}/>
  )
}
