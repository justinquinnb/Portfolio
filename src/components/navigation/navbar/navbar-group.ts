import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'
import {property} from 'lit/decorators.js'
import type {NavGroup, NavPage} from '../nav.types.ts';

/**
 * A navbar group
 */
@customElement('navbar-group')
export class NavbarPage extends LitElement {
  @property()
  pageGroup!: NavGroup;


  render() {
    const currentPath = window.location.pathname;
    const pageIsSelected = currentPath === this.pageGroup.path;

    return html`
      ${(this.pageGroup.path == null)
          ? html`${this.pageGroup.name}`
          : html`<a ?data-selected=${pageIsSelected} href=${this.pageGroup.path}>${this.pageGroup.name}</a>`}
    `
  }

  static styles = css`   
      a, a:visited{
          text-decoration: none;
          color: var(--q-dark-gray)
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
    'navbar-group': NavbarPage
  }
}
