import { LitElement, html, css } from 'lit-element';

import '../../../components/login/simple.js';

class LoginSimplePage extends LitElement {
  static get styles() {
    return css`
      h3 {
        border-bottom:1px solid var(--nsys-blue3s);
        font-weight:500;
      }

      .p {
        margin:10px;
        font-size:0.8em;
        line-height:1.5em;
      }
    `;
  }
  render() {
    return html`
      <login-simple></login-simple>
    `;
  }
}

customElements.define('page-login-simple', LoginSimplePage);