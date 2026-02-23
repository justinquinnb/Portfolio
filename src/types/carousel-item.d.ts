/**
  A carousel item
 */
export interface CarouselItem {
  display: {
    img: {
      src: string; alt: string
    };
    title: string;
    caption?: string;
    link?: {
      href: string; title: string
    }
  }
  thumbnail?: {
    img?: {
      src: string; alt: string
    };
    title?: string
  }
}
