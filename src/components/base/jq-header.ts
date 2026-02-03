import {LitElement, html, css} from 'lit'
import {customElement, property} from 'lit/decorators.js'

/**
 * Page header, featuring a viewport-wide hero and customizable bottom-anchored content
 *
 * @property imgSrc the source of the hero image
 * @property imgAlt the alt text of the hero image
 * @slot header content, typically header text and an additional image
 */
@customElement('jq-header')
export class JqHeader extends LitElement {
  @property()
  imgSrc!: string;

  @property()
  imgAlt!: string;

  @property()
  backgroundText!: string;

  @property()
  foregroundText!: string;

  @property()
  repeatedText: string = "";

  render() {
    this.repeatedText = (this.backgroundText + " ").repeat(500);

    // Look for the literal string "\n" and force a line break there
    const formattedForegroundText = this.foregroundText.split('\\n').map((line, index, array) =>
        index < array.length - 1 ? html`${line}<br>` : line
    );

    return html`
      <header>
        <div class="hero-container">
          <img src=${this.imgSrc} alt=${this.imgAlt}>
        </div>
        <div class="repeated-text-container">
          <p aria-hidden="true" class="repeated-text">${this.repeatedText}</p>
        </div>
        <div class="header-content">
          <h1>${formattedForegroundText}</h1>
          <slot></slot>
        </div>
      </header>
    `
  }

  static styles = css`
      header {
          display: grid;
          grid-template-areas: "stack";
          width: 100%;
          overflow: hidden;
          position: relative;
          /* The header height will now be exactly the height of the tallest 
             non-absolute element (which is .header-content) */
      }

      /* 1. The Content (Dictates Space) */
      .header-content {
          grid-area: stack;
          z-index: 3;
          position: relative;
          margin-inline: auto;
          width: 100%;
          max-width: 1300px;
          padding: 8rem 0 0 0; /* This padding defines the minimum height */
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: end;
      }

      /* 2. Background Image (Follows Content Space) */

      .hero-container {
          grid-area: stack;
          z-index: 1;
          position: absolute; /* Take out of flow */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--q-dark-gray);
          display: flex;
          flex-direction: row;
          justify-content: center;
      }

      .hero-container img {
          margin: 0 0 0 15%;
          width: 80%;
          height: 100%; /* Forces image to match header-content height */
          object-fit: cover;
          display: block;
          mask-image: radial-gradient(circle at 55% 50%, white 0%, transparent 70%);
      }

      /* 3. Decorative Text (Follows Content Space) */

      .repeated-text-container {
          grid-area: stack;
          z-index: 2;
          position: absolute; /* Take out of flow */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden; /* Cuts off the repeated text */
          pointer-events: none;
      }

      .repeated-text {
          margin: 0;
          font-weight: 200;
          font-size: 1.6rem;
          color: var(--q-white);
          opacity: 0.1;
          line-height: 1.1;
          word-break: break-all;
      }

      .header-content h1 {
          color: var(--q-white);
          font-size: 8rem;
          flex-basis: 50%;
          flex-grow: 1.5;
          white-space: pre-line;
          margin: 0 0 -.35cap;
      }
      
      @media (max-width: 740px) {
          ::slotted(*) {
              display: none;
          }
      }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'jq-header': JqHeader
  }
}
