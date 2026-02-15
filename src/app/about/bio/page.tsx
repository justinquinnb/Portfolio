import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/bio.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Bio | JQB Portfolio'
}

export default function Bio() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin's desk, with a laptop open to code in an IDE and a monitor viewing documentation"}
                    backgroundText={"More About Me"} foregroundText={"About Me"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
