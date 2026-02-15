import type {Metadata} from "next";
import PageHeader from "@/components/frame-elements/PageHeader";
import React from "react";
import heroImage from "@public/images/heroes/contact.png";

export const metadata: Metadata = {
  title: 'Contact Me | JQB Portfolio'
}

export default function Contact() {
  return (
      <>
        <PageHeader img={heroImage}
                    imgAlt={"Hands on a laptop keyboard typing"}
                    backgroundText={"Let's Get in Touch!"} foregroundText={"Contact"}
        />
        <main>
          <p style={{ height: '1000px'}}>Filler text</p>
        </main>
      </>
  );
}
