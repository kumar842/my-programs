export default {
    addEmployee(state, payload) {
        /** add id as the last element's id + 1 **/
        payload.id = state.employees[state.employees.length - 1].id + 1;
        state.employees.push(payload);    
        return state;
    },
    updateEmployee(state, payload, index) {
        state.employees[index] = payload;
        //state.employees.push(payload);    
        return state;
    },
    removeEmployee(state, payload) {
        state.employees.splice(payload.index, 1);
        return state;
    }
};
