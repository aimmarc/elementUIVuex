import Vue from 'vue';
import Router from 'vue-router';
import Container from '../pages/Container';
import Index from '../pages/Index';
import Goods from '../pages/Goods';
import Shop from '../pages/Shop';
import Login from '../pages/Login';
import MerchantEntry from '../pages/MerchantEntry';
import Submission from '../pages/Submission';
import Setting from '../pages/Setting';
import Protocol from '../pages/Protocol';
import SellerProtocol from '../pages/SellerProtocol';
import UserProtocol from '../pages/UserProtocol';
import KnowledgeProtocol from '../pages/KnowledgeProtocol';


Vue.use(Router);

// 嵌套路由
const Route = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  }, {
    path: '/goods',
    name: 'Goods',
    component: Goods,
  }, {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  }, {
    path: '/setting',
    name: 'Setting',
    component: Setting,
  }, {
    path: '/protocol',
    name: 'Protocol',
    component: Protocol,
    children: [
      {
        path: '/protocol',
        name: 'SellerProtocol',
        component: SellerProtocol,
      }, {
        path: '/protocol/userProtocol',
        name: 'UserProtocol',
        component: UserProtocol,
      }, {
        path: '/protocol/knowledgeProtocol',
        name: 'KnowledgeProtocol',
        component: KnowledgeProtocol,
      }
    ]
  },
];

// 基本路由
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container,
      children: Route,
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/merchantEntry',
      name: 'MerchantEntry',
      component: MerchantEntry,
    }, {
      path: '/submission',
      name: 'Submission',
      component: Submission,
    },
  ]
})
