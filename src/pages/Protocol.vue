<template>
  <div class="protocol_wrap">
    <div class="left_panel">
      <ul class="left_list">
        <li v-bind:class="active == 0 ? 'active' : ''"><a href="#/protocol" @click="active = 0">商家服务协议</a></li>
        <li v-bind:class="active == 1 ? 'active' : ''"><a href="#/protocol/userProtocol" @click="active = 1">用户服务协议</a></li>
        <li v-bind:class="active == 2 ? 'active' : ''"><a href="#/protocol/knowledgeProtocol" @click="active = 2">知识产权声明</a></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Protocol",
    data() {
      return {
        active: 0,
      }
    }
  }
</script>

<style scoped lang="less" src="../style/protocol.less">

</style>
