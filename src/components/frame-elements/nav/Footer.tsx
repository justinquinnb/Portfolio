import Link from "next/link";
import styles from './footer.module.css';
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
      <footer className={`${styles.footer}`}>
        <div className={styles.centerIsland}>
          <div className={`${styles.info}`}>
            <div className={styles.nav}>
              <div>
                <h6>Me</h6>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about/bio">Biography</Link></li>
                  <li><Link href="/about/resume">Resume</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h6>Work</h6>
                <ul>
                  <li><Link href="/my-work/software">Software</Link></li>
                  <li><Link href="/my-work/graphics">Graphics</Link></li>
                  <li><Link href="/my-work/photos">Photos</Link></li>
                  <li><Link href="/my-work/music">Music</Link></li>
                </ul>
              </div>
            </div>
            <p>Copyright &copy; 2026 Justin Quinn</p>
          </div>
          <div className={`${styles.branding}`}>
            <Image src={"/branding/jq-icon-light.svg"} alt={"Justin Quinn logo"} width={75}
                   height={75}/>
            <p className={`${styles.slogan}`}>Creating with <br /><span
                className={`emphasis`}>Purpose</span>.</p>
          </div>
        </div>
      </footer>
  );
}