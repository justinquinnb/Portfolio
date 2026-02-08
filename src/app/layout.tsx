import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import Navbar from "@/components/nav/bar/Navbar";
import Footer from "@/components/nav/Footer";
import Navigation from "@/components/nav/Navigation";
config.autoAddCss = false

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan"
})

export const metadata: Metadata = {
  title: "JQB Portfolio",
  description: "A collection of Justin Quinn's software, graphics, photography, and music."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={leagueSpartan.className}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Justin Quinn" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
