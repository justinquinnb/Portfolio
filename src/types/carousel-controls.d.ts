
/**
 * Controls for a carousel component
 */
export type CarouselControls = {
  /**
   * The index of the currently selected item
   */
  currentIndex: number,

  /**
   * Selects the next item in the carousel
   */
  selectNextItem: () => void,

  /**
   * Selects the previous item in the carousel
   */
  selectPreviousItem: () => void,

  /**
   * Selects the item at the given index
   */
  selectItem: (index: number) => void,

  /**
   * The index of the item the most ongoing transition originated from
   */
  transitionOrigin: null | number,

  /**
   * The direction of the most ongoing transition
   */
  transitionDirection: "forward" | "backward",

  /**
   * A hook to invoke when the transition to the next item completes
   */
  transitionComplete: () => void,

  /**
   * Whether the carousel is currently playing
   */
  isPlaying: boolean,

  /**
   * Toggle's the carousel's autoplay
   */
  setIsPlaying: (isPlaying: boolean) => void
}