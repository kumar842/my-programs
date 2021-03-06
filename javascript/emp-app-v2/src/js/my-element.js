import {LitElement, html, css} from 'https://unpkg.com/lit-element?module';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export default class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      state: {type: Object}
    };
  }

  constructor(state) {
    super();
    this.state = state;
  }

  row = (e) => html`<tr><td>${e.id}</td></tr>`; 

  render() {
    let self = this;
    return html`
      <h1>Employee Management System</h1>
      <p>${this.state.employees[0].id}</p>
    `;
          
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define('my-element', MyElement);
