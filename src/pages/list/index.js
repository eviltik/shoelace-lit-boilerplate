import { LitElement, html, css } from 'lit-element';
import './toolbar.js';
import './list_items.js';
import './totop.js'

class ListPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <list-toolbar></list-toolbar>
      <list-items></list-items>
      <scroll-to-top></scroll-to-top>
    `;
  }
}

customElements.define('page-list', ListPage);