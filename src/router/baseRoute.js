import Vue from 'vue';
import Router from 'vue-router';
import Index from '../pages/Index';
import Goods from '../pages/Goods';
import Shop from '../pages/Shop';
import Login from '../pages/Login';
import MerchantEntry from '../pages/MerchantEntry';
import Submission from '../pages/Submission';
import Setting from '../pages/Setting';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
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
    },{
      path: '/merchantEntry',
      name: 'MerchantEntry',
      component: MerchantEntry,
    },{
      path: '/submission',
      name: 'Submission',
      component: Submission,
    },{
      path: '/setting',
      name: 'Setting',
      component: Setting,
    },
  ]
});
