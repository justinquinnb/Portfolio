import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faInstagram, faGithub, faThreads } from '@fortawesome/free-brands-svg-icons'
import styles from './socials.module.css';

export default function Socials({className}: {className?: string}) {
  const socials = [
    { icon: faGithub, url: 'https://github.com/justinquinnb', label: 'GitHub' },
    { icon: faInstagram, url: 'https://www.instagram.com/justinquinnb/', label: 'Instagram' },
    { icon: faLinkedin, url: 'https://www.linkedin.com/in/justinqbrand/', label: 'LinkedIn' },
    { icon: faThreads, url: 'https://www.threads.com/@justinquinnb', label: 'Threads' }
  ];

  return (
      <ul className={`${styles.socials} ${className}`}>
        {socials.map((social) => (
            <li key={social.label}>
              <Link href={social.url} target={"_blank"} rel={'noopener noreferrer'} aria-label={social.label}>
                <FontAwesomeIcon icon={social.icon} />
              </Link>
            </li>
        ))}
      </ul>
  );
}