'use client'

import {CarouselItem} from "@/types/carousel-item";
import {JSX} from "react";
import styles from "./carousel.module.css";
import CarouselDotsSelector from "@/components/carousel/CarouselDotsSelector";
import ImageItemSelector from "@/components/carousel/ImageItemSelector";
import {SelectorsType} from "../../types/selectors-type";
import Image from "next/image";
import {useRouter} from "next/navigation";


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
  const router = useRouter();

  // TODO add "extra static content" field that only renders when the component is large
  // this would contain the static caption text, for example, from the Figma

  // TODO add the dot selector and auto-play functionalities

  // Prep the correct dot selectors (if this instance calls for their display)
  const useDotSelectors = selectorsType == SelectorsType.Dots ||
      selectorsType == SelectorsType.Both;
  const verticalNav: JSX.Element | null = (useDotSelectors) ? (
      <>
        <p>Up</p>
        <CarouselDotsSelector vertical={true} showNavArrows={showNavArrows}/>
        <p>Down</p>
      </>
  ) : null;
  const horizontalDotSelectors: JSX.Element | null = (useDotSelectors) ?
      <CarouselDotsSelector vertical={false} showNavArrows={showNavArrows}/> : null;
  const leftArrow: JSX.Element | null = (useDotSelectors) ? <p>LEFT</p> : null;
  const rightArrow: JSX.Element | null = (useDotSelectors) ? <p>RIGHT</p> : null;

  const buttonSelectors: JSX.Element | null = (selectorsType == SelectorsType.Images ||
      selectorsType == SelectorsType.Both) ? <ImageItemSelector /> : null;

  let currentItem = items[initialSelection];
  
  const currentItemContent = (
      (currentItem.display.link) ? (
          <button onClick={() => {
            const href = currentItem.display.link?.href;

            if (href) {
              router.push(href);
            }
          }} className={`invisible ${styles.itemContent}`}>
            <div className={styles.primaryItemContent}>
              <p className={`feature-text ${styles.itemTitle}`}>{currentItem.display.title}</p>
              {(currentItem.display.caption) ? <p className={styles.itemCaption}>{currentItem.display.caption}</p> : null}
            </div>
            <p className={"display-text"} style={{textDecoration: "underline"}}>
              {currentItem.display.link.title}
            </p>
          </button>
          ) :
          (
        <div className={styles.itemContent}>
          <p className={`feature-text ${styles.itemTitle}`}>{currentItem.display.title}</p>
          {(currentItem.display.caption) ? <p className={styles.itemCaption}>{currentItem.display.caption}</p> : null}
        </div>
          )
)

  return (
      <div className={styles.carousel}>
        <div className={styles.displayBox}>
          <Image src={currentItem.display.img.src} alt={currentItem.display.img.alt} className={styles.displayImage} />
          <div className={styles.overlay}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              <div className={styles.primaryDisplayBoxContent}>
                <div className={styles.verticalNav}>
                  {verticalNav}
                </div>
                <div className={styles.leftArrow}>
                  {leftArrow}
                </div>
                {currentItemContent}
                <div className={styles.rightArrow}>
                  {rightArrow}
                </div>
              </div>
              <div className={styles.horizontalDotSelectors}>
                {horizontalDotSelectors}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonSelectors}>
          {buttonSelectors}
        </div>
      </div>
  )
}
