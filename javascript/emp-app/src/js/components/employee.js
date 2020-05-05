import {Component} from '../lib/mylib.js';

export default class Employee extends Component {
    constructor(props){
        super(props);
    }

    createRow(emp, index) {
        let tr = document.createElement('tr');
        tr.appendChild(this.createCell(emp.id));
        let firstNameTd = this.createCell(emp.firstName);
        firstNameTd.onclick = () => {
            console.log('make editable');
            let content = firstNameTd.innerHTML;
            let input = document.createElement('input');
            input.id = `firstName-${index}`;
            input.value = content;
            
            if(firstNameTd.hasChildNodes()){
                firstNameTd.removeChild(firstNameTd.childNodes[0]);
            }
            firstNameTd.appendChild(input);
            input.focus();
            //TODO: disable further clicks  
        }

        tr.appendChild(firstNameTd);
        tr.appendChild(this.createCell(emp.middleName));
        tr.appendChild(this.createCell(emp.lastName));
        tr.appendChild(this.createCell(emp.createdBy));
        tr.appendChild(this.createCell(emp.createdOn));
        tr.appendChild(this.createCell(emp.lastModifiedBy));
        tr.appendChild(this.createCell(emp.lastModifiedOn));
        let deleteCell = this.createCell("X");
        deleteCell.onclick = () => {
            this.props.parentStore.dispatch('removeEmployee', { index });
        }
        
        tr.appendChild(deleteCell);
        return tr;
    }

    createCell(str){
        let td = document.createElement('td');
        td.innerHTML = str;
        return td;
    }
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        // // If there are no items to show, render a little status instead
        // if(this.props.store.state.items.length === 0) {
        //     this.props.element.innerHTML = `<p class="no-items">You've done nothing yet 😢</p>`;
        //     return;
        // }
        
        // // Loop the items and generate a list of elements
        // this.props.element.innerHTML = `
        //     <ul class="app__items">
        //         ${this.props.store.state.items.map(item => {
        //             return `
        //                 <li>${item}<button aria-label="Delete this item">×</button></li>
        //             `
        //         }).join('')}
        //     </ul>
        // `;
        
        // // Find all the buttons in the list and when they are clicked, we dispatch a 
        // // `clearItem` action which we pass the current item's index to
        // this.props.element.querySelectorAll('button').forEach((button, index) => {
        //     button.addEventListener('click', () => {
        //         this.props.store.dispatch('clearItem', { index });
        //     });
        // });
        console.log('load employee: props = ', this.props);
        this.props.parentElement.appendChild(this.createRow(this.props.store.state.employee, this.props.store.state.index));
        //let mytable = this.createEmployeesTable(this.props.store.state.employees);
        //this.props.element.appendChild(mytable);
    }
}