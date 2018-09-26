import Vue from 'vue';
import Vuex from 'vuex'
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import './style/base.less';
import './style/theme/theme.scss';


Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(Vuex);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
