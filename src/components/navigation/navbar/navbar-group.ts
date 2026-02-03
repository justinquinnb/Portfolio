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
      <div class="navbar-dropdown">
        <navbar-page class="dropdown-parent top-level" .page=${this.pageGroup} .forceSelected=${subpageIsSelected}></navbar-page>
        <ul class="navbar-dropdown-content">
          ${this.pageGroup.subpages.map(p => html`
            <li><navbar-page .page=${p}></navbar-page></li>
          `)}
        </ul>
      </div>
    `
  }

  static styles = css`
      .navbar-dropdown {
          position: relative;
          float: left;
          --group-header-color: var(--q-orange);
      }

      .navbar-dropdown-content {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 100%;
          left: -1rem;
          z-index: 10;
          
          transition: opacity 0.15s ease-in-out; /* So this feels a little snappier */
      }

      /* Hover area bridge for dropdown content container */
      .navbar-dropdown-content::before {
          content: "";
          position: absolute;
          top: -0.3rem;
          left: 0;
          right: 0;
          height: 0.3rem;

          background: transparent;
          pointer-events: auto;
      }

      /* Dropdown shadow (to prevent weird shadow overlap) */
      .navbar-dropdown-content::after {
          content: "";
          position: absolute;
          top: .9rem;
          left: 0;
          right: 0;
          height: calc(100% - 1rem);
          z-index: -1;

          background-color: var(--q-white);
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 0 0 0.2rem 0.2rem;
      }

      /* Interaction Logic */
      .navbar-dropdown:hover .navbar-dropdown-content {
          opacity: 1;
          visibility: visible;
      }

      /* Target the IMMEDIATELY nested navbar-page when parent is hovered */
      .navbar-dropdown:hover > navbar-page {
          --internal-parent-color: var(--q-dark-gray);
          --internal-parent-decoration: underline;
      }

      /* Ensure the sub-pages inside the dropdown stay orange if selected */
      .navbar-dropdown-content navbar-page {
          --internal-parent-color: var(--q-orange);
          --internal-parent-decoration: none;
      }

      ul {
          margin: 0;
          padding: 0.1rem 1rem 0.4rem 1rem;
          list-style: none;
      }

      li {
          padding-top: 0.5rem;
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'navbar-group': NavbarGroup
  }
}
