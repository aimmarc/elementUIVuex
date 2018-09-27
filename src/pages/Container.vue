<template>
  <el-container style="height: 100%">
    <el-aside class="menu_content">
      <Menu></Menu>
    </el-aside>
    <el-container class="content_container">
      <Header></Header>
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


  export default {
    name: "Container",
    components: {
      Menu,
      Header,
    },
  }
</script>

<style scoped>

</style>
