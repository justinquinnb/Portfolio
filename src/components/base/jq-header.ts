import {LitElement, html, css, type TemplateResult, type PropertyValues, type CSSResult} from 'lit'
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

  private _formattedForegroundText: TemplateResult | TemplateResult[] = html``;

  private _numLines = 1;

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('backgroundText') && changedProperties.get('backgroundText') == undefined) {
      const repetitionCount = Math.ceil(3000 / this.backgroundText.length);
      this.repeatedText = (this.backgroundText + " ").repeat(repetitionCount);

      // Look for the literal string "\n" and force a line break there
      this._formattedForegroundText = this.foregroundText.split('\\n').map((line, index, array) =>
          index < array.length - 1 ? html`${line}<br>` : html`${line}`
      );

      this._numLines = this.foregroundText.split('\\n').length;
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
          <h1 style="--time-from-lines: ${((this._numLines - 1) * 0.1) + 0.2}s">${this._formattedForegroundText}</h1>
          <slot></slot>
        </div>
      </header>
    `
  }

  static styles = css`
      :host {
          transition-duration: var(--time-from-lines);
          width: 100%;
          max-height: 45vh;
      }
      
      header {
          display: grid;
          grid-template-areas: "stack";
          width: 100%;
          overflow: hidden;
          position: relative;
          height: min-content;
      }
      
      header div {
          grid-area: stack;
          max-height: 45vh;
      }

      .header-content {
          position: relative;
          z-index: 3;
          width: 100%;
          padding-top: 5%;
          margin: 0 auto;
          max-width: 1200px;
          display: flex;
          flex-direction: row;
          align-items: end;
          justify-content: center;
          height: min-content;
      }

      .header-content > h1 {
          color: var(--q-white);
          font-size: 8rem;
          flex-grow: 1.5;
          margin: 0 0 -.35cap;
          animation: rise-up var(--time-from-lines) ease-out;
          filter: drop-shadow(0 4px 4px var(--q-black))
      }

      .hero-container,
      .repeated-text-container {
          min-height: 0;
          overflow: hidden;
      }

      .repeated-text-container {
          position: absolute;
          width: 200%;
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: row;
          opacity: 10%;
      }

      .repeated-text-container p {
          margin: 0;
          word-break: break-all;
          color: var(--q-white);
          font-weight: 200;
          line-height: 1.1;
          font-size: 1.6rem;
          animation: scroll-text 120s linear infinite;
      }
      
      .hero-container {
          background-color: var(--q-dark-gray);
          display: flex;
          flex-direction: row;
          justify-content: end;
          align-items: center;
      }
      
      .hero-container img {
          position: absolute;
          object-fit: cover;
          margin-right: 15%;
          width: 60%;
          mask-image: radial-gradient(circle at 55% 50%, white 0%, transparent 70%);
          opacity: 0;
          animation: fade-in 0.4s linear forwards;
      }
      
      @media (max-width: 740px) {
          ::slotted(*) {
              display: none;
          }
      }
      
      @keyframes fade-in {
          0% {
              opacity: 0;
          }
          
          100% {
              opacity: 100%;
          }
      }
      
      @keyframes scroll-text {
          0% {
              transform: translateX(0);
          }
          100% {
              /* Moves half the total width (since content is duplicated once) */
              transform: translateX(-100%);
          }
      }
      
      @keyframes rise-up {
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
