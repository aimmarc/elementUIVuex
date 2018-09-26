import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    title: '首页',
  },
  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
    getTitle(state) {
      return state.title;
    }
  },
  actions: {
    setTitle (context, title) {
      context.commit('setTitle', title);
    },
    getTitle (context) {
      context.commit('getTitle');
    }
  },
});
