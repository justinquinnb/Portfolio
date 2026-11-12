import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/graphics.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Designs | JQB Portfolio'
}

export default function Designs() {
  // TODO edit header frame element to either apply shadow to descenders (only beneath header bg)
  // or alternatively use inverted color on the descended portion (once again masked to only apply below the bg)
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Photoshop composition of island floating in forest by Justin"}
                    backgroundText={"Graphic Design"} foregroundText={"Designs"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
