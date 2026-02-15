import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/photos.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Photos | JQB Portfolio'
}

export default function Photos() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"A photo of Icelandic mountains beside a stream"}
                    backgroundText={"Photography"} foregroundText={"Photos"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
