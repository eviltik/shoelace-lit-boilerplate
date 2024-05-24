import { LitElement, html, css } from 'lit-element';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

class LoginSimple extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        place-items: center;
        height: 60vh;
        width:80%;
      }

      .card-content > * {
        padding: 10px;
      }

      .button-container {
        text-align: right;
      }

    `;
  }

  handleClick() {
    alert('Button clicked!');
  }

  render() {
    return html`
      <sl-card>
        <div class="card-content">
          <sl-input label="Your email" placeholder="Give me your email"></sl-input>
          <sl-input type="password" label="Password" placeholder="lorem lipsum" password-toggle></sl-input>
          <div class="button-container">
            <sl-button @click="${this.handleClick}">Let's go !</sl-button>
          </div>
        </div>
      </sl-card>
    `;
  }
}

customElements.define('login-simple', LoginSimple);