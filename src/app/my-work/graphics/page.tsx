import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/graphics.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Graphics | JQB Portfolio'
}

export default function Graphics() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Photoshop composition of island floating in forest by Justin"}
                    backgroundText={"Graphic Design"} foregroundText={"Graphics"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
