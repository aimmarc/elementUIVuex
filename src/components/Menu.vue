<template>
  <div class="menu_wrap">
    <div class="logo">
      <span class="title">衣质街</span>
      <span class="sub_title">后台管理</span>
    </div>
    <div class="shop_panel" v-if="loginStatus != 0">
      <div class="header">
        <i class="header_icon"></i>
        <div class="rest">休息中</div>
      </div>
      <div class="shop_name">Massimo Dutti高端女装</div>
      <el-button type="primary" size="mini" v-on:click="setDefault('', '我的店铺', '/shop')">我的店铺</el-button>
    </div>
    <div class="shop_not_login" v-if="loginStatus == 0">
      <div class="header">
        <i class="header_icon_not_login"></i>
      </div>
      <div class="shop_name_not_login">您还未登录噢~</div>
      <a href="#/login">
        <el-button type="primary" size="mini" @click="toLogin">去登录</el-button>
      </a>
    </div>
    <el-menu
      :unique-opened="openType"
      background-color="#1A232F"
      text-color="#B8C4D4"
      active-text-color="#fff"
      :default-openeds="openList"
      :default-active="defaultActive"
    >
      <div class="index">
        <el-menu-item index="0" v-on:click="setDefault('0', '首页', '/')"><i class="icon_home"></i>首页</el-menu-item>
      </div>
      <!--组装菜单-->
      <el-submenu
        v-for="(item, index) in menuData"
        :key="index"
        :index="item.index">
        <template slot="title">{{item.text}}</template>
        <el-menu-item
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          :index="subItem.index"
          v-on:click="setDefault(subItem.index, subItem.text, subItem.url)">
          <i v-bind:class="subItem.icon + ' icon_default'"></i>
          {{subItem.text}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {setStorage, getStorage} from '../util/common';
  import {ACTIVE_MENU} from '../constant/storage';
  import {store, ACTION_SET_TITLE, ACTION_SET_LOGIN} from '../vuex/store';
  import {menuData} from "../constant/menuData";
  import {getHeaders} from "../util/request";

  export default {
    name: "Menu",
    data() {
      return {
        openList: ['1'],
        openType: true,
        defaultActive: '0',
        menuData: menuData, // 菜单信息可以配到数据库，后端抽取数据的时候组装成相应格式即可正确显示
        loginStatus: store.state.loginStatus,
      }
    },
    props: {
      callback: Function,
    },
    mounted() {
      if (getHeaders().loginStatus != 1) {
        store.dispatch(ACTION_SET_LOGIN, 0);
      } else {
        store.dispatch(ACTION_SET_LOGIN, 1);
      }
      if (this.$route.path.indexOf('/protocol') < 0) {
        // 判断是否登录
        if (store.state.loginStatus === 0) {
          this.$router.push('/login');
          return;
        }
      }
      this.loginStatus = store.state.loginStatus;
      console.log(this.loginStatus)
      this.getDefault();
    },
    methods: {
      /**
       * 获取激活菜单
       */
      getDefault() {
        let active = getStorage(ACTIVE_MENU);
        if (active == undefined) {
          return;
        }
        this.defaultActive = active;
      },
      /**
       * 设置激活菜单
       */
      setDefault(index, title, href) {
        store.dispatch(ACTION_SET_TITLE, title);
        this.callback();
        if (href.indexOf('/protocol') < 0) {
          // 判断是否登录
          if (store.state.loginStatus == 0) {
            this.$router.push('/login');
            return;
          }
        }
        this.$router.push(href);
        this.defaultActive = index;
        setStorage(ACTIVE_MENU, index);
      },
      toLogin() {
        store.state.loginStatus = 0;
      }
    }
  }
</script>

<style lang="less" src="./style/menu.less">

</style>
