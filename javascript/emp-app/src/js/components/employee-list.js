import {Component} from '../lib/mylib.js';
import Employee from './employee.js';

export default class EmployeeList extends Component {
    // Pass our store instance and the HTML element up to the parent Component
    constructor(props) {
        super(props);
    }

    createEmployeesTable(employees) {
        let table = document.createElement('table');
        table.appendChild(this.createHeader());
        employees.forEach((employee, index) => {
            //console.log(employee);
            let employeeComponent = new Employee({
                store: {
                    state: {employee, index}
                },
                element: '',
                parentElement: table,
                parentStore: this.props.store
            });
            employeeComponent.render();
        });
        table.appendChild(this.createFormRow());
        //console.log(table);
        return table;
    }

    createHeader() {
        let tr = document.createElement('tr');
        tr.appendChild(this.createHeaderCell("Id"));
        tr.appendChild(this.createHeaderCell("Frist Name"));
        tr.appendChild(this.createHeaderCell("Middle Name"));
        tr.appendChild(this.createHeaderCell("Last Name"));
        tr.appendChild(this.createHeaderCell("Created By"));
        tr.appendChild(this.createHeaderCell("Created On"));
        tr.appendChild(this.createHeaderCell("Last Modified By"));
        tr.appendChild(this.createHeaderCell("Last Modified On"));
        tr.appendChild(this.createHeaderCell(""));
        return tr;
    }
    
    createFormRow() {
        let tr = document.createElement('tr');
        tr.appendChild(this.createFormCell("", true));
        let firstNameTd = this.createFormCell("firstName")
        tr.appendChild(firstNameTd);
        tr.appendChild(this.createFormCell("middleName"));
        tr.appendChild(this.createFormCell("lastName"));
        tr.appendChild(this.createFormCell('createdBy', true));
        tr.appendChild(this.createFormCell("createdOn", true));
        tr.appendChild(this.createFormCell("lastModifiedBy", true));
        tr.appendChild(this.createFormCell("lastModifiedOn", true));
        let addCell = this.createCell("✓");
        addCell.onclick = () => {
            let emp = {
                id: 3,
                firstName: firstNameTd.childNodes[0].value
            }
            this.props.store.dispatch('addEmployee', emp);
        }
        
        tr.appendChild(addCell);
        return tr;
    }

    createCell(str){
        let td = document.createElement('td');
        td.innerHTML = str;
        return td;
    }

    createFormCell(str, isReadOnly){
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.id = str;
        input.readOnly = isReadOnly || false;
        td.appendChild(input);
        return td;
    }

    createHeaderCell(str){
        let th = document.createElement('th');
        th.innerHTML = str;
        return th;
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        console.log('loading list of employees : this.props = ', this.props);
        
        const element = this.props.element;
        let mytable = this.createEmployeesTable(this.props.store.state.employees);
        if(element.hasChildNodes()){
            element.removeChild(element.childNodes[0]);
        }
        element.appendChild(mytable);
    }
};
