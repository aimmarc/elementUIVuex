<template>
  <div class="goods_wrap">
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


  // 商品管理
  export default {
    name: "Goods",
    components: {
      Menu,
      Header
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less" src="../style/goods.less">

</style>
