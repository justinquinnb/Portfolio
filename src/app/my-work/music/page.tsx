import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/music.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Music | JQB Portfolio'
}

export default function Music() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Hands on a MIDI keyboard with sheet music beside it"}
                    backgroundText={"Songs Albums EPs Compositions"} foregroundText={"Music"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
