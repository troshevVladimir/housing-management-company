import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  getCurrentDevice(state: State): string
  getUserName(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
  getCurrentDevice: (state) => {
    return state.currentDevice
  },

  getUserName: (state) => {
    return state.userName
  },
}