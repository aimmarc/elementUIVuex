<template>
  <div class="header_wrap">
    <el-header style="height: 79px">
      <div class="left" v-text="title"></div>
      <span v-if="loginStatus == 1">
        <el-badge :value="12" class="item">
        <i class="message"></i>
      </el-badge>
      <el-badge :value="12" class="item">
        <i class="tips"></i>
      </el-badge>
      <div class="user_panel">
        <div class="user_item">
          <a href="">李店员</a>
        </div>
        <div class="user_item">
          <a href="#/login" @click="logout">退出</a>
        </div>
      </div>
      </span>
    </el-header>
  </div>

</template>

<script>
  import {store, ACTION_SET_LOGIN} from "../vuex/store";


  // 导航栏
  export default {
    name: "Header",
    data() {
      return {
        loginStatus: 0,
      }
    },
    props: {
      title: String,
    },
    mounted() {
      this.loginStatus = store.state.loginStatus;
    },
    methods: {
      logout() {
        store.dispatch(ACTION_SET_LOGIN, 0); // 设置登录状态为0
      }
    }
  }
</script>

<style lang="less" src="./style/header.less">

</style>
