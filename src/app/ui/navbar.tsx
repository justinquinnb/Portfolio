import SocialIcon from "@/app/ui/social_icon";
import {ReactElement, useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {Url} from "node:url";

/**
 *
 */
export default function Navbar(): ReactElement {
  return (
      <nav>
        <Link href="/">
          <Image src="justin-quinn-wordmark.png" alt="Justin Quinn Wordmark"/>
        </Link>

        <div>
          <NavbarPage parentPageName="Test Page" parentPath={new URL("/")}></NavbarPage>
        </div>

        <div>
          <SocialIcon/>
          <SocialIcon/>
          <SocialIcon/>
        </div>
      </nav>
  )
}

function NavbarPage({parentPageName, parentPath}: {
                      parentPageName: string,
                      parentPath: URL
                    }
): ReactElement {
  const [isHovering, setIsHovering] = useState(false);
  const parentClickable: boolean = parentPath !== null
  const hasChildren: boolean = children !== null && children.size > 0

  return (
      <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
      >
        {parentClickable ?
          <Link href={parentPath}>{parentPageName}</Link> :
          <p>{parentPageName}</p>
        }
        {isHovering && hasChildren ?
          <NavbarDropdown pages={children} /> : null
        }
      </div>
  )
}

/**
 *
 * @param pages
 * @param selected
 * @constructor
 */
function NavbarDropdown({pages}: { pages: Map<string, URL> }): ReactElement {
  return (
      <ul>
        {
          Array.from(pages.keys()).map((pageName) =>
              (<NavbarDropdownItem key={pageName} pageName={pageName} path={pages.get(pageName)!}/>)
          )
        }
      </ul>
  )
}

/**
 * A singular item in a navbar dropdown
 *
 * @param pageName the name of the page this NavbarDropdownItem directs to
 * @param path the path this NavbarDropdownItem directs to
 * @constructor
 */
function NavbarDropdownItem(
    {pageName, path}: { pageName: string, path: URL }
): ReactElement {
  return (
      <li><Link href={path} className={path.pathname === usePathname() ? "selected" : ""}>{pageName}</Link></li>)
}
