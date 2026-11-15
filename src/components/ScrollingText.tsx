"use client";

import styles from "@/components/scrollingtext.module.css";
import {JSX, useEffect, useMemo, useState} from "react";
import {CSSProperties} from "react";

export default function ScrollingText(
    {text, xsScrollTimeSec, containerClassName = "", textClassName = ""}:
    {
      text: string;
      xsScrollTimeSec: number;
      containerClassName?: string;
      textClassName?: string;
    }
) {
  const [scaledScrollTimeSec, setScaledScrollTimeSec] = useState(xsScrollTimeSec);

  useEffect(() => {
    const handleResize = () => {
      const newScrollTimeSec = xsScrollTimeSec * (window.innerWidth / 250);
      setScaledScrollTimeSec(newScrollTimeSec);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [xsScrollTimeSec])

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

  return (
      <div className={`${styles.scrollingTextContainer} ${containerClassName}`} style={{'--scroll-text-duration': `${scaledScrollTimeSec}s`} as CSSProperties}>
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
