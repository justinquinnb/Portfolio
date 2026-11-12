import {CarouselItem} from "./fragments/carousel-item";
import {JSX} from "react";
import styles from "./splitpanecarousel.module.css";
import CarouselDotsSelector from "./fragments/CarouselDotsSelector";
import CarouselNavArrow from "./fragments/CarouselNavArrow";
import {CarouselControls} from "./fragments/carousel-controls";
import CarouselFrame from "@/components/carousel/fragments/CarouselFrame";

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
export default function SplitPaneCarousel(
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

  const completeItems: CarouselItem[] = items.map(base => {
    return {
      backgroundImg: base.backgroundImg,
      overlayContent: (
          <div className={styles.content}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              {verticalNav}
              {items[currentIndex].overlayContent}
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
