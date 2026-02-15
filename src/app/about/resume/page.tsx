import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import heroImage from "@public/images/heroes/leader.png";
import React from "react";

export const metadata: Metadata = {
  title: 'Resume | JQB Portfolio'
}

export default function Resume() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin and team leading a DevDogs club meeting in a full auditorium"}
                    backgroundText={"Developer, Innovator, Leader,"} foregroundText={"Resume"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
