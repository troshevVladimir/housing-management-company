import { Houses } from './model'

const housesData = {
    state: () => {
        return {
            houses: [
                {
                    id: 1,
                    address: 'address',
                    tenants: 2,
                    livers: 3,
                },
                {
                    id: 2,
                    address: '123address',
                    tenants: 53,
                    livers: 123,
                }
            ] as Houses
        }
    },
    getters: {
        address(state: any) {
            return state.houses
        }
    },
    namespaced: true
}

export default housesData