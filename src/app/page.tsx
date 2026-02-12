import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Home | JQB Portfolio'
}

export default function Home() {
  return (
      <>
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <h3>Header 3 with <span className="emphasis">Emphasis</span></h3>
        <h4>Header 4</h4>
        <h4 className="unselected">Header 4 (unselected)</h4>
        <h5>Header 5</h5>
        <h6>Header 6</h6>
        <p className="display-text"> Display paragraph text.</p><p>Regular paragraph text with <Link href="/">link</Link></p>
        <p style={{ height: '1000px'}}>Filler text</p>
      </>
  );
}
