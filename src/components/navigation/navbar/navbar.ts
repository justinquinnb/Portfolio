import { LitElement, css, html } from 'lit'
import { customElement} from 'lit/decorators.js'
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
        { name: 'Biography', path: '/bio'},
        { name: 'Resume', path: '/resume'}]
    },
    { name: 'My Work', path: null, subpages: [
        { name: 'Software', path: '/my-work/software'},
        { name: 'Graphics', path: '/my-work/graphics'},
        { name: 'Photos', path: '/my-work/photos'},
        { name: 'Music', path: '/my-work/music'}]
    },
    { name: 'Contact', path: '/contact'}
  ];

  render() {
    return html`
      <nav>
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
                  return html`<li><navbar-page .page=${page}></navbar-page></li>`
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
        }

        nav,
        nav div,
        #wordmark a,
        ul {
            display: flex;
            align-items: center;
        }

        nav {
            justify-content: space-between;
            padding: 0.6rem 0;
            height: 4vh;
            min-width: 100%;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
            z-index: 10;
        }

        /* Common container behavior */
        nav div,
        #wordmark a {
            gap: 0.8rem;
            height: 100%;
        }

        /* Layout distribution */
        #wordmark,
        #socials {
            flex: 1 1 20%;
        }

        #page-selection {
            flex: 1 1 60%;
            justify-content: center;
        }

        #wordmark { justify-content: flex-start; }
        #socials  { justify-content: flex-end; }

        /* Typography & Links */
        #wordmark a {
            color: var(--q-dark-gray);
            font-weight: 700;
            font-size: 1.3rem;
            text-decoration: none;
            transform: translateY(1px);

            /* Prevention of wrapping */
            white-space: nowrap;
            flex-shrink: 0;
        }

        #wordmark a img {
            height: 100%;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        #page-groups {
            display: flex;
            gap: 1.5rem;
            justify-content: space-between;
            width: auto;
        }

        #page-groups li {
            font-weight: 500;
            font-size: 1.2rem;
            white-space: nowrap;
        }
        
        @media(max-width: 640px) {            
            #socials {
                display: none;
            }

            #wordmark {
                flex: 1 1 50%;
                justify-content: flex-start;
            }

            #page-selection {
                flex: 1 1 50%;
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
