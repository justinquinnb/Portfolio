import {StaticImageData} from "next/image";
import {JSX} from "react";

/**
 A carousel item
 */
export interface CarouselItem {
  backgroundImg: {
    src: StaticImageData;
    alt: string;
  },
  overlayContent: JSX.Element;
}
