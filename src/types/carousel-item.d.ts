import {JSX} from "react";
import {ImageProps} from "next/image";

/**
 A carousel item
 */
export type CarouselItem = {
  backgroundImg: ImageProps,
  overlayContent: JSX.Element;
}
