<template>
  <div class="income_wrap" v-loading="loading">
    <div class="toolbar">
      <div class="tab_bar">
        <div v-bind:class="tabIndex == '0' ? 'tab_item active' : 'tab_item'" @click="changeTabs('0')">今天</div>
        <div v-bind:class="tabIndex == '1' ? 'tab_item active' : 'tab_item'" @click="changeTabs('1')">最近七天</div>
        <div v-bind:class="tabIndex == '2' ? 'tab_item active' : 'tab_item'" @click="changeTabs('2')">本月</div>
      </div>
      <el-date-picker
        v-model="queryForm.date"
        size="mini"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickOptions"
      >
      </el-date-picker>
      <el-button size="mini" type="primary" @click="doQuery">查询</el-button>
    </div>
    <div class="card_panel clearfix">
      <div class="card">
        <div class="total item">
          <div class="title">收益总额</div>
          <div class="body">
            <span class="symbol">￥</span>
            <span class="number">4599</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="gross item">
          <div class="title">毛利润</div>
          <div class="body">
            <span class="symbol">￥</span>
            <span class="number">4599</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="return item">
          <div class="title">退款金额</div>
          <div class="body">
            <span class="symbol">￥</span>
            <span class="number">4599</span>
          </div>
        </div>
      </div>
    </div>
    <div class="charts" id="charts"></div>
    <div class="table">
      <el-table
        stripe
        :data="tableData"
        max-height="600"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="时间"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="way"
          label="交易方式"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="num"
          label="销售数量"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="money"
          label="交易金额"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="returnMoney"
          label="退换货金额"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="transfer"
          label="平台让利"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="income"
          label="收益金额"
          header-align="center"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="cost"
          label="商品成本"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="gross"
          label="毛利润"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="action"
          align="center"
          header-align="center"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <div class="action">
              <a class="action_btn" @click="toDetail(scope.row)">查看详情</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {parseDate} from "../util/common";
  import echarts from 'echarts';


  // 收入管理
  export default {
    name: "Income",
    data() {
      return {
        loading: false,
        tableData: [],
        tabIndex: 1,
        queryForm: {
          date: '',
          max: '',
          min: '',
        },
        pickOptions: {
          onPick: this.onPick,
        },
        option: {
          grid: {
            left: 60,
            right: 20,
            top: 40,
            bottom: 80,
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'],  // 这是刻度，需组装成现有格式
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#ccc',
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}k'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#ccc',
              }
            }
          },
          series: [
            {
              name: '收益总额',
              data: [820, 932, 901, 934, 1290, 1330, 1320, 4000, 3890, 4102, 3780, 4110, 2990, 4560, 3456],  // 这是柱状图数据，请求成功后需组装成现有格式
              type: 'line',
              itemStyle: {
                color: '#2CBF83',
              },
              barWidth: 10,
            },
            {
              name: '毛利润',
              data: [820, 932, 901, 445, 4446, 2223, 998, 66, 3890, 4102, 3780, 4110, 2990, 4560, 3456],
              type: 'line',
              itemStyle: {
                color: '#F89A47',
              },
              barWidth: 10,
            },
            {
              name: '退款金额',
              data: [820, 932, 3, 6, 1290, 1330, 1320, 4000, 8, 4102, 3780, 4110, 5, 4560, 3456],
              type: 'line',
              itemStyle: {
                color: '#478CE2',
              },
              barWidth: 10,
            }
          ]
        }
      }
    },
    mounted() {
      this.loadIncomeData();
      this.loadCharts();
    },
    methods: {
      loadIncomeData() {
        this.loading = true;
        let data = [];
        for (let i = 0; i < 3; i++) {
          data.push({
            date: '2018/08/23 16:35',
            way: '到店支付',
            num: i,
            money: `334${i}`,
            returnMoney: `889${i}`,
            transfer: `889${i}`,
            income: `889${i}`,
            cost: `889${i}`,
            gross: `889${i}`,
          });
        }
        this.tableData = data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      /**
       * 切换tabs
       * @param type
       */
      changeTabs(type) {
        this.tabIndex = type;
      },
      /**
       * 选中日期
       * @param date
       */
      onPick(date) {
        this.queryForm.max = parseDate(date.maxDate);
        this.queryForm.min = parseDate(date.minDate);
      },
      /**
       * 查询
       */
      doQuery() {
        this.loadIncomeData();
      },
      loadCharts() {
        //  初始图表
        let myChart = echarts.init(document.getElementById('charts'));
        // 柱状图
        myChart.setOption(this.option);
        // 自适应窗口变化
        window.onresize = function () {
          myChart.resize();
        };
      },
      /**
       * 查看详情
       * @param record
       */
      toDetail(record) {
        this.$router.push('/incomeDetail');
      }
    }
  }
</script>

<style scoped lang="less" src="../style/income.less">

</style>
