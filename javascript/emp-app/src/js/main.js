import store from './store/index.js'; 

// Load up components
import EmployeeList from './components/employee-list.js';

function $(name){
    if(name.startsWith('#')){
        return document.getElementById(name.substring(1))
    }
}

// Load up some DOM elements
const app = $("#myapp");

// Add a submit event listener to the form and prevent it from posting back
// formElement.addEventListener('submit', evt => {
//     evt.preventDefault();
    
//     // Grab the text value of the textbox and trim any whitespace off it
//     let value = inputElement.value.trim();
    
//     // If there's some content, trigger the action and clear the field, ready for the next item
//     if(value.length) {
//         store.dispatch('addItem', value);
//         inputElement.value = '';
//         inputElement.focus();
//     }
// });

// Instantiate components
;
const employeeList = new EmployeeList({
    store,
    element: app
});

// Initial renders
employeeList.render();
