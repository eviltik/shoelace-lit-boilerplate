import { LitElement, html, css } from 'lit-element';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

class ScrollToTop extends LitElement {
  static get properties() {
    return {
      isVisible: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: fixed;
        bottom: 20px;
        right: 20px;
      }

      .icon {
        font-size:40px;
        border-radius:50%;
        cursor:pointer;
        color:initial;
        text-shadow: 0 0 1px white;
        background-color: var(--icon-background-color);
      }
    `;
  }

  constructor() {
    super();
    this.isVisible = false;
    this._checkScroll = this._checkScroll.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._checkScroll);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._checkScroll);
  }

  _checkScroll() {
    this.isVisible = window.scrollY > 200;
  }

  render() {
    return html`
      <icon-m @click="${this.scrollToTop}" name="arrow_circle_up" class="icon" ?hidden="${!this.isVisible}"></icon-m>
    `;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

customElements.define('scroll-to-top', ScrollToTop);