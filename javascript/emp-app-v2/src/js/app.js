import MyElement from './my-element.js';
import MyElement2 from './my-element2.js';
import {render, directive} from 'https://unpkg.com/lit-html?module';
import {LitElement, html, css} from 'https://unpkg.com/lit-element?module';
//import state from './state.js';

// const content = html`<my-element name='Rajkumar', count=0>
// <p>This is child content....</p>
// </my-element>`;
let state = {
    employees: [{
        id: 1
    }]
};
let name = 'Rajkumar';
let myElement = new MyElement(state);
let myElement2 = new MyElement2(name);

const content1 = html`${myElement.render()}`;
const content2 = html`${myElement2.render()}`;
const content = html`
    ${content1}
    ${content2}
`;
render(content, document.getElementById('myapp'));

console.log('done....   ');
state.employees[0].id = 2
name = 'Archana';
console.log('done....   ');
