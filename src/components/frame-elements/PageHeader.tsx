import styles from "./page-header.module.css";
import Image from 'next/image';
import {JSX, ReactNode} from "react";

/**
 * Page header
 * @constructor
 */
export default function PageHeader(
    {imgSrc, imgAlt, backgroundText, foregroundText, children, subtitle, className}:
    {imgSrc: string; imgAlt: string; backgroundText: string; foregroundText: string;
      children?: ReactNode; subtitle?: string; className?: string}
) {
  const repeatedText = repeatText(backgroundText, 4000);
  const weightedTransitionTime = weighTransitionTime(foregroundText,
      "\n", 0.2, 0.1);

  return (
      <header className={styles.header}>
        <div className={styles.primary}>
          <div className={styles.heroContainer}>
            <Image src={imgSrc} alt={imgAlt} width={1600} height={900}/>
          </div>
          <div className={styles.repeatedTextContainer}>
            <p aria-hidden="true" className={styles.repeatedText}>{repeatedText}</p>
            <p aria-hidden="true" className={styles.repeatedText}>{repeatedText}</p>
          </div>
          <div className={styles.headerContent}>
            <h1 style={{transition: `transform ${weightedTransitionTime}s ease-in-out`}}>
              {foregroundText}
            </h1>
            <div className={styles.extras}>
              {children}
            </div>
          </div>
        </div>
        <p className={styles.subtitle}>Subtitle</p>
      </header>
  );
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
 * Weighs the transition time of text given its number of lines, the minimum transition time,
 * and the amount of time to add per additional line of text.
 *
 * @param text the text to weigh
 * @param lineBreak the line break character
 * @param minTime the minimum transition time
 * @param scaleFactor the amount to add to the transition time per additional line of text
 */
function weighTransitionTime(text: string, lineBreak: string, minTime: number,
                             scaleFactor: number): number
{
  const numLines = text.split(lineBreak).length;
  return ((numLines - 1) * scaleFactor) + minTime;
}
