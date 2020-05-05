'use strict';
import Employee from './components/Employee.js'
export default class App {
    add() {
        console.log('add employee');
    }
    showList(){
        console.log('calling getemployees...');
        let employees = [
            {
                "id": 1,
                "firstName": "Rajkumar",
                "middleName": "...",
                "lastName": "Regunta",
                "createdBy": "sdf",
                "createdOn": "04-05-2020",
                "lastModifiedBy": "sdf",
                "lastModifiedOn": "04-05-2020"
            },
            {
                "id": 2,
                "firstName": "Archana",
                "middleName": "...",
                "lastName": "Regunta",
                "createdBy": "sdf",
                "createdOn": "04-05-2020",
                "lastModifiedBy": "sdf",
                "lastModifiedOn": "04-05-2020"
            }
        ];
        console.log('display emplloyees in table');
        
        let app = $("#myapp");
        let mytable = this.createEmployeesTable(employees);
        app.appendChild(mytable);

    }
    update() {
        console.log('udpate employee');
    }
    delete() {
        this.parentNode.remove();
    }
    call(id){
        console.log(id);
    }

    createEmployeesTable(employees) {
        let table = document.createElement('table');
        table.appendChild(this.createHeader());
        employees.forEach(emp => {
            console.log(emp);
            table.appendChild(this.createRow(emp));
        });
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
    
    createRow(emp) {
        let tr = document.createElement('tr');
        tr.appendChild(this.createCell(emp.id));
        tr.appendChild(this.createCell(emp.firstName));
        tr.appendChild(this.createCell(emp.middleName));
        tr.appendChild(this.createCell(emp.lastName));
        tr.appendChild(this.createCell(emp.createdBy));
        tr.appendChild(this.createCell(emp.createdOn));
        tr.appendChild(this.createCell(emp.lastModifiedBy));
        tr.appendChild(this.createCell(emp.lastModifiedOn));
        let deleteCell = this.createCell("X");
        deleteCell.id = emp.id;
        deleteCell.onclick = this.delete;
        tr.appendChild(deleteCell);
        return tr;
    }

    createFormRow(emp) {
        let tr = document.createElement('tr');
        tr.appendChild(this.createCell(""));
        tr.appendChild(this.createCell(emp.firstName));
        tr.appendChild(this.createCell(emp.middleName));
        tr.appendChild(this.createCell(emp.lastName));
        tr.appendChild(this.createCell(""));
        tr.appendChild(this.createCell(""));
        tr.appendChild(this.createCell(""));
        tr.appendChild(this.createCell(""));
        let deleteCell = this.createCell("X");
        deleteCell.id = emp.id;
        deleteCell.onclick = this.delete;
        tr.appendChild(deleteCell);
        return tr;
    }

    createCell(str){
        let td = document.createElement('td');
        td.innerHTML = str;
        return td;
    }

    createHeaderCell(str){
        let th = document.createElement('th');
        th.innerHTML = str;
        return th;
    }
}

function $(name){
    if(name.startsWith('#')){
        return document.getElementById(name.substring(1))
    }
}

(function (){
    let app = new App();
    //console.log($("#add"));
    //$("#add").onclick = app.add;
    app.showList();
})();

