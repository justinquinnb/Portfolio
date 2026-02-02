import { LitElement, css, html } from 'lit'
import {customElement, property} from 'lit/decorators.js'
import jqIconLight from '../../../assets/brand/jqicon-light.png'
import {centeredContent} from "../../../css/container-styles.ts";
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import { map } from 'lit/directives/map.js';
import type {NavGroup, NavPage} from '../nav.types.ts';
import './navbar-page.ts'
import './navbar-group.ts'
import '../socials-list.ts'

/**
 * The primary, web navigation
 */
@customElement('nav-bar')
export class Navbar extends LitElement {
  navPages: (NavPage | NavGroup)[] = [
    { name: 'Home', path: '/'},
    { name: 'About', path: null, subpages: [
        { name: 'Biography', path: '/about/bio'},
        { name: 'Resume', path: '/about/resume'}]
    },
    { name: 'My Work', path: null, subpages: [
        { name: 'Software', path: '/my-work/software'},
        { name: 'Graphics', path: '/my-work/graphics'},
        { name: 'Photos', path: '/my-work/photos'},
        { name: 'Music', path: '/my-work/music'}]
    },
    { name: 'Contact', path: '/contact'}
  ];

  @property({type: Boolean})
  atTopOfPage: boolean = true;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._handleScroll);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll);
  }

  private _handleScroll = () => {
    this.atTopOfPage = window.scrollY === 0;
  }

  render() {
    return html`
      <nav ?data-at-top=${this.atTopOfPage}>
        <div class="centered-content">
          <div id="wordmark">
            <a href="/">
              <img src=${jqIconLight} alt="Justin Quinn Icon"/>
              <p>Justin Quinn</p>
            </a>
          </div>
          <div id="page-selection">
            <ul id="page-groups">
              ${map(this.navPages, (page) => {
                if (!('subpages' in page)) {
                  return html`<li><navbar-page class="top-level" .page=${page}></navbar-page></li>`
                } else {
                  return html`<li><navbar-group .pageGroup=${page}></navbar-group></li>`
                }
              })}
            </ul>
          </div>
          <div id="socials">
            <socials-list></socials-list>
          </div>
        </div>
      </nav>
    `
  }

  static styles = [
    centeredContent,
    css`
        :host {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
        }

        /* --- Shared Layout Logic --- */
        nav,
        nav div,
        #wordmark a,
        ul {
            display: flex;
            align-items: center;
        }

        nav {
            height: 4vh;
            width: 100%;
            padding: 0.6rem 0;
            justify-content: space-between;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            background-color: var(--q-white);
            --top-level-page-default-color: var(--q-dark-gray);
            transition: 
                background-color 0.2s ease-in-out,
                box-shadow 0.2s ease-in-out,
                --top-level-page-default-color 0.2s ease-in-out;
        }
        
        nav[data-at-top] {
            background-color: transparent;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            --top-level-page-default-color: var(--q-white);
        }

        nav:hover {
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            --top-level-page-default-color: var(--q-dark-gray);
            background-color: var(--q-white);
        }

        nav div, 
        #wordmark a {
            height: 100%;
            gap: 0.8rem;
        }

        /* Section Distribution */
        #wordmark,
        #socials {
            flex: 1 1 20%;
            opacity: 100%;
            transition: opacity 0.2s ease-in-out;
        }

        nav[data-at-top] #wordmark,
        nav[data-at-top] #socials {
            opacity: 0;
        }

        nav:hover #wordmark,
        nav:hover #socials {
            opacity: 100%;
        }

        #page-selection {
            flex: 1 1 60%;
            justify-content: center;
        }

        #wordmark { justify-content: flex-start; }
        #socials  { justify-content: flex-end; }

        #wordmark a {
            color: var(--q-dark-gray);
            font-weight: 700;
            font-size: 1.3rem;
            text-decoration: none;
            white-space: nowrap;

            transform: translateY(1px);
            flex-shrink: 0;
        }

        #wordmark a img {
            height: 100%;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        #page-groups {
            gap: 1.5rem;
            justify-content: space-between;
            width: auto;
        }

        #page-groups li {
            font-size: 1.2rem;
            font-weight: 500;
            white-space: nowrap;
        }

        @media (max-width: 640px) {
            #socials {
                display: none;
            }

            #wordmark,
            #page-selection {
                flex: 1 1 50%;
            }

            #page-selection {
                justify-content: flex-end;
            }
        }
    `
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-bar': Navbar
  }
}
