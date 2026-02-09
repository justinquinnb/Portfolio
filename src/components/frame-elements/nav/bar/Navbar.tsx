"use client"

import Link from "next/link";
import pagesJson from "../../../../data/pages.json";
import Image from "next/image";
import Socials from "@/components/frame-elements/nav/Socials";
import {usePathname} from "next/navigation";
import {NavGroup, NavPage} from "@/types/nav-page";
import styles from "./navbar.module.css";
import React, {useEffect} from "react";

/**
 * Standard, viewport-wide navbar for use on large screens.
 * @constructor
 */
export default function Navbar({ className}: { className?: string }) {
  const topLevelElements: (NavPage | NavGroup)[] = pagesJson;
  const [isAtTop, setIsAtTop] = React.useState(false);

  const handleScroll = () => {
    setIsAtTop(window.scrollY == 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  })

  return (
      <nav className={`${styles.navbar} ${isAtTop ? styles.atTop : ""} ${className}`}>
        <div className={styles.wordmark}>
          <Link href={"/public"}>
            <Image src={"/branding/jq-icon-light.svg"} alt={"Justin Quinn logo"} width={50} height={50} />
          </Link>
          <Link className={styles.word} href={"/public"}>Justin Quinn</Link>
        </div>
        <ul className={styles.navigation}>
          {topLevelElements.map((topLevelElement) => {
            if (!("subpages" in topLevelElement)) {
              return (<li key={topLevelElement.name}><NavbarItem className={styles.childless} page={topLevelElement}></NavbarItem></li>)
            } else {
              return (<li key={topLevelElement.name}><NavbarGroup pageGroup={topLevelElement}></NavbarGroup></li>)
            }
          })}
        </ul>
        <Socials className={styles.socials}/>
      </nav>
  );
}

function NavbarGroup({pageGroup}: {pageGroup: NavGroup}) {
  const currentPath = usePathname();
  const isGroupSelected = currentPath.startsWith(pageGroup.path);

  return (
      <div className={styles.group}>
        <NavbarItem className={styles.parent} page={pageGroup} isSelected={isGroupSelected} />
        <ul className={styles.children}>
          {pageGroup.subpages.map((subpage: NavPage) =>
              (<li key={subpage.name}><NavbarItem page={subpage} className={styles.child}/></li>)
          )}
        </ul>
      </div>
  )
}

function NavbarItem({page, isSelected, className}: {page: NavPage; isSelected?: boolean; className?: string}) {
  if (isSelected == undefined) {
    const currentPath = usePathname();
    isSelected = currentPath === page.path;
  }

  const selectedClass = isSelected ? styles.selected : "";

  if ("visitable" in page && !page.visitable) {
    return (<span className={`${className} display-text ${selectedClass} not-visitable`}>{page.name}</span>)
  } else {
    return (<Link className={`${className} display-text ${selectedClass}`} href={page.path}>{page.name}</Link>)
  }
}
