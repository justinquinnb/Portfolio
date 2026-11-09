"use client"

import {CarouselItem} from "@/components/carousel/fragments/carousel-item";
import {JSX} from "react";
import styles from "./listcarousel.module.css";
import {CarouselControls} from "@/components/carousel/fragments/carousel-controls";
import CarouselFrame from "@/components/carousel/fragments/CarouselFrame";
import {useCarousel} from "@/components/carousel/fragments/useCarousel";

export type ListCarouselItem = CarouselItem & {
  title: string;
  link: {
    href: string;
    title: string;
  }
}

/**
 * A carousel of images with per-image content adjacent to static content.
 * @param items the items to display in the carousel
 * @param staticContent the static content to display adjacent to the cycling items
 * @param showSelectors whether to display the dot selectors
 * @param carouselControls the controls for the carousel
 * @param className any classes to apply to the component
 * @constructor
 */
export default function ListCarousel(
    {
      items,
      staticContent,
      carouselControls,
      className = ""
    }:
    {
      items: ListCarouselItem[];
      staticContent?: JSX.Element;
      carouselControls: CarouselControls;
      className?: string;
    }) {

  const listItems: JSX.Element[] = items.map((item, index) => {
    return (
    <li key={index}><button className={`invisible ${carouselControls.currentIndex == index ? styles.active : ""}`} onClick={() => carouselControls.selectItem(index)}>{item.title}</button></li>
  )})

  const completeItems: CarouselItem[] = items.map(base => {
    return {
      backgroundImg: base.backgroundImg,
      overlayContent: (
          <div className={styles.content}>
            <div className={styles.staticContent}>
              {staticContent}
            </div>
            <div className={styles.dynamicContent}>
              <ul>
                {listItems}
              </ul>
              <div className={styles.primaryContent}>
                {base.overlayContent}
              </div>
            </div>
          </div>
      )
    }
  })

  return <CarouselFrame items={completeItems} carouselControls={carouselControls}
                        className={className} imageFilterClassName={styles.bgImageFilter}/>
}