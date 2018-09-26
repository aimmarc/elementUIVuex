<template>
  <div class="menu_wrap">
    <div class="logo">
      <span class="title">衣质街</span>
      <span class="sub_title">后台管理</span>
    </div>
    <div class="shop_panel">
      <div class="header">
        <i class="header_icon"></i>
        <div class="rest">休息中</div>
      </div>
      <div class="shop_name">Massimo Dutti高端女装</div>
      <a href="#/shop">
        <el-button type="primary" size="mini" v-on:click="setDefault('', '我的店铺')">我的店铺</el-button>
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
        <a href="#/">
          <el-menu-item index="0" v-on:click="setDefault('0', '首页')"><i class="icon_home"></i>首页</el-menu-item>
        </a>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <span>管理</span>
        </template>
        <a href="#/goods">
          <el-menu-item index="1-1" v-on:click="setDefault('1-1', '商品管理')"><i class="icon_goods icon_default"></i>商品管理
          </el-menu-item>
        </a>
        <el-menu-item index="1-2"><i class="icon_user icon_default" v-on:click="setDefault('1-2', '顾客管理')"></i>顾客管理
        </el-menu-item>
        <el-menu-item index="1-3"><i class="icon_users icon_default" v-on:click="setDefault('1-3', '员工管理')"></i>员工管理
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>分析</span>
        </template>
        <el-menu-item index="2-1"><i class="icon_income icon_default" v-on:click="setDefault('2-1', '收益统计')"></i>收益统计
        </el-menu-item>
        <el-menu-item index="2-2"><i class="icon_sales icon_default" v-on:click="setDefault('2-2', '销售统计')"></i>销售统计
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">营销</template>
        <el-menu-item index="3-1"><i class="icon_discounts icon_default" v-on:click="setDefault('3-1', '折扣活动')"></i>折扣活动
        </el-menu-item>
        <el-menu-item index="3-2"><i class="icon_plat icon_default" v-on:click="setDefault('3-2', '平台协议')"></i>平台协议
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">其他</template>
        <el-menu-item index="4-1"><i class="icon_msg icon_default" v-on:click="setDefault('4-1', '消息中心')"></i>消息中心
        </el-menu-item>
        <el-menu-item index="4-2"><i class="icon_help icon_default" v-on:click="setDefault('4-2', '常见问题')"></i>常见问题
        </el-menu-item>
        <el-menu-item index="4-3"><i class="icon_setting icon_default" v-on:click="setDefault('4-3', '设置')"></i>设置
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {setStorage, getStorage} from '../util/common';
  import {ACTIVE_MENU} from '../constant/storage';
  import {store} from '../vuex/store';

  export default {
    name: "Menu",
    data() {
      return {
        openList: ['1'],
        openType: true,
        defaultActive: '0',
      }
    },
    mounted() {
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
      setDefault(index, title) {
        store.dispatch('setTitle', title);
        if (getStorage(ACTIVE_MENU) == index) {
          return;
        }
        this.defaultActive = index;
        setStorage(ACTIVE_MENU, index);
      }
    }
  }
</script>

<style lang="less" src="./style/menu.less">

</style>
