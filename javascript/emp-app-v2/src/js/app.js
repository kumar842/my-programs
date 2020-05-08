import MyElement from './my-element.js';
import {html, render} from 'https://unpkg.com/lit-html?module';
//import state from './state.js';

// const content = html`<my-element name='Rajkumar', count=0>
// <p>This is child content....</p>
// </my-element>`;
let state2 = {
    employees: [{
        id: 1
    }]
};

let myElement = new MyElement(state2);


const content = html`${myElement.render()}`;
//console.log(content);
render(content, document.getElementById('myapp'));