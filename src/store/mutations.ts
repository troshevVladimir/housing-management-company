import { MutationTree } from 'vuex'
import { MutationTypes } from './types/mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [MutationTypes.SET_CURRENT_DEVICE](state: S, payload: String): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CURRENT_DEVICE](state, payload: string) {
    state.currentDevice = payload
  },
}