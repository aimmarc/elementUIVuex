import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export const ACTION_SET_LOGIN = 'setLogin';
export const ACTION_SET_TITLE = 'setTitle';

export const store = new Vuex.Store({
  state: {
    title: '首页',
    loginStatus: 0, // 0未登录，1已登录
  },
  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
    setLogin(state, status) {
      state.loginStatus = status;
    }
  },
  actions: {
    // 设置header标题
    setTitle (context, title) {
      context.commit('setTitle', title);
    },
    // 设置登录状态
    setLogin (context, status) {
      context.commit('setLogin', status);
    }
  },
});
