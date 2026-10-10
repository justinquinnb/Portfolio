import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import Image from "next/image";
import React from "react";
import darkIcon from "@public/branding/jq-icon-dark.svg";
import heroImage from "@public/images/heroes/devdogs-meeting.png";
import styles from "./homepage.module.css";
import meImage from "@public/images/me.png";
import softwareDisplay from "@public/images/features/display/software.png";
import graphicsDisplay from "@public/images/features/display/graphics.png";
import photographyDisplay from "@public/images/features/display/photography.png";
import musicDisplay from "@public/images/features/display/music.png";
import Link from "next/link";
import {CarouselItem} from "@/types/carousel-item";
import SinglePaneCarousel from "@/components/carousel/SinglePaneCarousel";
import DualPaneCarousel from "@/components/carousel/DualPaneCarousel";

export const metadata: Metadata = {
  title: 'Home | JQB Portfolio'
}

const logo = <Image src={darkIcon} alt={"Justin Quinn logo"}/>;
const displayText = "I’m a product manager by trade and a creator at heart. No matter the medium, I strive to work with purpose, lifting standards, people, and what's possible every day."
const featureItemsBrief: CarouselItem[] = [
  {
    display: {
      img: {
        src: softwareDisplay,
        alt: "A screenshot of OneFeed's code in an IDE"
      },
      title: "Software",
      link: {
        href: "/my-work/software", title: "View Projects"
      }
    }
  },
  {
    display: {
      img: {
        src: graphicsDisplay,
        alt: "A floating island composited into a pine forest with a mountain backdrop"
      },
      title: "Graphics",
      link: {
        href: "/my-work/graphics", title: "View Collections"
      }
    }
  },
  {
    display: {
      img: {
        src: photographyDisplay,
        alt: "Aerial view of Manhattan in black and white"
      },
      title: "Photos",
      link: {
        href: "/my-work/photos", title: "View Albums"
      }
    }
  },
  {
    display: {
      img: {
        src: musicDisplay,
        alt: "A screenshot of a track open in GarageBand"
      },
      title: "Music",
      link: {
        href: "/my-work/music", title: "View Albums"
      }
    }
  }
]

const featureItemsFull: CarouselItem[] = [
  {
    display: {
      img: {
        src: softwareDisplay,
        alt: "A screenshot of OneFeed's code in an IDE"
      },
      title: "Social Feed Aggregator",
      link: {
        href: "/my-work/software/project/onefeed", title: "View Project"
      }
    }
  },
  {
    display: {
      img: {
        src: graphicsDisplay,
        alt: "A floating island composited into a pine forest with a mountain backdrop"
      },
      title: "Graphic Composites",
      link: {
        href: "/my-work/graphics/collection/composites", title: "View Collection"
      }
    }
  },
  {
    display: {
      img: {
        src: photographyDisplay,
        alt: "Aerial view of Manhattan in black and white"
      },
      title: "Iceland Photos",
      link: {
        href: "/my-work/photos/album/iceland", title: "View Album"
      }
    }
  },
  {
    display: {
      img: {
        src: musicDisplay,
        alt: "A screenshot of a track open in GarageBand"
      },
      title: "Chillhop Tracks",
      link: {
        href: "/my-work/music/album/fragmented", title: "View Album"
      }
    }
  }
]

export default function Home() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin and team leading a DevDogs club meeting in a full auditorium"}
                    backgroundText={"Justin Quinn"} foregroundText={"Hey,\nI'm Justin"}
                    subtitle={"A creator, leader, and innovator in Metro ATL."}
        >
          {logo}
        </PageHeader>
        <main>
          <section className={styles.intro}>
            <div className={styles.introDecor}>
              <Image src={meImage} alt={"A stylized photo of Justin"} className={styles.horizImg}/>
              <div className={styles.introDecorText}>
                <h2>I seek <span className={"emphasis"}>impact</span>...</h2>
                <Image src={meImage} className={styles.vertImg} alt={"A stylized photo of Justin"}/>
                <p className={"display-text"}>{displayText}</p>
                <Link className={"link-button"} href={"/about/bio"}>More About Me</Link>
              </div>
            </div>
            <p className={"display-text"}>{displayText}</p>
          </section>
          <section className={styles.disciplines}>
            <SinglePaneCarousel
                className={styles.singlePaneCarousel}
                staticContent={
                  <div className={styles.staticCarouselContent}>
                    <h2>...and <span className={"emphasis"}>create a lot</span> of stuff.</h2>
                    <p className={"display-text"}>Software, graphics, music, and more: you name it, I've probably done in it. Here, you'll see some of my favorite mediums right now.</p>
                  </div>
                } items={featureItemsBrief} initialSelection={0}/>
            <DualPaneCarousel
                className={styles.dualPaneCarousel}
                staticContent={
                  <div className={styles.staticCarouselContent}>
                    <h2>...and <span className={"emphasis"}>create a lot</span> of stuff.</h2>
                    <p className={"display-text"}>Software, graphics, music, and more: you name it, I've probably done in it. Here, you'll see some of my favorite mediums right now.</p>
                  </div>
                } items={featureItemsFull} initialSelection={0}/>
          </section>
        </main>
      </>
  );
}
