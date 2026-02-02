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


  render() {
    const currentPath = window.location.pathname;
    const pageIsSelected = currentPath === this.page.path;

    return html`
      ${(this.page.path == null)
          ? html`${this.page.name}`
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

      a[data-selected] {
          color: var(--q-orange);
      }

      a:hover {
          color: var(--q-gray);
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'navbar-page': NavbarPage
  }
}
