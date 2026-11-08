import styles from "@/components/carousel/fragments/carouselframe.module.css";
import Image from "next/image";
import {CarouselItem} from "@/types/carousel-item";
import {CarouselControls} from "@/types/carousel-controls";

/**
 * A basic carousel frame with a background image and synced overlay content.
 *
 * @param items the items to display in the carousel
 * @param carouselControls the controls for the carousel
 */
export default function CarouselFrame(
    {
        items,
        carouselControls
    }: {
      items: CarouselItem[];
      carouselControls: CarouselControls;
    }
) {

  const {
    currentIndex,
    transitionOrigin,
    transitionDirection,
    transitionComplete
  } = carouselControls;

  return (
      <div className={styles.carousel}>
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
          items[currentIndex].overlayContent
        </div>
      </div>
  )
}