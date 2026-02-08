import Navbar from "@/components/nav/bar/Navbar";
import RadialNav from "@/components/nav/radial/RadialNav";
import styles from "./navigation.module.css";

/**
 * Encapsulates the {@link Navbar} and {@link RadialNav} components for cleaner layout templates.
 * The RadialNav component renders for mobile devices, with the Navbar rendering otherwise.
 *
 * @constructor
 */
export default function Navigation() {
  return (
      <>
        <Navbar className={styles.bar}/>
        <RadialNav className={styles.radial}/>
      </>
  )
}