import {LitElement, html, css, type TemplateResult, type PropertyValues} from 'lit'
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

  _formattedForegroundText: TemplateResult | TemplateResult[] = html``;

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('backgroundText')) {
      const repetitionCount = Math.ceil(6000 / this.backgroundText.length);
      this.repeatedText = (this.backgroundText + " ").repeat(repetitionCount);

      // Look for the literal string "\n" and force a line break there
      this._formattedForegroundText = this.foregroundText.split('\\n').map((line, index, array) =>
          index < array.length - 1 ? html`${line}<br>` : html`${line}`
      );
    }
  }

  render() {
    return html`
      <header>
        <div class="hero-container">
          <img src=${this.imgSrc} alt=${this.imgAlt}>
        </div>
        <div class="repeated-text-container">
          <p aria-hidden="true" class="repeated-text">${this.repeatedText}</p>
          <p aria-hidden="true" class="repeated-text">${this.repeatedText}</p>
        </div>
        <div class="header-content">
          <h1>${this._formattedForegroundText}</h1>
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
          width: 200%;
          height: 100%;
          overflow: hidden; /* Cuts off the repeated text */
          pointer-events: none;
          display: flex;
          flex-direction: row;
      }

      .repeated-text {
          width: 100%;
          margin: 0;
          font-weight: 200;
          font-size: 1.6rem;
          color: var(--q-white);
          opacity: 0.1;
          line-height: 1.1;
          word-break: break-all; /* TODO: Mildly problematic in creating seams with misspellings */
          animation: scrollText 120s linear infinite;
      }

      .header-content h1 {
          color: var(--q-white);
          font-size: 8rem;
          flex-basis: 50%;
          flex-grow: 1.5;
          white-space: pre-line;
          margin: 0 0 -.35cap;
          animation: riseUp 0.3s ease-out;
      }
      
      @media (max-width: 740px) {
          ::slotted(*) {
              display: none;
          }
      }
      
      @keyframes scrollText {
          0% {
              transform: translateX(0);
          }
          100% {
              /* Moves half the total width (since content is duplicated once) */
              transform: translateX(-100%);
          }
      }
      
      @keyframes riseUp {
          0% {
              transform: translateY(100%);
          }
          
          100% {
              transform: translateY(0);
          }
      }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'jq-header': JqHeader
  }
}
