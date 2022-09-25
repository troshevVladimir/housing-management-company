import { Houses, House } from './model.js'

const housesData = {
    state: () => {
        return {
            houses: [] as Houses,
            error: null
        }
    },
    actions: {
        getAllHouses(ctx: any) {
            return fetch('/api/houses/', {
                method: "GET",
                headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
					'Content-Type': 'application/json; charset=utf-8'
				},
            })
                .then(
                    (res) => {
                        if (res.status === 401) { // TODO: Сейчас при рефреше надо перезагружать страницу
                            fetch('/api/auth/token/?email=admin2@gmail.com')
                                .then(refreshRes => {
                                    return refreshRes.json()
                                })
                                .then(refreshResponse => {
                                    ctx.commit('clear')
                                    localStorage.setItem('token', refreshResponse.token)
                                })
                        }

                        return res.json()
                    }
                ).then(
                    (response) => {

                        if (response.message) {
                            ctx.commit('setError', response.message)
                        }
                        ctx.commit('setHouses', response)
                    }
                )
                .catch((e)=>  {
                    console.log(e);
                })
        }
    },
    mutations: {
        setError(state: any, payload: string) {
            state.error = payload
        },
        setHouses(state: any, payload: House ) {
            state.houses = payload
        },
        setHouse(state: any, payload: House) {
            state.houses.push(payload)
        },
        deleteHouse(state: any, payload: number) {
            state.houses = state.houses.filter((el: House)=> {
                return el.id !== payload
            })
        },
        clear(state: any) {
            state.error = ''
        },
        updateHouse(state: any, payload: House) {
            const id = state.houses.findIndex((el: House) => el.id === payload.id)
            state.houses.splice(id, 1 , payload)
        }
    },
    getters: {
        getError(state: any) {
            return state.error
        },
        getAll(state: any) {
            return state.houses
        },
        getHouse(state: any) {
            return (id: number) => {
                return state.houses.find((el: House) => {
                    return el.id === id
                })
            }
        }
    },
    namespaced: true
}

export default housesData