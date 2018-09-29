<template>
  <div class="menu_wrap">
    <div class="logo">
      <span class="title">衣质街</span>
      <span class="sub_title">后台管理</span>
    </div>
    <div class="shop_panel" v-if="menuProps.loginStatus != 0">
      <div class="header">
        <i class="header_icon"></i>
        <div class="rest">休息中</div>
      </div>
      <div class="shop_name">Massimo Dutti高端女装</div>
      <el-button type="primary" size="mini" v-on:click="menuProps.setDefault('', '我的店铺', '/shop')">我的店铺</el-button>
    </div>
    <div class="shop_not_login" v-if="menuProps.loginStatus == 0">
      <div class="header">
        <i class="header_icon_not_login"></i>
      </div>
      <div class="shop_name_not_login">您还未登录噢~</div>
      <a href="#/login">
        <el-button type="primary" size="mini" @click="menuProps.toLogin">去登录</el-button>
      </a>
    </div>
    <el-menu
      :unique-opened="menuProps.openType"
      background-color="#1A232F"
      text-color="#B8C4D4"
      active-text-color="#fff"
      :default-openeds="menuProps.openList"
      :default-active="menuProps.defaultActive"
    >
      <div class="index">
        <el-menu-item index="0" v-on:click="menuProps.setDefault('0', '首页', '/')"><i class="icon_home"></i>首页
        </el-menu-item>
      </div>
      <!--组装菜单-->
      <el-submenu
        v-for="(item, index) in menuProps.menuData"
        :key="index"
        :index="item.index">
        <template slot="title">{{item.text}}</template>
        <el-menu-item
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          :index="subItem.index"
          v-on:click="menuProps.setDefault(subItem.index, subItem.text, subItem.url)">
          <i v-bind:class="subItem.icon + ' icon_default'"></i>
          {{subItem.text}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  // 菜单
  export default {
    name: "Menu",
    data() {
      return {}
    },
    props: {
      menuProps: Object,
    },
  }
</script>

<style lang="less" src="./style/menu.less">

</style>
