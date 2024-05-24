import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import './styles/main.scss';
import './components/Header';
import './pages/home';
import './pages/components';
import './pages/components/login/simple';
import './pages/about';
import './pages/list';
import './pages/errors/404NotFound'
import config from './config';

import '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';

//import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
//setBasePath('/shoelace');


class MainApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display:block;
        
      }

      #container {
        display: flex;
        flex-direction: row;
      }

      #outlet {
        padding:20px;
        padding-top:0px;
        width:100%;
        overflow:auto;
        height: calc(100vh - 80px);
      }

      sl-tree {
        width:200px;
      }

      sl-tree-item::part(label) {
        font-size:0.8rem;
      }

    `;
  }

  constructor() {
    super();
    this.treeItems = this.createTree(config.menu);
  }

  firstUpdated() {
    this.router = new Router(this.shadowRoot.getElementById('outlet'));
    this.router.setRoutes(config.routes);

    window.addEventListener('vaadin-router-location-changed', (event) => {
      this.updateTreeSelection(event.detail.location.pathname);
    });
  }

  resetTreeSelection() {
    const allItems = this.shadowRoot.querySelectorAll('sl-tree-item');
    allItems.forEach(item => item.selected = false);
  }

  updateTreeSelection(path) {
    this.resetTreeSelection();
    const tree = this.shadowRoot.querySelector('sl-tree');
    path = path.replace(/\/$/, '' );
    const q = `sl-tree-item[data-path="${path}"]`;
    const selectedItem = tree.querySelector(q);
  
    if (selectedItem) {
      selectedItem.setAttribute('selected', true);
    }
  }

  navigateTo(e) {
    const pagePath = e.detail?.selection[0]?.getAttribute('data-path');
    Router.go(pagePath);
  }

  createTree(menu, parentPath = '') {
    return Object.entries(menu).map(([path, item]) => {
      const fullPath = parentPath + path;
      if (item.pages) {
        return html`
          <sl-tree-item data-path="${fullPath}" expanded>
            ${item.title}
            ${this.createTree(item.pages, fullPath)}
          </sl-tree-item>
        `;
      } else {
        return html`
          <sl-tree-item data-path="${fullPath}">${item.title}</sl-tree-item>
        `;
      }
    });
  }

  render() {
    return html`
      <app-header></app-header>
      <div id="container">
        <sl-tree class="tree-selectable tree-with-lines" @sl-selection-change=${this.navigateTo}>
          ${this.treeItems}
        </sl-tree>
        <div id="outlet"></div>
      </div>
    `;
  }
}

customElements.define('main-app', MainApp);
