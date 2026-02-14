import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: 'Home | JQB Portfolio'
}

export default function Home() {
  const logo = <Image src={"/branding/jq-icon-light.svg"} alt={"Justin Quinn logo"}
                      width={40} height={40}/>;

  return (
      <>
        <PageHeader imgSrc={"/images/heroes/leader.png"}
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
