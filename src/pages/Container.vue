<template>
  <el-container style="height: 100%">
    <el-aside class="menu_content">
      <Menu :menuProps="menuProps"></Menu>
    </el-aside>
    <el-container class="content_container">
      <Header :headerProps="headerProps"></Header>
      <el-main class="main_content">
        <!--页面组件标签-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from '../components/Menu';
  import Header from '../components/Header';
  import {store, ACTION_SET_TITLE, ACTION_SET_LOGIN, ACTION_SET_HEADERTABS} from '../vuex/store';
  import {menuData} from "../constant/menuData";
  import {setStorage, getStorage} from "../util/common";
  import {ACTIVE_MENU} from '../constant/storage';
  import {getHeaders, clearHeaders} from "../util/request";
  import {REGEXP_HEADER} from "../constant/regexp";


  // 根容器
  export default {
    name: "Container",
    components: {
      Menu,
      Header,
    },
    data() {
      return {
        title: '',
        headerTabs: false,
        headerProps: {
          title: '',
          headerTabs: false,
          loginStatus: '',
          logout: this.logout,
          activeTab: '0',
          changeTabs: this.changeTabs,
          tabsValue: [
            {
              text: '商品管理',
              url: '#/goods',
            }, {
              text: '分类管理',
              url: '#/goodsClassify',
            },
          ]
        },
        menuProps: {
          openList: ['1'],
          openType: true,
          defaultActive: '0',
          menuData: menuData, // 菜单信息可以配到数据库，后端抽取数据的时候组装成相应格式即可正确显示
          loginStatus: store.state.loginStatus,
          setDefault: this.setDefault,
          toLogin: this.toLogin,
        }
      }
    },
    mounted() {
      this.headerProps.title = store.state.title;
      this.headerProps.headerTabs = store.state.headerTabs;
      if (getHeaders() == null) {
        if (this.$route.path.indexOf('/protocol') < 0) {
          this.$router.push('/login');
        }
        return;
      }
      if (getHeaders().loginStatus != 1) {
        store.dispatch(ACTION_SET_LOGIN, 0);
      } else {
        store.dispatch(ACTION_SET_LOGIN, 1);
      }
      if (this.$route.path.indexOf('/protocol') < 0) {
        // 判断是否登录
        if (store.state.loginStatus === 0) {
          this.$router.push('/login');
          return;
        }
      }
      this.menuProps.loginStatus = store.state.loginStatus;
      this.headerProps.loginStatus = store.state.loginStatus;
      this.getDefault();
    },
    methods: {
      /**
       * 设置激活菜单
       */
      setDefault(index, title, href) {
        store.dispatch(ACTION_SET_TITLE, title);
        this.headerProps.title = store.state.title;
        if (href.indexOf('/protocol') < 0) {
          // 判断是否登录
          if (store.state.loginStatus == 0 || store.state.loginStatus == undefined) {
            this.$router.push('/login');
            return;
          }
        }
        this.$router.push(href);
        this.menuProps.defaultActive = index;
        setStorage(ACTIVE_MENU, index);
        this.setHeaderTabs(title);
      },
      /**
       * 获取激活菜单
       */
      getDefault() {
        let active = getStorage(ACTIVE_MENU);
        if (active == undefined) {
          return;
        }
        this.menuProps.faultActive = active;
      },
      /**
       * 退出登录
       */
      logout() {
        store.dispatch(ACTION_SET_LOGIN, 0); // 设置登录状态为0
        clearHeaders();
      },
      /**
       * 跳转到登录页
       */
      toLogin() {
        store.state.loginStatus = 0;
      },
      /**
       * 设置headerTabs是否显示
       */
      setHeaderTabs(title) {
        if (REGEXP_HEADER.test(title)) {
          store.dispatch(ACTION_SET_HEADERTABS, true);
          if (title == '折扣活动') {
            this.headerProps.tabsValue = [
              {
                text: '当前活动',
                url: '#/discount',
              }, {
                text: '历史活动',
                url: '#/HistoryActive',
              },
            ]
          } else {
            this.headerProps.tabsValue = [
              {
                text: '商品管理',
                url: '#/goods',
              }, {
                text: '分类管理',
                url: '#/goodsClassify',
              },
            ]
          }
          this.headerProps.headerTabs = store.state.headerTabs;
        } else {
          store.dispatch(ACTION_SET_HEADERTABS, false);
          this.headerProps.headerTabs = store.state.headerTabs;
        }
      },
      changeTabs(type) {
        this.headerProps.activeTab = type;
      }
    }
  }
</script>

<style scoped>

</style>
