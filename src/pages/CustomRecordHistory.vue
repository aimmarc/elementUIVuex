<template>
  <div class="custom_history_wrap">
    <ul>
      <li v-for="(item, index) in historyList" :key="index">
        <div class="head">
          <span class="title" v-text="item.type"></span>
          <span class="date" v-text="item.date"></span>
        </div>
        <div class="body">
          <div class="left">
            <div class="goods_item">
              <img src="../images/goods.png" alt="">
            </div>
            <div class="goods_item">
              <img src="../images/goods.png" alt="">
            </div>
          </div>
          <div class="right">
            共<span class="number" v-text="item.number"></span>
            件商品 &nbsp;&nbsp; 交易金额
            <span class="money_symbol">￥</span>
            <span class="money" v-text="item.money">5099</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  // 历史记录
  export default {
    name: "CustomRecordHistory",
    data() {
      return {
        historyList: []
      }
    },
    mounted() {
      this.loadHistory();
    },
    methods: {
      loadHistory() {
        let data = [];
        for (let i = 0; i < 3; i++) {
          data.push({
            type: `到店支付`,
            date: `2018/08/22  17:06`,
            number: 4,
            money: 5099,
          });
          this.historyList = data;
        }
      }
    }
  }
</script>

<style scoped lang="less" src="../style/customHistory.less">

</style>
