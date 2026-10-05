'use client'

import {CarouselItem} from "@/types/carousel-item";
import {JSX, useCallback, useEffect, useRef, useState} from "react";
import styles from "./carousel.module.css";
import CarouselDotsSelector from "@/components/carousel/CarouselDotsSelector";
import ImageItemSelector from "@/components/carousel/ImageItemSelector";
import Image from "next/image";
import {useRouter} from "next/navigation";
import CarouselNavArrow from "@/components/carousel/CarouselNavArrow";


/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param initialSelection the index of the item to initially display
 * @param staticContent the static content to display adjacent to the cycling items
 * @param selectorsType the type of item selectors to display, if any
 * @param showNavArrows whether to display the navigation arrows
 * @param autoPlay whether to automatically cycle through the items
 * @param delay the delay between each item change, in milliseconds
 * @constructor
 */
export default function Carousel(
    {
      items, initialSelection = 0, staticContent, selectorsType = "dots", showNavArrows = true,
      autoPlay = true, delay = 4000
    }:
    {
      items: CarouselItem[];
      initialSelection?: number;
      staticContent?: JSX.Element;
      selectorsType?: "dots" | "images" | "both" | "none";
      showNavArrows?: boolean;
      autoPlay?: boolean;
      delay?: number
    }) {
  const router = useRouter();

  const [currentItemNum, setSelectedItemNum] = useState(initialSelection);
  const currentItem = items[currentItemNum];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoPlayTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoPlayTimer = useCallback(() => {
    clearAutoPlayTimer();

    if (!autoPlay || items.length <= 1) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSelectedItemNum((prevSelection) => (prevSelection + 1) % items.length);
    }, delay);
  }, [autoPlay, clearAutoPlayTimer, delay, items.length]);

  const resetAutoPlayTimer = useCallback(() => {
    startAutoPlayTimer();
  }, [startAutoPlayTimer]);

  useEffect(() => {
    startAutoPlayTimer();

    return clearAutoPlayTimer;
  }, [startAutoPlayTimer, clearAutoPlayTimer]);

  // TODO add "expanded static content" field that only renders when the component is large
  // this would contain the static caption text, for example, from the Figma

  // TODO finish dot selectors and carousel styling for vertical (large), including max width constraints
  // TODO add item change transitions
  // TODO change item text and links to generic categories on small screens (or just conditionally render different component instances)

  // Prep the correct dot selectors (if this instance calls for their display)
  const showDotSelectors = selectorsType === "dots" || selectorsType === "both";

  const verticalNav: JSX.Element | null = (showDotSelectors) ? (
      <>
        <CarouselNavArrow
            className={styles.upArrow}
            direction="up"
            onClick={() => {
              setSelectedItemNum((prevSelection) => (prevSelection - 1 + items.length) % items.length);
              resetAutoPlayTimer();
            }}
        />
        <CarouselDotsSelector vertical={true} onSelect={(index) => {
          setSelectedItemNum(index);
          resetAutoPlayTimer();
        }} itemCount={items.length} selectedIndex={currentItemNum}/>
        <CarouselNavArrow
            className={styles.downArrow}
            direction="down"
            onClick={() => {
              setSelectedItemNum((prevSelection) => (prevSelection - 1 + items.length) % items.length);
              resetAutoPlayTimer();
            }}
        />
      </>
  ) : null;
  const horizontalDotSelectors: JSX.Element | null = (showDotSelectors) ?
      (<CarouselDotsSelector className={styles.horizontalDotSelectors} itemCount={items.length}
                             selectedIndex={currentItemNum}/>)
      : null;

  const leftArrow: JSX.Element | null = (showNavArrows) ?
      <CarouselNavArrow
          className={styles.leftArrow}
          direction="left"
          onClick={() => {
            setSelectedItemNum((prevSelection) => (prevSelection - 1 + items.length) % items.length);
            resetAutoPlayTimer();
          }}
      /> : null;
  const rightArrow: JSX.Element | null = (showNavArrows) ?
      <CarouselNavArrow
          className={styles.rightArrow}
          direction="right"
          onClick={() => {
            setSelectedItemNum((prevSelection) => ((prevSelection + 1) % items.length))
            resetAutoPlayTimer();
          }}
      /> : null;

  const buttonSelectors: JSX.Element | null = (selectorsType === "images" ||
      selectorsType === "both") ? <ImageItemSelector className={styles.buttonSelectors}/> : null;

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
                  {(currentItem.display.caption) ?
                      <p className={styles.itemCaption}>{currentItem.display.caption}</p> : null}
                </div>
                <p className={`${styles.itemLink}`} style={{textDecoration: "underline"}}>
                  {currentItem.display.link.title}
                </p>
                <a className={`${styles.itemLink}`} href={currentItem.display.link.href}>
                  {currentItem.display.link.title}
                </a>
              </button>
          ) :
          (
              <div className={styles.itemContent}>
                <p className={`feature-text ${styles.itemTitle}`}>{currentItem.display.title}</p>
                {(currentItem.display.caption) ?
                    <p className={styles.itemCaption}>{currentItem.display.caption}</p> : null}
              </div>
          )
  )

  return (
      <div className={styles.carousel}>
        <div className={styles.displayBox}>
          <Image src={currentItem.display.img.src} alt={currentItem.display.img.alt}
                 className={styles.displayImage}/>
          <div className={styles.overlay}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              <div className={styles.primaryDisplayBoxContent}>
                <div className={styles.verticalNav}>
                  {verticalNav}
                </div>
                {leftArrow}
                {currentItemContent}
                {rightArrow}
              </div>
              {horizontalDotSelectors}
            </div>
          </div>
        </div>
        {buttonSelectors}
      </div>
  )
}
