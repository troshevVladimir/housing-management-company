import { Houses, House } from './model.js'

const housesData = {
    state: () => {
        return {
            houses: [] as Houses
        }
    },
    actions: {
        getAllHouses(ctx: any) {
            return fetch('/api/houses/')
                .then(
                    (res) => {
                        return res.json()
                    }
                ).then(
                    (response) => {
                        ctx.commit('setHouses', response)
                    }
                )
        }
    },
    mutations: {
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
        updateHouse(state: any, payload: House) {
            console.log();
            const id = state.houses.findIndex((el: House) => el.id === payload.id)
            state.houses.splice(id, 1 , payload)
        }
    },
    getters: {
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