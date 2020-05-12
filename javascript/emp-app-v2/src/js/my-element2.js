import {LitElement, html, css} from 'https://unpkg.com/lit-element?module';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export default class MyElement2 extends LitElement {
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
      name: {type: String}
    };
  }

  set

  constructor(name) {
    super();
    this.name = name;
  }

  row = (e) => html`<tr><td>${e.id}</td></tr>`; 

  render() {
    let self = this;
    return html`
      <h1>Employee Management System</h1>
      <p>${this.name}</p>
    `;
          
  }
}

window.customElements.define('my-element2', MyElement2);
