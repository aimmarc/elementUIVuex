<template>
  <div class="shop_wrap">
    <el-container style="height: 100%">
      <el-aside class="menu_content">
        <Menu></Menu>
      </el-aside>
      <el-container class="content_container">
        <Header></Header>
        <el-main class="main_content">
          <!--页面组件标签-->

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Menu from '../components/Menu';
  import Header from '../components/Header';


  // 我的店铺
  export default {
    name: "Shop",
    components: {
      Menu,
      Header
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less" src="../style/shop.less">

</style>
