const template = document.createElement('template');
template.innerHTML = `
    <style>
        h3 {
            color: coral;
        }
    </style>
    <div class="user-card">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email"></p>
                <p><slot name="phone"></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;
export default class UserCard extends HTMLElement {
    constructor(){
        super();
        this.showInfo = true;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
        // this.innerHTML = `<style>h3 {color: coral}</style><h3>${this.getAttribute('name')}</h3>`;
    }

    toggleInfo(){
        console.log(123);
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}
customElements.define('user-card', UserCard); 