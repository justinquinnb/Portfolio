import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'
import {property} from 'lit/decorators.js'
import type {NavGroup} from '../nav.types.ts';
import './navbar-page.ts'

/**
 * A navbar group
 */
@customElement('navbar-group')
export class NavbarGroup extends LitElement {
  @property()
  pageGroup!: NavGroup;


  render() {
    const currentPath: string = window.location.pathname;
    const subpageIsSelected = this.pageGroup.subpages
    .map(sp => sp.path)
    .includes(currentPath);

    return html`
      <div id="navbar-dropdown">
        <navbar-page .page=${this.pageGroup} .forceSelected=${subpageIsSelected}></navbar-page>
        <ul id="navbar-dropdown-content">
          ${this.pageGroup.subpages.map(p => html`
            <li><navbar-page .page=${p}></navbar-page></li>
          `)}
        </ul>
      </div>
    `
  }

  static styles = css`
      #navbar-dropdown {
          float: left;
          position: relative;
          --group-header-color: var(--q-orange);
      }

      #navbar-dropdown-content {
          display: none;
          position: absolute;
          z-index: 0;
          top: 100%;
          left: -1rem;
      }

      /* The Bridge: Use a pseudo-element on the content container */
      #navbar-dropdown-content::before {
          content: "";
          position: absolute;
          /* Pulls the 'hitbox' up into the navbar so hover doesn't break */
          top: -.3rem;
          left: 0;
          right: 0;
          height: .3rem;
          background: transparent;
          /* pointer-events ensures it catches the mouse */
          pointer-events: auto;
      }
      
      #navbar-dropdown-content::after {
          content: "";
          position: absolute;
          top: 1rem;
          height: calc(100% - 1rem);
          left: 0;
          right: 0;
          z-index: -1;
          background-color: var(--q-white);
          border-radius: 0 0 .2rem .2rem;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      }

      #navbar-dropdown:hover #navbar-dropdown-content {
          display: block;
      }

      ul {
          list-style: none;
          padding: .1rem 1rem .4rem 1rem;
          margin: 0;
      }

      li {
          padding-top: .5rem;
      }

      /* When the dropdown is hovered, target the IMMEDIATELY nested navbar-page */
      #navbar-dropdown:hover > navbar-page {
          --internal-header-color: var(--q-dark-gray);
      }

      /* Ensure the sub-pages inside the <ul> stay orange if selected */
      #navbar-dropdown-content navbar-page {
          --internal-header-color: var(--q-orange);
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'navbar-group': NavbarGroup
  }
}
