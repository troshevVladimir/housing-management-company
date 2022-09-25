import { User, Users, UserData } from './model.js';
import jwt_decode from "jwt-decode";


const userData = {
    state: () => {
        return {
            error: null,
            user: {
                name: '',
                role: ''
            } as User,
            users: [] as Users,
            userRoles: []
        }
    },
    actions: {
        initUserFromStor(ctx: any) {
            ctx.commit('housesData/clear', null, {root: true})
            const token = localStorage.getItem('token')

            if (!token) return

            const decoded = jwt_decode(token)

            ctx.commit('setUser', decoded)
        },
        getUsers(ctx: any) {
            const token = localStorage.getItem('token')
            const auth = token ? 'Bearer ' + token : ''

            return fetch(`/api/getusers/`, {
				method: 'GET',
				headers: {
					'Authorization': auth,
				},
			})
				.then((resp) => {
					return resp.json()
				})
				.then((response) => {
                    ctx.commit('setUsers', response)
                    return
				})
				.catch((e) => {
					console.error(e)
				})
        },
        getRoles(ctx: any) {
            const token = localStorage.getItem('token')
            const auth = token ? 'Bearer ' + token : ''
            return fetch(`/api/getusers/getUserRoles`, {
				method: 'GET',
				headers: {
					'Authorization': auth,
				},
			})
				.then((resp) => {
					return resp.json()
				})
                .then((response) => {
                    if (response.message) {
                        ctx.commit('setError', response.message)
                    }
					ctx.commit('setUserRoles', response)
				})
				.catch((e) => {
					console.error(e)
				})
        }
    },
    mutations: {
        setError(state: any, payload: string) {
            state.error = payload
        },
        setUser(state: any, payload: UserData) {
            state.user.name = payload.userName
            state.user.role = payload.role
            state.user.id = payload.id
        },
        setUsers(state: any, payload: UserData) {
            state.users = payload
        },
        setUserRoles(state: any, payload: UserData) {
            state.userRoles = payload
        },
        clearUser(state: any) {
            state.user = {}
            state.error = ''
            state.users = [] as Users
            state.userRoles = []
        },
    },
    getters: {
        getError(state: any) {
            return state.error
        },
        getUser(state: any) {
            return state.user
        },
        getUsers(state: any) {
            return state.users
        },
        getUserRoles(state: any) {
            return state.userRoles
        }
    },
    namespaced: true
}

export default userData