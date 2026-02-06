import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import { map } from 'lit/directives/map.js';
import type {SocialLink} from './nav.types.ts';

/**
 * A navbar page
 */
@customElement('socials-list')
export class SocialsList extends LitElement {
  socials: SocialLink[] = [
    { icon: 'github', url: 'https://github.com/justinquinnb', label: 'GitHub' },
    { icon: 'instagram', url: 'https://www.instagram.com/justinquinnb/', label: 'Instagram' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/in/justinqbrand/', label: 'LinkedIn' },
    { icon: 'threads', url: 'https://www.threads.com/@justinquinnb', label: 'Threads' }
  ];

  render() {
    return html`
      <ul class="socials-list" aria-label="Justin Quinn's Social Media Accounts">
        ${map(this.socials, (s) => html`
          <li>
            <a target="_blank" rel="noopener noreferrer" href=${s.url} aria-label=${s.label}>
              <wa-icon name=${s.icon} family="brands"></wa-icon>
            </a>
          </li>
        `)}
      </ul>
    `
  }

  static styles = css`
      ul {
          display: flex;
          flex-direction: row;
          gap: 0.3rem;

          margin: 0;
          padding: 0;
          list-style-type: none;
      }

      a {
          color: var(--q-black);
          text-decoration: none;
          transition: color 0.2s ease-in-out;
      }

      a:visited {
          color: var(--q-black);
      }

      a:hover {
          color: var(--q-gray);
      }

      wa-icon {
          font-size: 1.3rem;
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'socials-list': SocialsList
  }
}
