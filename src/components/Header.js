import { LitElement, html, css } from 'lit-element';
import './ThemesSelector.js';

import config from '../config.js';

class Header extends LitElement {
  static get styles() {
    return css`
      :host {
        position: sticky;
        top: 0;
        z-index: 1000;
        height:20px;
        display:flex;
        justify-content: space-between;
        padding:5px;
        padding-top:10px;
        padding-bottom:10px;
        border-bottom:1px solid blue;
      }
    `;
  }

  handleThemeChanged(event) {
    // perhaps you want to handle the event here ?
  }

  render() {
    return html`
      <a href="/">Your logo here</sl-icon></a>
      <theme-selector @theme-change="${this.handleThemeChanged}"></theme-selector>
    `;
  }
}

customElements.define('app-header', Header);