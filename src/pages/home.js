import { LitElement, html, css } from 'lit-element';

class HomePage extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <h3>Home</h3>
      <p>
        Hello shoelace !
      </p>
    `;
  }
}

customElements.define('page-home', HomePage);