import type {Metadata} from "next";
import Link from "next/link";
import styles from "./error.module.css";

export const metadata: Metadata = {
  title: 'Page Not Found | JQB Portfolio'
}

export default function NotFound() {
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.notice}>
            <h3>ERR <span className={"emphasis"}>404</span></h3>
            <h4>The page you were looking for could not be found.</h4>
          </div>
          <div className={styles.message}>
            <p className="display-text">If you think this is a mistake, please let me know <Link
                href="/contact" title="Contact Form">here</Link>.<br /><br />Otherwise, return home below.</p>
            <Link className={`link-button ${styles.actions}`} href="/">Return Home</Link>
          </div>
        </div>
      </div>
  );
}