'use client'

import {CarouselItem} from "@/types/carousel-item";
import {JSX, useCallback, useEffect, useRef, useState} from "react";
import styles from "./singlepanecarousel.module.css";
import CarouselDotsSelector from "./fragments/CarouselDotsSelector";
import Image from "next/image";
import CarouselNavArrow from "./fragments/CarouselNavArrow";
import Link from "next/link";

/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param initialSelection the index of the item to initially display
 * @param staticContent the static content to display adjacent to the cycling items
 * @param showSelectors whether to display the dot selectors
 * @param showNavArrows whether to display the navigation arrows
 * @param autoPlay whether to automatically cycle through the items
 * @param delay the delay between each item change, in milliseconds
 * @param className any classes to apply to the component
 * @constructor
 */
export default function SinglePaneCarousel(
    {
      items, initialSelection = 0, staticContent, showSelectors = true, showNavArrows = true,
      autoPlay = true, delay = 4000, className = ""
    }:
    {
      items: CarouselItem[];
      initialSelection?: number;
      staticContent?: JSX.Element;
      showSelectors?: boolean;
      showNavArrows?: boolean;
      autoPlay?: boolean;
      delay?: number;
      className?: string;
    }) {

  const [currentItemNum, setSelectedItemNum] = useState(initialSelection);
  const [previousItemNum, setPreviousItemNum] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");
  const currentItem = items[currentItemNum];
  const previousItem = previousItemNum === null ? null : items[previousItemNum];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectItem = useCallback((nextItemNum: number, direction: "forward" | "backward") => {
    if (nextItemNum === currentItemNum) {
      return;
    }

    setPreviousItemNum(currentItemNum);
    setSlideDirection(direction);
    setSelectedItemNum(nextItemNum);
  }, [currentItemNum]);

  const selectNextItem = useCallback(() => {
    selectItem((currentItemNum + 1) % items.length, "forward");
  }, [currentItemNum, items.length, selectItem]);

  const selectPreviousItem = useCallback(() => {
    selectItem((currentItemNum - 1 + items.length) % items.length, "backward");
  }, [currentItemNum, items.length, selectItem]);

  const selectItemByIndex = useCallback((index: number) => {
    selectItem(index, index > currentItemNum ? "forward" : "backward");
  }, [currentItemNum, selectItem]);

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
      setSelectedItemNum((prevSelection) => {
        setPreviousItemNum(prevSelection);
        setSlideDirection("forward");
        return (prevSelection + 1) % items.length;
      });
    }, delay);
  }, [autoPlay, clearAutoPlayTimer, delay, items.length]);

  const resetAutoPlayTimer = useCallback(() => {
    startAutoPlayTimer();
  }, [startAutoPlayTimer]);

  useEffect(() => {
    startAutoPlayTimer();

    return clearAutoPlayTimer;
  }, [startAutoPlayTimer, clearAutoPlayTimer]);

  const horizontalDotSelectors: JSX.Element | null = (showSelectors) ?
      (<CarouselDotsSelector className={styles.horizontalDotSelectors} itemCount={items.length}
                             selectedIndex={currentItemNum}
                             onSelect={(index) => {
                               selectItemByIndex(index);
                               resetAutoPlayTimer();
                             }}/>)
      : null;

  const leftArrow: JSX.Element | null = (showNavArrows) ?
      <CarouselNavArrow
          className={styles.leftArrow}
          direction="left"
          onClick={() => {
            selectPreviousItem();
            resetAutoPlayTimer();
          }}
      /> : null;
  const rightArrow: JSX.Element | null = (showNavArrows) ?
      <CarouselNavArrow
          className={styles.rightArrow}
          direction="right"
          onClick={() => {
            selectNextItem();
            resetAutoPlayTimer();
          }}
      /> : null;

  return (
      <div className={`${styles.carousel} ${className}`}>
        <div className={styles.imageTrack}>
          {previousItem ? (
              <Image
                  key={`previous-${previousItemNum}`}
                  src={previousItem.backgroundImg.src}
                  alt={previousItem.backgroundImg.alt}
                  className={`${styles.displayImage} ${
                      slideDirection === "forward" ? styles.slideOutForward : styles.slideOutBackward
                  }`}
              />
          ) : null}
          <Image
              key={`current-${currentItemNum}`}
              src={currentItem.backgroundImg.src}
              alt={currentItem.backgroundImg.alt}
              className={`${styles.displayImage} ${
                  previousItem
                      ? slideDirection === "forward"
                          ? styles.slideInForward
                          : styles.slideInBackward
                      : ""
              }`}
              onAnimationEnd={() => setPreviousItemNum(null)}
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
                {currentItem.overlayContent}
                {rightArrow}
              </div>
              {horizontalDotSelectors}
            </div>
          </div>
        </div>
      </div>
  )
}
