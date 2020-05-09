export default class UserCard extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = 'user-card loaded';
    }
}
customElements.define('user-card', UserCard);