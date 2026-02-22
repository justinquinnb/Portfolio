import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import Image from "next/image";
import React from "react";
import darkIcon from "@public/branding/jq-icon-dark.svg";
import heroImage from "@public/images/heroes/leader.png";
import styles from "./homepage.module.css";
import meImage from "@public/images/me.png";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Home | JQB Portfolio'
}

export default function Home() {
  const logo = <Image src={darkIcon} alt={"Justin Quinn logo"} />;

  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin and team leading a DevDogs club meeting in a full auditorium"}
                    backgroundText={"Justin Quinn"} foregroundText={"Hey,\nI'm Justin"}
                    subtitle={"A creator, leader, and innovator in Metro ATL"}
        >
          {logo}
        </PageHeader>
        <main>
          <section className={styles.intro}>
            <div className={styles.introDecor}>
              <Image src={meImage} alt={"A stylized photo of Justin"}/>
              <div className={styles.introDecorText}>
                <h2>I seek <span className={"emphasis"}>impact</span>...</h2>
                <Link className={"link-button"} href={"/about/bio"}>More About Me</Link>
              </div>
            </div>
            <p className={"display-text"}>I’m a full-stack developer by day and a full-on creative
              by night. From an early
              age, I’ve had one main goal: to innovate and inspire in all that I do.</p>
          </section>
        </main>
      </>
  );
}
