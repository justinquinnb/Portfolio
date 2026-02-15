import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/software.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Software | JQB Portfolio'
}

export default function Software() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin and Team leading a DevDogs meeting in a full classroom"}
                    backgroundText={"Software with purpose."} foregroundText={"Software"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
