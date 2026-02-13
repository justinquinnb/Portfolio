'use client'

import type {Metadata} from "next";
import Link from "next/link";
import styles from "./error.module.css";
import {useEffect} from "react";

export const metadata: Metadata = {
  title: 'Unknown Error | JQB Portfolio'
}

export default function Error({error, reset,}: {
  error: Error & { digest?: string },
  reset: () => void
}){
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.notice}>
            <h3>UNKNOWN <span className={"emphasis"}>ERROR</span></h3>
            <h4>An unknown problem has occurred.</h4>
          </div>
          <div className={styles.message}>
            <p className="display-text">If you think this is a mistake, please let me know <Link
                href="/contact" title="Contact Form">here</Link>.<br /><br />Otherwise, you may try again or return home below.</p>
            <div className={styles.actions}>
              <button onClick={() => reset()}>Try Again</button>
              <Link className={`link-button ${styles.homeButton}`} href="/">Return Home</Link>
            </div>
          </div>
        </div>
      </div>
  );
}