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
import NewsCenter from '../pages/NewsCenter';
import Problem from '../pages/Problem';
import GoodsAdd from '../pages/GoodsAdd';
import GoodsDefault from '../pages/GoodsDefault';
import GoodsImport from '../pages/GoodsImport';
import GoodsClassify from '../pages/GoodsClassify';
import Staff from '../pages/Staff';
import Custom from '../pages/Custom';
import CustomRecord from '../pages/CustomRecord';
import CustomRecordSub from '../pages/CustomRecordSub';
import CustomRecordHistory from '../pages/CustomRecordHistory';
import Income from '../pages/Income';


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
    children: []
  }, {
    path: '/goodsAdd',
    name: 'GoodsAdd',
    component: GoodsAdd,
    children: [
      {
        path: '/',
        name: 'GoodsDefault',
        component: GoodsDefault,
      }, {
        path: '/goodsAdd/goodsImport',
        name: 'GoodsImport',
        component: GoodsImport,
      }
    ]
  }, {
    path: '/goodsClassify',
    name: 'GoodsClassify',
    component: GoodsClassify,
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
  }, {
    path: '/newsCenter',
    name: 'NewsCenter',
    component: NewsCenter,
  }, {
    path: '/problem',
    name: 'Problem',
    component: Problem,
  }, {
    path: '/staff',
    name: 'Staff',
    component: Staff,
  }, {
    path: '/custom',
    name: 'Custom',
    component: Custom,
  }, {
    path: '/customRecord',
    name: 'CustomRecord',
    component: CustomRecord,
    children: [
      {
        path: '/',
        name: 'CustomRecordSub',
        component: CustomRecordSub,
      }, {
        path: '/customRecord/customRecordHistory',
        name: 'CustomRecordHistory',
        component: CustomRecordHistory,
      },
    ]
  }, {
    path: '/income',
    name: 'Income',
    component: Income,
  }
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
