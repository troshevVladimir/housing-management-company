import { User } from './model.js'

const userData = {
    state: () => {
        return {
            user: {} as User
        }
    },
    actions: {

    },
    mutations: {
        setUser(state: any, payload: User) {
            state.user = payload
        },
        clearUser(state: any) {
            state.user = {}
        }
    },
    getters: {
        getUser(state: any) {
            return state.user
        }
    },
    namespaced: true
}

export default userData