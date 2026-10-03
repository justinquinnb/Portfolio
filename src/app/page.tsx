import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import Image from "next/image";
import React from "react";
import darkIcon from "@public/branding/jq-icon-dark.svg";
import heroImage from "@public/images/heroes/devdogs-meeting.png";
import styles from "./homepage.module.css";
import meImage from "@public/images/me.png";
import onefeedDisplay from "@public/images/features/display/software.png";
// import brandAssetsDisplay from "@public/images/features/display/graphics.png";
import nycPhotoDisplay from "@public/images/features/display/photography.png";
import garageBandDisplay from "@public/images/features/display/music.png";
import Link from "next/link";
import Carousel from "@/components/carousel/Carousel";
import {CarouselItem} from "@/types/carousel-item";

export const metadata: Metadata = {
  title: 'Home | JQB Portfolio'
}

const logo = <Image src={darkIcon} alt={"Justin Quinn logo"} />;
const displayText = "I’m a product manager by trade and a creator at heart. No matter the medium, I strive to work with purpose, lifting standards, people, and what's possible every day."
const featureItems: CarouselItem[] = [
  {
    display: {
      img: {
        src: onefeedDisplay,
        alt: "A screenshot of OneFeed's code in an IDE"
      },
      title: "OneFeed",
      link: {
        href: "/my-work/software/onefeed", title: "View Project"
      }
    }
  },
  // {
  //   display: {
  //     img: {
  //       src: brandAssetsDisplay,
  //       alt: "A grid of various brand assets"
  //     },
  //     title: "Brand Assets",
  //     link: {
  //       href: "/my-work/graphics/collection/brand-assets", title: "View Collection"
  //     }
  //   }
  // },
  {
    display: {
      img: {
        src: nycPhotoDisplay,
        alt: "Aerial view of Manhattan in black and white"
      },
      title: "New York Photos",
      link: {
        href: "/my-work/photos/album/new-york", title: "View Album"
      }
    }
  },
  {
    display: {
      img: {
        src: garageBandDisplay,
        alt: "A screenshot of a track open in GarageBand"
      },
      title: "Fragmented EP",
      link: {
        href: "/my-work/music/album/fragmented", title: "View EP"
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
              <Image src={meImage} alt={"A stylized photo of Justin"}/>
              <div className={styles.introDecorText}>
                <h2>I seek <span className={"emphasis"}>impact</span>...</h2>
                <p className={"display-text"}>{displayText}</p>
                <Link className={"link-button"} href={"/about/bio"}>More About Me</Link>
              </div>
            </div>
            <p className={"display-text"}>{displayText}</p>
          </section>
          <section className={styles.disciplines}>
            <Carousel
              staticContent={
                <h2>...and <span className={"emphasis"}>create a lot</span> of stuff.</h2>
              } items={featureItems} initialSelection={0}/>
          </section>
        </main>
      </>
  );
}
