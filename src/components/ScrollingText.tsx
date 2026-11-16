"use client";

import styles from "@/components/scrollingtext.module.css";
import {CSSProperties, JSX, useEffect, useMemo, useState} from "react";

export type ScrollTimeBound = {
  sec: number,
  px: number
};

export default function ScrollingText(
    {text, lowerTimeBound = {sec: 60, px: 251}, upperTimeBound = {sec: 150, px: 481}, containerClassName = "", textClassName = ""}:
    {
      text: string;
      lowerTimeBound?: ScrollTimeBound;
      upperTimeBound?: ScrollTimeBound;
      containerClassName?: string;
      textClassName?: string;
    }
) {
  const [scaledScrollTimeSec, setScaledScrollTimeSec] = useState<number | null>(null);

  useEffect(() => {
    const updateScrollTime = () => {
      const newScrollTimeSec = computeScrollTime(window.innerWidth, lowerTimeBound, upperTimeBound);
      setScaledScrollTimeSec(newScrollTimeSec);
    }

    updateScrollTime();

    window.addEventListener("resize", updateScrollTime);
    return () => {
      window.removeEventListener("resize", updateScrollTime);
    }
  }, [lowerTimeBound, upperTimeBound])

  const textTracks = useMemo<JSX.Element[]>(() => {
    const repeatedText = repeatText(text, 3000);
    const wipTextTracks = [];

    for (let i = 0; i < 20; i++) {
      // Because there are far fewer lines than characters, not gonna use modulo because the offset will always be valid
      const offsetText = repeatedText.slice(3 * i) + repeatedText.slice(0, 3 * i);
      wipTextTracks.push(
          <div key={i} className={`${styles.textTrack}`}>
            <p aria-hidden="true" className={textClassName}>{offsetText}</p>
            <p aria-hidden="true" className={textClassName}>{offsetText}</p>
          </div>
      )
    }

    return wipTextTracks;
  }, [text, textClassName]);

  const isScrollDurationReady = scaledScrollTimeSec !== null;

  return (
      <div className={`${styles.scrollingTextContainer} ${containerClassName}`}
           style={{
             '--scroll-text-duration': `${isScrollDurationReady ? scaledScrollTimeSec : 0}s`,
             opacity: isScrollDurationReady ? 1 : 0
           } as CSSProperties}>
        {textTracks}
      </div>
  )
}

/**
 * Repeats the given text as many times as necessary to reach the target character count.
 * @param text the text to repeat
 * @param targetCharCount the target number of characters in the output string
 */
function repeatText(text: string, targetCharCount: number): string {
  const repetitionCount = Math.ceil(targetCharCount / text.length);
  return (text + " ").repeat(repetitionCount);
}

/**
 * Computes the scroll time for a given viewport width, given a lower and upper bound.
 * @param viewportWidth the width of the viewport, in pixels
 * @param lowerBound the lower bound of the scroll time, in seconds and pixels
 * @param upperBound the upper bound of the scroll time, in seconds and pixels
 */
function computeScrollTime(viewportWidth: number, lowerBound: ScrollTimeBound, upperBound: ScrollTimeBound): number {
  if (viewportWidth < lowerBound.px) {
    return lowerBound.sec;
  } else if (upperBound.px <= viewportWidth) {
    return upperBound.sec;
  } else {
    const secPerPx = (upperBound.sec - lowerBound.sec) / (upperBound.px - lowerBound.px);
    return lowerBound.sec + (secPerPx * (viewportWidth - lowerBound.px));
  }
}
