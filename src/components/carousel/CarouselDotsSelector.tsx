import styles from "./carousel.module.css";
import {CSSProperties, ReactElement} from "react";

/**
 * Dot-style item selectors/navigation for a carousel or list of items.
 *
 * @param className the class name to apply to the component
 * @param vertical whether to display the dots vertically
 * @param itemCount the number of items in the carousel
 * @param selectedIndex the index of the currently selected item
 * @param onSelect the function to call when an item is selected
 * @constructor
 */
export default function CarouselDotsSelector({
                                               className,
                                               vertical = false,
                                               itemCount,
                                               selectedIndex,
                                               onSelect
                                             }:
                                             {
                                               className?: string;
                                               vertical?: boolean;
                                               itemCount: number;
                                               selectedIndex: number,
                                               onSelect?: (index: number) => void
                                             }) {
  const flexDirectionValue: "column" | "row" = vertical ? "column" : "row";
  const directionStyles: CSSProperties = {flexDirection: flexDirectionValue}
  let items: ReactElement[] = new Array(itemCount);

  if (onSelect) {
    const selectFuncs = new Array(itemCount);
    for (let i = 0; i < itemCount; i++) {
      selectFuncs[i] = () => onSelect(i);
    }

    items = selectFuncs.map((selectFunc, i) => {
      const selectionClass = i === selectedIndex ? styles.dotSelected : "";
      return (
          <button key={i} onClick={selectFunc}>
            <svg className={`${styles.selectorDot} ${selectionClass}`} viewBox="0 0 100 100"
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40"/>
            </svg>
          </button>
      )
    })
  } else {
    items = Array.from({length: itemCount}).map((_, i) => {
      const selectionClass = i === selectedIndex ? styles.dotSelected : "";
      return (
          <svg key={i} className={`${styles.selectorDot} ${selectionClass}`} viewBox="0 0 100 100"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40"/>
          </svg>
      )
    })
  }

  return (
      <div className={`${styles.carouselDotsSelector} ${className}`} style={directionStyles}>
        {items}
      </div>
  )
}
