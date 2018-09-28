<template>
  <el-container style="height: 100%">
    <el-aside class="menu_content">
      <Menu :callback="callback"></Menu>
    </el-aside>
    <el-container class="content_container">
      <Header :title="title"></Header>
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
  import {store, ACTION_SET_LOGIN} from '../vuex/store';
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
      }
    },
    mounted() {
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
      this.title = store.state.title;
    },
    methods: {
      /**
       * 切换页面的回调
       */
      callback() {
        this.title = store.state.title;
      }
    }
  }
</script>

<style scoped>

</style>
