import { LitElement, html, css } from 'lit-element';
import { SlIcon, SlIconButton } from '@shoelace-style/shoelace';
import './IconMaterialSymbols';

class ThemeSelector extends LitElement {
  static get properties() {
    return {
      themeMode: { type: String },
      systemDarkMode: { type: Boolean },
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        color:gray;
        margin-right:10px;
        transition:color 0.3s;
      }

      *:hover {
        transition:color 0.3s;
        color:white;
      }
    `;
  }

  constructor() {
    super();
    this.themeMode = localStorage.getItem('themeMode') || 'system';
    this.systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  connectedCallback() {
    super.connectedCallback();
    this.systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.origDarkMode = document.documentElement.classList.contains('sl-theme-dark');
    this.origLightMode = document.documentElement.classList.contains('sl-theme-light');
    document.documentElement.classList.remove('sl-theme-light');

    if (this.origDarkMode && this.origLightMode) {
      this.isDark = this.systemDarkMode;
      if (!this.systemDarkMode) {
        document.documentElement.classList.remove('sl-theme-dark');
      }
    } else if (!this.origDarkMode && !this.origLightMode) {
      this.isDark = this.systemDarkMode;
      if (this.systemDarkMode) {
        document.documentElement.classList.add('sl-theme-dark');
      }
    } else {
      this.isDark = (this.systemDarkMode && !this.origLightMode) || this.origDarkMode;
    }

    this._updateMode(this.themeMode);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.origDarkMode) {
      document.documentElement.classList.add('sl-theme-dark');
    } else {
      document.documentElement.classList.remove('sl-theme-dark');
    }

    if (this.origLightMode) {
      document.documentElement.classList.add('sl-theme-light');
    } else {
      document.documentElement.classList.remove('sl-theme-light');
    }
  }

  _updateMode(mode, ev) {
    if (ev) ev.stopPropagation();
    this.themeMode = mode;

    switch (mode) {
    case 'light':
      this.isDark = false;
      break;
    case 'dark':
      this.isDark = true;
      break;
    case 'system':
      this.isDark = this.systemDarkMode;
      break;
    }

    localStorage.setItem('themeMode', mode);

    if (this.isDark) {
      document.documentElement.classList.add('sl-theme-dark');
      document.documentElement.classList.remove('sl-theme-light');
    } else {
      document.documentElement.classList.remove('sl-theme-dark');
      document.documentElement.classList.add('sl-theme-light');
    }

    const customEvent = new CustomEvent('theme-change', {
      bubbles: true,
      composed: true,
      detail: { isDark: this.isDark },
    });

    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <sl-dropdown>
        <icon-m slot="trigger" clickable name="${this.isDark ? 'dark_mode' : 'light_mode'}"></icon-m>
        <sl-menu>
          <sl-menu-item type="checkbox" ?checked="${this.themeMode === 'light'}" @click="${(e) => this._updateMode('light', e)}">
            Clair
          </sl-menu-item>
          <sl-menu-item type="checkbox" ?checked="${this.themeMode === 'dark'}" @click="${(e) => this._updateMode('dark', e)}">
            Sombre
          </sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item type="checkbox" ?checked="${this.themeMode === 'system'}" @click="${(e) => this._updateMode('system', e)}">
            Système
          </sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `;
  }
}

customElements.define('theme-selector', ThemeSelector);