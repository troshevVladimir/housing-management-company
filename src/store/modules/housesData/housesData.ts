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
        setHouse(state: any, payload: House ) {
            state.houses.push(payload)
        },
    },
    getters: {
        getAll(state: any) {
            return state.houses
        }
    },
    namespaced: true
}

export default housesData