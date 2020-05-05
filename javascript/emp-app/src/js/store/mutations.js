export default {
    addEmployee(state, payload) {
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
