import { LitElement, html, css } from 'lit-element';

class ComponentsPage extends LitElement {
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
      <h3>Just a few tests</h3>
      <div class="p">
        In this section, you will find a few tests of components.
      </div>
    `;
  }
}

customElements.define('page-components', ComponentsPage);