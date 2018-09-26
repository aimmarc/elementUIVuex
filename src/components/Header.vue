<template>
  <div class="header_wrap">
    <el-header style="height: 79px">
      <div class="left" v-text="title"></div>
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
          <a href="">退出</a>
        </div>
      </div>
    </el-header>
  </div>

</template>

<script>
  import {store} from '../vuex/store';


  // 导航栏
  export default {
    name: "Header",
    data() {
      return {
        title: '首页',
      }
    },
    mounted() {
      this.title = store.state.title;
      console.log(store.state.title)
    }
  }
</script>

<style lang="less" src="./style/header.less">

</style>
