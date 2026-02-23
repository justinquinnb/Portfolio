import {CarouselItem} from "@/types/carousel-item";
import {JSX} from "react";
import styles from "./carousel.module.css";
import CarouselDotsSelector from "@/components/carousel/CarouselDotsSelector";
import ImageItemSelector from "@/components/carousel/ImageItemSelector";
import SelectorsType from "../../types/selectors-types";
import Image from "next/image";
import Link from "next/link";


/**
 * An image carousel.
 * @param items
 * @param select
 * @param staticContent
 * @param selectorsType
 * @param showNavigation
 * @param autoPlay
 * @param delay
 * @constructor
 */
export default function Carousel(
    {items, initialSelection = 0, staticContent, selectorsType = SelectorsType.Dots, showNavArrows = true,
      autoPlay = true, delay = 3}:
    {items: CarouselItem[]; initialSelection?: number; staticContent?: JSX.Element; selectorsType?: SelectorsType;
      showNavArrows?: boolean; autoPlay?: boolean; delay?: number})
{
  // Prep the correct dot selectors (if this instance calls for their display)
  const useDotSelectors = selectorsType == SelectorsType.Dots ||
      selectorsType == SelectorsType.Both;
  const verticalDotSelectors: JSX.Element | null = (useDotSelectors) ?
      <CarouselDotsSelector vertical={true} showNavArrows={showNavArrows}/> : null;
  const horizontalDotSelectors: JSX.Element | null = (useDotSelectors) ?
      <CarouselDotsSelector vertical={false} showNavArrows={showNavArrows}/> : null;

  const buttonSelectors: JSX.Element | null = (selectorsType == SelectorsType.Images ||
      selectorsType == SelectorsType.Both) ? <ImageItemSelector /> : null;

  let currentItem = items[initialSelection];
  const currentItemDisplayContent = (
      <>
        <p className={styles.itemDisplayTitle}>{currentItem.display.title}</p>
        <p className={styles.itemDisplayCaption}>{currentItem.display.caption}</p>
        {(currentItem.display.link != null) ?
          <Link href={currentItem.display.link.href} className={"display-text"}>
            {currentItem.display.link.title}
          </Link> : null
        }
      </>
  )

  return (
      <div className={styles.carousel}>
        <div className={styles.displayBox}>
          <Image src={currentItem.display.img.src} alt={currentItem.display.img.alt}/>
          <div className={styles.overlay}>
            <button className={styles.navButton}></button>
            <div className={styles.primaryContent}>
              <div className={styles.info}>
                <div className={styles.staticContent}>
                  {staticContent}
                </div>
                {verticalDotSelectors}
                <div className={styles.itemDisplayContent}>
                  {currentItemDisplayContent}
                </div>
              </div>
              {horizontalDotSelectors}
            </div>
          </div>
        </div>
        {buttonSelectors}
      </div>
  )
}
