<template>
  <div class="sale_wrap">
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
    <div id="echarts" class="echarts"></div>
  </div>
</template>

<script>
  import {parseDate} from "../util/common";
  import echarts from 'echarts';


  // 销售统计
  export default {
    name: "Sale",
    data() {
      return {
        tabIndex: '0',
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
              type: 'bar',
              itemStyle: {
                color: '#EC6941',
              },
              barWidth: 26,
            },
            {
              name: '毛利润',
              data: [820, 932, 901, 445, 4446, 2223, 998, 66, 3890, 4102, 3780, 4110, 2990, 4560, 3456],
              type: 'bar',
              itemStyle: {
                color: '#F6B37F',
              },
              barWidth: 26,
            },
          ]
        }
      }
    },
    mounted() {
      this.loadEcharts();
    },
    methods: {
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
      doQuery() {

      },
      /**
       * 加载图表
       */
      loadEcharts() {
        //  初始图表
        let myChart = echarts.init(document.getElementById('echarts'));
        // 柱状图
        myChart.setOption(this.option);
        // 自适应窗口变化
        window.onresize = function () {
          myChart.resize();
        };
      }
    }
  }
</script>

<style scoped lang="less" src="../style/sale.less">

</style>
