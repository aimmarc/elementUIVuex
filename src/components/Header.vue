<template>
  <div class="header_wrap">
    <el-header style="height: 79px">
      <div class="left" v-text="headerProps.title" v-if="!headerProps.headerTabs"></div>
      <div class="header_tabs" v-if="headerProps.headerTabs">
        <div class="head">
          <a v-bind:href="headerProps.tabsValue[0].url">
            <div v-bind:class="headerProps.activeTab == '0' ? 'item active' : 'item'"
                 @click="headerProps.changeTabs('0')">
              {{headerProps.tabsValue[0].text}}
              <i class="line"></i>
            </div>
          </a>
          <a v-bind:href="headerProps.tabsValue[1].url">
            <div v-bind:class="headerProps.activeTab == '1' ? 'item active' : 'item'"
                 @click="headerProps.changeTabs('1')">
              {{headerProps.tabsValue[1].text}}
              <i class="line"></i>
            </div>
          </a>
        </div>
      </div>
      <span v-if="headerProps.loginStatus == 1">
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
          <a href="#/login" @click="headerProps.logout">退出</a>
        </div>
      </div>
      </span>
    </el-header>
  </div>
</template>

<script>
  // 导航栏
  export default {
    name: "Header",
    props: {
      headerProps: Object,
    },
  }
</script>

<style lang="less" src="./style/header.less">

</style>
