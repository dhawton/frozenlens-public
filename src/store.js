import Vue from "vue";
import Vuex from "vuex";
import { API, graphqlOperation } from "aws-amplify";
import { ListAlbums } from "./queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
    albums: undefined
  },
  mutations: {
    user: (state, payload) => {
      state.user = payload;
    },
    albums: (state, payload) => {
      state.albums = payload;
    }
  },
  getters: {
    user: state => state.user
  },
  actions: {
    async getAlbums(context) {
      let albums = await API.graphql(graphqlOperation(ListAlbums));
      context.commit("albums", albums);
    }
  }
});
