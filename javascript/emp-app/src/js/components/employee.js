import {Component, $} from '../lib/mylib.js';

export default class Employee extends Component {
    constructor(props){
        super(props);
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        const self = this;
        console.log('load employee: props = ', self.props);
        const index = self.props.store.state.index;
        const emp = self.props.store.state.employee;
        const row = `<tr>
                <td>${emp.id}</td>
                <td>${emp.firstName}</td>
                <td>${emp.middleName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.createdBy || ""}</td>
                <td>${emp.createdOn || ""}</td>
                <td>${emp.lastModifiedBy || ""}</td>
                <td>${emp.lastModifiedOn || ""}</td>
                <td class="deleterow" id="${index}">X</td>
            </tr>`;

        self.props.element.innerHTML += row;
    }
}