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
      a, p, a:visited{
          font-weight: 500;
          font-size: 1.2rem;
          text-decoration: none;
          color: var(--q-dark-gray);
      }

      a:hover {
          color: var(--q-gray);
      }

      a[data-selected], span[data-selected] {
          /* 1. Try the internal override variable first */
          /* 2. Fall back to the standard orange */
          color: var(--internal-header-color, var(--q-orange));
          transition: color 0.2s ease-in-out;
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'navbar-page': NavbarPage
  }
}
