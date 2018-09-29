<template>
  <el-container style="height: 100%">
    <el-aside class="menu_content">
      <Menu :menuProps="menuProps"></Menu>
    </el-aside>
    <el-container class="content_container">
      <Header :title="title" :headerTabs="headerTabs"></Header>
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
  import {store, ACTION_SET_TITLE, ACTION_SET_LOGIN} from '../vuex/store';
  import {menuData} from "../constant/menuData";
  import {setStorage, getStorage} from "../util/common";
  import {ACTIVE_MENU} from '../constant/storage';
  import {getHeaders} from "../util/request";

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
      this.title = store.state.title;
      this.headerTabs = store.state.headerTabs;
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
      this.getDefault();
    },
    methods: {
      /**
       * 设置激活菜单
       */
      setDefault(index, title, href) {
        store.dispatch(ACTION_SET_TITLE, title);
        this.title = store.state.title;
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

      },
      toLogin() {
        store.state.loginStatus = 0;
      }
    }
  }
</script>

<style scoped>

</style>
