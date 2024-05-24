import { LitElement, html, css } from 'lit-element';

class AboutPage extends LitElement {

  render() {
    return html`
      <h1>About</h1>
      Okey, but about that ?
      <ul>
        <li><a href="/unexisting">Click me to see a 404 error page</a></li>
      </ul>
    `;
  }
}

customElements.define('page-about', AboutPage);