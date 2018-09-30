<template>
  <div class="custom_sub_wrap">
    <ul v-loading="loading">
      <li v-for="(item, index) in recordList" :key="index">
        <div class="head">
          <i class="pointer"></i>
          <span class="info">{{item.date}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</span>
        </div>
        <div class="body" v-text="item.note">
        </div>
      </li>
    </ul>
    <div class="toolbar clearfix">
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="onChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  // 顾客记录
  export default {
    name: "CustomRecordSub",
    data() {
      return {
        loading: false,
        recordList: [],
        pageSize: 20,
        total: 0,
        page: 1,
      }
    },
    mounted() {
      this.loadRecordList();
    },
    methods: {
      loadRecordList() {
        this.loading = true;
        let list = [];
        for (let i = 0; i < 5; i++) {
          list.push({
            date: '2018-02-02 11:46',
            name: `${i}店长`,
            note: `该女士喜欢超前时尚一些的，每次来的消费都较多`,
          })
        }
        this.recordList = list;
        this.total = list.length;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      onChange(page) {
        this.page = page;
        this.loadRecordList();
      }
    }
  }
</script>

<style scoped lang="less" src="../style/customRecordSub.less">

</style>
