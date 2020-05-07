import actions from './store/actions.js';
import mutations from './store/mutations.js';
import state from './store/state.js';
import {$, Store} from './lib/mylib.js';

// Load up components
import EmployeeList from './components/employee-list.js';

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

const store = new Store({
    actions,
    mutations,
    state
});

// Instantiate components
const employeeList = new EmployeeList({
    store,
    element: $("myapp")
});

// Initial renders
employeeList.render();
