import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/bio.png";
import React from "react";
import styles from "@/app/about/bio/biopage.module.css";
import Image from "next/image";
import meImage from "@public/images/me.png";

export const metadata: Metadata = {
  title: 'Bio | JQB Portfolio'
}

const displayText = "An passionate techie and creative based in Metro Atlanta. I lead software products by day and create digital media by night."

export default function Bio() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin's desk, with a laptop open to code in an IDE and a monitor viewing documentation"}
                    backgroundText={"More About Me"} foregroundText={"About Me"}
        />
        <main>
          <section className={styles.intro}>
            <div className={styles.introDecor}>
              <div className={styles.introDecorText}>
                <h2>Who <span className={"emphasis"}>I Am</span></h2>
                <Image src={meImage} className={styles.vertImg} alt={"A stylized photo of Justin"}/>
                <p className={"display-text"}>{displayText}</p>
                <p className={"signature"} style={{fontSize: "2.4rem"}}>Justin Quinn</p>
              </div>
              <Image src={meImage} alt={"A stylized photo of Justin"} className={styles.horizImg}/>
            </div>
            <p className={"display-text"}>{displayText}</p>
            <p className={"signature"} style={{fontSize: "2.4rem"}}>Justin Quinn</p>
          </section>
        </main>
      </>
  );
}
