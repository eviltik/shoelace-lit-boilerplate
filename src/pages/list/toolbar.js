import { LitElement, html, css } from 'lit-element';

class ListToolbar extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: end;
      }

      @media (max-width: 600px) {
        :host {
          flex-direction: column;
        }
      }


    `;
  }

  constructor() {
    super();
    this.period = localStorage.getItem('period') || 'any';
    this.tags = localStorage.getItem('tags') || '';

    this.allowedDates = [
      { value:'any',      label:'Date flexible' },
      { value:'hour',     label:'Less than an hour' },
      { value:'day',      label:'Less than 24 hours' },
      { value:'week',     label:'Less than one week' },
      { value:'month',    label:'Less than one month' },
      { value:'year',     label:'Less than one year' },
    ]

    this.allowedTags = [
      { value:'tag1',     label:'Tag1' },
      { value:'tag2',     label:'Tag2' },
      { value:'tag3',     label:'Tag3' },
      { value:'tag4',     label:'Tag4' },
      { value:'tag5',     label:'Tag5' }
    ]
  }

  handlePeriodChange(e) {
    this.period = e.target.value;
    localStorage.setItem('period', this.period);
  }

  handleTagsChange(e) {
    this.tags = Array.from(e.target.selectedOptions).map(option => option.value);
    localStorage.setItem('tags', this.tags.join(' '));
  }

  render() {
    return html`
      <sl-select placeholder="Dates" value="${this.period}" @sl-change="${e => this.handlePeriodChange(e)}" size="small">
        ${this.allowedDates.map(date => html`
          <sl-option value="${date.value}">${date.label}</sl-option>
        `)}
      </sl-select>

      <sl-select placeholder="Filtres" value="${this.tags}" multiple clearable @sl-change="${e => this.handleTagsChange(e)}" size="small">
        ${this.allowedTags.map(tag => html`
          <sl-option value="${tag.value}">${tag.label}</sl-option>
        `)}
      </sl-select>
    `;
  }
}

customElements.define('list-toolbar', ListToolbar);