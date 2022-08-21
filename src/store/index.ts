import { createStore } from "vuex";
import userData from "./modules/userData";

export const store = createStore({
  state() {
    return {
    };
  },
  mutations: {
  },
  modules: {
    userData
  }
});
