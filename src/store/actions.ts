import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { ActionTypes } from './types/action-types'
import { MutationTypes } from './types/mutation-types'
import { Mutations } from './mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.DEFINE_CURRENT_DIVICE](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<String>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.DEFINE_CURRENT_DIVICE]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(MutationTypes.SET_CURRENT_DEVICE, 'desktop')
        resolve('desktop')
      }, 500)
    })
  },
}