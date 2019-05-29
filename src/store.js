import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined
  },
  mutations: {
    user: (state, payload) => {
      state.user = payload;
    }
  },
  getters: {
    user: state => state.user
  }
});
