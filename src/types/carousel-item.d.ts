import {StaticImageData} from "next/image";

/**
 A carousel item
 */
export interface CarouselItem {
  display: {
    img: {
      src: StaticImageData; alt: string
    };
    title: string;
    caption?: string;
    link?: {
      href: string; title: string;
    }
  }
  thumbnail?: {
    img?: {
      src: StaticImageData; alt: string
    };
  }
}
