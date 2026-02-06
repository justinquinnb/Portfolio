import { LitElement, html } from 'lit'
import { customElement} from 'lit/decorators.js'
import './navigation/navbar/jq-navbar.ts';

/**
 * Content positioned between a navbar and a footer
 *
 * @slot page body content
 */
@customElement('page-frame')
export class PageFrame extends LitElement {
  render() {
    return html`
      <jq-navbar></jq-navbar>
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-frame': PageFrame
  }
}
