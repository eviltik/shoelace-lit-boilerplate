import { LitElement, html, css } from 'lit-element';

class ListItems extends LitElement {

  static get properties() {
    return {
      items: { type: Array },
      loading: { type: Boolean }
    };
  }
  static get styles() {
    return css`
      :host {
        display:block;
        margin-left:auto;
        margin-right:auto;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      .card-overview::part(base) {
        background-color:var(--card-background-color);
        border:1px solid var(--nsys-blue3s);
        transition: border 0.2s;
        box-shadow: var(--sl-shadow-large);
        margin-left:10px;
      }

      .card-overview::part(base):hover {
        border:1px solid var(--nsys-blue3); 
      }

      .card-overview::part(image) {
        margin:10px;
      }

      .card-overview {
        max-width: 364px;
        margin-bottom:10px;
      }

      .card-overview small {
        color: var(--sl-color-neutral-500);
      }

      .card-overview [slot='footer'] {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.items = [];
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  render() {
    if (this.loading) {
      return html`<p>Loading...</p>`; // Render a loading message
    }

    return html`
      <div class="grid-container">
      <sl-card class="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />

      <strong>Mittens</strong><br />
      This kitten is as cute as he is playful. Bring him home today!<br />
      <small>6 weeks old</small>
    </sl-card>

    <sl-card class="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />

      <strong>Mittens</strong><br />
      This kitten is as cute as he is playful. Bring him home today!<br />
      <small>6 weeks old</small>
    </sl-card>

    <sl-card class="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />

      <strong>Mittens</strong><br />
      This kitten is as cute as he is playful. Bring him home today!<br />
      <small>6 weeks old</small>
    </sl-card>

    <sl-card class="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />

      <strong>Mittens</strong><br />
      This kitten is as cute as he is playful. Bring him home today!<br />
      <small>6 weeks old</small>
    </sl-card>
    </div>
    `;
  }
}

customElements.define('list-items', ListItems);

