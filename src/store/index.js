import { createStore } from "vuex";
import userData from "./modules/userData";

const store = createStore({
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

export default store;
