export default {
    addEmployee(context, payload) {
        context.commit('addEmployee', payload);
    },
    updateEmployee(context, payload) {
        context.commit('updateEmployee', payload);
    },
    removeEmployee(context, payload) {
        context.commit('removeEmployee', payload);
    }
};
