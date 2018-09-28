<template>
  <div class="goodsadd_wrap">
    <div class="navbar">
      <div class="title">新增商品</div>
      <div class="breadcrumb">首页 > 商品管理 > 新增商品</div>
    </div>
    <div class="main_panel">
      <div class="head">
        <div v-bind:class="activeTab == '0' ? 'item active' : 'item'" @click="toRoute('0')">
          普通商品
          <i class="line"></i>
        </div>
        <div v-bind:class="activeTab == '1' ? 'item active' : 'item'" @click="toRoute('1')">
          批量导入
          <i class="line"></i>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  // 新增商品
  export default {
    name: "GoodsAdd",
    data() {
      return {
        activeTab: '0',
      }
    },
    methods: {
      toRoute(type) {
        this.activeTab = type;
        if (type == '1') {
          this.$router.replace('/goodsAdd/goodsImport');
        } else {
          this.$router.replace('/goodsAdd');
        }
      }
    }
  }
</script>

<style scoped lang="less" src="../style/goodsAdd.less">

</style>
