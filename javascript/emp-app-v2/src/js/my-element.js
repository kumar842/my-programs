/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'https://unpkg.com/lit-element?module';
//import {html, render} from 'https://unpkg.com/lit-html?module';

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
      <table>
        <!-- ${self.state.employees.forEach(e => {
          self.row(e)
        })} -->
      </table>
    `;
          
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define('my-element', MyElement);
