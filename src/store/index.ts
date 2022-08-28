import { createStore } from "vuex";
import { State, state } from './state'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

import housesData from './modules/housesData'

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    housesData
  }
});
