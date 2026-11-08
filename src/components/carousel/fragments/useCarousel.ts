import {useCallback, useEffect, useState} from "react";
import {CarouselControls} from "@/types/carousel-controls";

/**
 * ALl the state and logic for a carousel component
 * @param startAtIndex the index of the carousel item to begin at
 * @param itemCount the number of items in the carousel
 * @param play whether to automatically cycle through the items
 * @param delayMs the delay between each item change, in milliseconds
 * @param onChange a callback function to invoke when the carousel's index changes
 * 
 * @returns {@link CarouselControls}
 */
export function useCarousel(
    startAtIndex: number = 0,
    itemCount: number,
    play: boolean = true,
    delayMs: number = 4000,
    onChange: (from: number, to: number) => void = () => {}
): CarouselControls {
  const [currentIndex, setCurrentIndex] = useState(startAtIndex);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward">("forward");
  const [transitionOrigin, setTransitionOrigin] = useState<null | number>(null);
  const [isPlaying, setIsPlaying] = useState(play);
  
  const selectItem = useCallback((index: number) => {
    console.log("Transition initiated");
    const from = currentIndex;
    setTransitionOrigin(from);

    // Determine the actual target index
    let to = index;
    if (index >= itemCount) {
      to = index % itemCount;
    } else if (index < 0) {
      to = (index + itemCount) % itemCount;
    }

    // Determine the direction of transition based on the hypothetical index change
    let direction = "unknown";
    if (from > index) {
      direction = "backward";
      setTransitionDirection("backward");
    } else {
      direction = "forward";
      setTransitionDirection("forward");
    }

    console.log(`Transitioning ${direction} from ${from} to ${to}`);
    setCurrentIndex(to);
    onChange(from, to);
  }, [currentIndex, itemCount, onChange]);

  const selectNextItem = useCallback(() => {
    selectItem(currentIndex + 1);
  }, [currentIndex, selectItem]);

  const selectPreviousItem = useCallback(() => {
    selectItem(currentIndex - 1);
  }, [currentIndex, selectItem]);

  const transitionComplete = useCallback(() => {
    setTransitionOrigin(null);
    console.log("Transition complete");
  }, []);

  useEffect(() => {
    if (!isPlaying || itemCount <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      selectNextItem();
    }, delayMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlaying, itemCount, delayMs, selectNextItem]);

  return {
    currentIndex,
    selectNextItem,
    selectPreviousItem,
    selectItem,
    transitionOrigin,
    transitionDirection,
    transitionComplete,
    isPlaying,
    setIsPlaying
  }
}