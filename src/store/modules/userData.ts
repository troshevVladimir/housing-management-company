const userData = {
    state: () => ({
        userName: "my name"
    }),
    getters: {
        userName (state) {
            return state.userName
        }
    },
    namespaced: true
}

export default userData