import {Component, $, $s} from '../lib/mylib.js';
import Employee from './employee.js';

export default class EmployeeList extends Component {
    // Pass our store instance and the HTML element up to the parent Component
    constructor(props) {
        super(props);
    }

    addEmployee = () => {
        let self = this;
        const payload = {
            firstName: $('firstName').value || "",
            middleName: $('middleName').value || "",
            lastName: $('lastName').value || "",
            createdOn: "16/05/2020",
            createdBy: 'Rajkumar'
        }
        self.props.store.dispatch('addEmployee', payload);
    }

    removeEmployee = (index) => {
        let self = this;
        return () => self.props.store.dispatch('removeEmployee', { index });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        const self = this;
        console.log('loading list of employees : self.props = ', self.props);

        const element = self.props.element;
        const employees = self.props.store.state.employees;

        const headerRow = `<tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>CreatedBy</th>
                            <th>Created On</th>
                            <th>Last Modified By</th>
                            <th>Last Modified On</th>
                            <th>Action</th>
                    </tr>`;
        element.innerHTML = `<table>${headerRow}</table>`;

        /** add each row for each employee **/
        const tableElement = element.childNodes[0];
        employees.forEach((employee, index) => {
            let employeeComponent = new Employee({
                store: {
                    state: {employee, index}
                },
                element: tableElement,
                parentStore: self.props.store
            });
            employeeComponent.render();
        });

        /** add form row **/
        const addCellId = `td-add`;
        const formRow = `<tr>
                        <td></td>
                        <td><input type="text" id="firstName"></input></td>
                        <td><input type="text" id="middleName"></input></td>
                        <td><input type="text" id="lastName"></input></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td id="${addCellId}">✓</td>
                    </tr>`;
        tableElement.innerHTML += formRow;

        /** add onclick event for addEmployee **/
        const addCell = $(addCellId);
        addCell.onclick = self.addEmployee;

        /** add onclick event for removeEmployee **/
        let ls = $s('deleterow');
        for(let i = 0; i < ls.length; i++){
            ls[i].onclick = self.removeEmployee(i);
        }
    }
};
