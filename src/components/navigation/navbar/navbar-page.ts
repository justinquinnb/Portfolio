import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'
import {property} from 'lit/decorators.js'
import type {NavPage} from '../nav.types.ts';

/**
 * A navbar page
 */
@customElement('navbar-page')
export class NavbarPage extends LitElement {
  @property()
  page!: NavPage;

  @property({type: Boolean})
  forceSelected?: boolean;

  render() {
    let pageIsSelected = this.forceSelected;
    if (!pageIsSelected) {
      pageIsSelected = window.location.pathname === this.page.path;
    }

    return html`
      ${(this.page.path == null)
          ? html`<span ?data-selected=${pageIsSelected}>${this.page.name}</span>`
          : html`<a ?data-selected=${pageIsSelected} href=${this.page.path}>${this.page.name}</a>`}
    `
  }

  static styles = css`
      /* Base styles for text elements */
      a, p, span, a:visited {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--q-dark-gray);
          text-decoration: var(--internal-parent-decoration, none);
          transition: color 0.2s ease-in-out;
          user-select: none;
      }

      /* Hover state */
      a:hover {
          color: var(--q-gray);
      }

      /* Selected state (with internal overrides) */
      a[data-selected],
      span[data-selected] {
          color: var(--internal-parent-color, var(--q-orange));
          text-decoration: var(--internal-parent-decoration, none);
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'navbar-page': NavbarPage
  }
}
