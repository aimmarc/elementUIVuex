<template>
  <div class="history_active_wrap">
    <ul>
      <li v-for="(item, index) in activeList" :key="index">
        <div class="left">
          <div class="date" v-text="item.date"></div>
          <div class="title" v-text="item.title"></div>
          <div class="content" v-text="item.content">
          </div>
        </div>
        <div class="right">
          销售额：<span class="money" v-text="item.money"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  // 历史活动
  export default {
    name: "HistoryActive",
    data() {
      return {
        activeList: [],
      }
    },
    mounted() {
      this.loadActive();
    },
    methods: {
      loadActive() {
        let data = [];
        for (let i = 0; i < 3; i++) {
          data.push({
            date: `2018-6-01 至 201-6-20`,
            title: `SEVEN7周年庆优惠大促 - 满200减50`,
            content: `本店周年庆优惠活动期间，购买1000元以上赠送红酒一瓶，送完为止`,
            money: `890002${i}`,
          });
        }
        this.activeList = data;
      }
    }
  }
</script>

<style scoped lang="less" src="../style/historyActive.less">

</style>
