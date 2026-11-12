import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/bio.png";
import React from "react";
import styles from "@/app/about/bio/biopage.module.css";
import Image from "next/image";
import meImage from "@public/images/me.png";
import {ListCarouselItem} from "@/components/carousel/ListCarousel";
import softwareDisplay from "@public/images/features/software.png";
import graphicsDisplay from "@public/images/features/graphics.png";
import photographyDisplay from "@public/images/features/photography.png";
import musicDisplay from "@public/images/features/music.png";
import softwareTeam from "@public/images/features/softwareTeam.png";
import Link from "next/link";
import ColToListCarousel from "@/components/carousel/ColToListCarousel";

export const metadata: Metadata = {
  title: 'Bio | JQB Portfolio'
}

const aboutText = "A passionate techie and creative based in Metro Atlanta. I lead software products by day and create digital media by night."

const disciplineItems = [
  {
    img: {
      src: softwareDisplay,
      alt: "A screenshot of OneFeed's code in an IDE"
    },
    title: "Software",
    description: "Mobile, web, backend--you name it, I love it. I code across languages and platforms to make software that solves real problems.",
    link: {
      href: "/my-work/software", title: "View Projects"
    }
  },
  {
    img: {
      src: graphicsDisplay,
      alt: "A floating island composited into a pine forest with a mountain backdrop"
    },
    title: "Designs",
    description: "I'm a sucker for good design, and try to explore the field myself. Check out my logo, composite, and UI work below.",
    link: {
      href: "/my-work/designs", title: "View Collections"
    }
  },
  {
    img: {
      src: photographyDisplay,
      alt: "Aerial view of Manhattan in black and white"
    },
    title: "Photos",
    description: "Photography gets me exploring the world. I love the challenge of accurately capturing each scene's feel.",
    link: {
      href: "/my-work/photos", title: "View Albums"
    }
  },
  {
    img: {
      src: musicDisplay,
      alt: "A screenshot of a track open in GarageBand"
    },
    title: "Music",
    description: "Nothing beats a rich soundscape or telling stories through sound. I compose and produce to create them myself.",
    link: {
      href: "/my-work/music", title: "View Albums"
    }
  }
]

const whyPeopleText = "With their broad accessibility, I love tech and art’s ability to bring diverse perspectives together to create things bigger than ourselves.";
const whyPassionText = "No matter the medium, my creative endeavors are motivated by my desire to move people with my thoughts and expression of them."

export default function Bio() {

  const completeItems: ListCarouselItem[] = disciplineItems.map((item) => (
      {
        backgroundImg: {
          src: item.img.src,
          alt: item.img.alt
        },
        title: item.title,
        link: {
          href: item.link.href,
          title: item.link.title
        },
        overlayContent: (
            <div className={styles.dynamicContent}>
              <h3>{item.title}</h3>
              <p className={`display-text`}>{item.description}</p>
              <Link className={'display-text'} href={item.link.href}>{item.link.title}</Link>
            </div>
        )
      }
  ))

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
                <h2>Who <b>I Am</b></h2>
                <Image src={meImage} className={styles.vertImg} alt={"A stylized photo of Justin"}/>
                <p className={"display-text"}>{aboutText}</p>
                <p className={"signature"} style={{fontSize: "2.4rem"}}>Justin Quinn</p>
              </div>
              <Image src={meImage} alt={"A stylized photo of Justin"} className={styles.horizImg}/>
            </div>
            <p className={"display-text"}>{aboutText}</p>
            <p className={"signature"} style={{fontSize: "2.4rem"}}>Justin Quinn</p>
          </section>
          <section className={styles.disciplines}>
            <ColToListCarousel items={completeItems} staticContent={(
                <h2 className={styles.disciplinesHeader}>What <b>I Do</b></h2>
            )} delay={5000}/>
          </section>
          <section className={styles.whys}>
            <h2>My <b>Whys</b></h2>
            <div className={styles.reason}>
              <h3>People</h3>
              <Image src={softwareTeam} alt={"Justin and six of his DevDogs teammates smiling for a group photo"}/>
              <p>{whyPeopleText}</p>
            </div>
            <div className={styles.reason}>
              <h3>Passion</h3>
              <div className={styles.passionDecoration}>
                <p><i>Thoughts<br />Matter</i></p>
                <div className={styles.scrollingText}>
                  <p aria-hidden="true">Think different. Share it. Improve.</p>
                  <p aria-hidden="true">Think different. Share it. Improve.</p>
                </div>
              </div>
              <p>{whyPassionText}</p>
            </div>
          </section>
        </main>
      </>
  );
}
