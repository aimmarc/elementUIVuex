<template>
  <div class="custom_record_wrap">
    <div class="navbar">
      <div class="title">用户名</div>
      <div class="breadcrumb"><a href="#/">首页</a> > <a href="#/custom">顾客管理</a> > 顾客详情</div>
    </div>
    <div class="main_panel">
      <div class="head">
        <div v-bind:class="activeTab == '0' ? 'item active' : 'item'" @click="toRoute('0')">
          顾客记录
          <i class="line"></i>
        </div>
        <div v-bind:class="activeTab == '1' ? 'item active' : 'item'" @click="toRoute('1')">
          历史消费
          <i class="line"></i>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  // 顾客记录主体
  export default {
    name: "CustomRecord",
    data() {
      return {
        activeTab: '0',
      }
    },
    methods: {
      toRoute(type) {
        this.activeTab = type;
        if (type == '1') {
          this.$router.replace('/customRecord/customRecordHistory');
        } else {
          this.$router.replace('/customRecord');
        }
      }
    }
  }
</script>

<style scoped lang="less" src="../style/customRecord.less">

</style>
