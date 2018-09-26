import Vue from 'vue';
import Router from 'vue-router';
import Index from '../pages/Index';
import Goods from '../pages/Goods';
import Shop from '../pages/Shop';
import Login from '../pages/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },{
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },{
      path: '/shop',
      name: 'Shop',
      component: Shop,
    },{
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ]
})
