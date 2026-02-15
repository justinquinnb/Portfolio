import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import Image from "next/image";
import React from "react";
import darkIcon from "@public/branding/jq-icon-dark.svg";
import heroImage from "@public/images/heroes/leader.png";

export const metadata: Metadata = {
  title: 'Home | JQB Portfolio'
}

export default function Home() {
  const logo = <Image src={darkIcon} alt={"Justin Quinn logo"} />;

  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Justin and team leading a DevDogs club meeting in a full auditorium"}
                    backgroundText={"Justin Quinn"} foregroundText={"Hey,\nI'm Justin"}
                    subtitle={"A creator, leader, and innovator in Metro ATL"}
        >
          {logo}
        </PageHeader>
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
