import { SlIconButton } from '@shoelace-style/shoelace';
import { LitElement, html, css } from 'lit-element';

import '/node_modules/material-symbols/index.css';

class MaterialIconButton extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      clickable: { type: Boolean },
      hidden: { type: Boolean }
    }
  }

  static get styles() {
    return css`
      :host {
        font-family: "Material Symbols Sharp";
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "liga";
        user-select:none;
        transition:opacity 0.3s;
      }

      :host(.clickable) {
        cursor: pointer;
      }

      :host(.hidden) {
        opacity:0
      }
    `;
  }

  constructor() {
    super();
    this.name = '&nbsp;';
    this.clickable = false;
  }

  render() {
    return html`${this.name}`;
  }

  updated(changedProperties) {
    if (changedProperties.has('clickable')) {
      this.clickable ? this.classList.add('clickable') : this.classList.remove('clickable');
    }

    if (changedProperties.has('hidden')) {
      this.hidden ? this.classList.add('hidden') : this.classList.remove('hidden');
    }
  }
}

customElements.define('icon-m', MaterialIconButton);