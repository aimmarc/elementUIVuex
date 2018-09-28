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
  import {store} from '../vuex/store';

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
