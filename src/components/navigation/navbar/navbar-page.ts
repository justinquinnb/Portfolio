import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'
import {property, state} from 'lit/decorators.js'
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
    return html`
      ${(this.page.path == null)
          ? html`<span ?data-selected=${this._isThisPageSelected()}>${this.page.name}</span>`
          : html`<a ?data-selected=${this._isThisPageSelected()} href=${this.page.path}>${this.page.name}</a>`}
    `
  }

  private _isThisPageSelected() {
    return this.forceSelected || window.location.pathname === this.page?.path;
  }

  static styles = css`      
      /* Base styles for text elements */
      a, span, a:visited {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--q-dark-gray);
          text-decoration: var(--internal-parent-decoration, none);
          transition: color 0.2s ease-in-out;
          user-select: none;
      }

      a, span, a:visited {
          color: var(--top-level-page-default-color);
      }

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
