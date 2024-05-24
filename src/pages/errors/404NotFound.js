import { LitElement, html, css } from 'lit-element';

class NotFoundPage extends LitElement {
  render() {
    return html`
      <h1>Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <a href="/">Go to Home</a>
    `;
  }
}

customElements.define('page-not-found', NotFoundPage);

