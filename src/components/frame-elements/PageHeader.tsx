import styles from "./page-header.module.css";
import Image, {StaticImageData} from 'next/image';
import {ReactNode} from "react";
import ScrollingText from "@/components/ScrollingText";

/**
 * Page header
 * @constructor
 */
export default function PageHeader(
    {img, imgAlt, backgroundText, foregroundText, children, subtitle}:
    {img: StaticImageData; imgAlt: string; backgroundText: string; foregroundText: string;
      children?: ReactNode; subtitle?: string; className?: string}
) {
  const weightedTransitionTime = weighTransitionTime(foregroundText,
      "\n", 0.2, 0.1);

  return (
      <header className={styles.header}>
        <div className={styles.primary}>
          <div className={styles.heroContainer}>
            <Image src={img} alt={imgAlt}/>
          </div>
          <ScrollingText text={backgroundText} xsScrollTimeSec={60} containerClassName={styles.repeatedTextContainer} textClassName={styles.repeatedText}/>
          <div className={styles.headerContent}>
            <h1 style={{animation: `${styles['rise-up']} ${weightedTransitionTime}s ease-out`}}>
              {foregroundText}
            </h1>
            <div className={styles.extras}>
              {children}
            </div>
          </div>
        </div>
        <div className={styles.subtitle}>
          <p className={`display-text`}>{subtitle}</p>
        </div>
      </header>
  );
}

/**
 * Weighs the transition time of text given its number of lines, the minimum transition time,
 * and the amount of time to add per additional line of text.
 *
 * @param text the text to weigh
 * @param lineBreak the line break character
 * @param minTime the minimum transition time
 * @param scaleFactor the amount to add to the transition time per additional line of text
 */
function weighTransitionTime(text: string, lineBreak: string, minTime: number,
                             scaleFactor: number): number {
  const numLines = text.split(lineBreak).length;
  return ((numLines - 1) * scaleFactor) + minTime;
}
