<template>
  <div class="index_wrap">

    <!--页面组件标签-->
    <div class="panel" v-loading="loading">
      <div class="tool_bar clearfix">
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
        <div class="right_panel">
          <label>总销售量：</label><span v-text="totalNum" class="number"></span>，
          <label>总销售额：</label><span v-text="totalMoney" class="number"></span>
        </div>
      </div>
      <div class="charts" id="charts1"></div>
    </div>
    <div class="panel" v-loading="loading">
      <div class="tool_bar clearfix">
        <div class="left">
          <label>关注量：</label><span v-text="follow" class="number"></span>
        </div>
        <div class="right_panel">
          <span v-text="visit" class="number"></span><label>来过</label>&nbsp;&nbsp;
          <label>新增关注</label><span v-text="followAdd" class="number"></span>&nbsp;&nbsp;
          <label>取消关注</label><span v-text="cancelFollow" class="number"></span>
        </div>
      </div>
      <div class="charts" id="charts2"></div>
    </div>
  </div>
</template>

<script>
  import Menu from '../components/Menu';
  import Header from '../components/Header';
  import echarts from 'echarts';
  import {parseDate} from '../util/common'


  // 首页
  export default {
    name: "index",
    components: {
      Menu,
      Header
    },
    data() {
      return {
        page: 1,
        queryForm: {
          max: '',
          min: '',
        },
        totalNum: 700,
        totalMoney: 40000.00,
        follow: 3220,
        visit: 150,
        followAdd: 10,
        cancelFollow: 1,
        pickOptions: {
          onPick: this.onPick,
        },
        loading: false,
        tabIndex: '0',
        option: {
          grid: {
            left: 60,
            right: 20,
            top: 40,
            bottom: 40,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
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
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320, 4000, 3890, 4102, 3780, 4110, 2990, 4560, 3456],  // 这是折线图数据，请求成功后需组装成现有格式
            type: 'line',
            itemStyle: {
              color: '#478CE2'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#478CE2'
              }, {
                offset: 0.5,
                color: '#478CE2'
              }, {
                offset: 1,
                color: 'rgba(71,140,226,.09)'
              }])
            },
            smooth: true,
          }]
        },
        option2: {
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
          legend: {
            data: ['取消关注', '访问', '新增关注'],
            bottom: 0,
            itemWidth: 14,
            borderRadius: 0,
            itemGap: 60,
            textStyle: {
              fontSize: 14,
              color: '#222',
            }
          },
          series: [
            {
              name: '取消关注',
              data: [820, 932, 901, 934, 1290, 1330, 1320, 4000, 3890, 4102, 3780, 4110, 2990, 4560, 3456],  // 这是柱状图数据，请求成功后需组装成现有格式
              type: 'bar',
              itemStyle: {
                color: '#B5B5B5',
              },
              barWidth: 10,
            },
            {
              name: '访问',
              data: [820, 932, 901, 934, 1290, 1330, 1320, 4000, 3890, 4102, 3780, 4110, 2990, 4560, 3456],
              type: 'bar',
              itemStyle: {
                color: '#F6B37F',
              },
              barWidth: 10,
            },
            {
              name: '新增关注',
              data: [820, 932, 901, 934, 1290, 1330, 1320, 4000, 3890, 4102, 3780, 4110, 2990, 4560, 3456],
              type: 'bar',
              itemStyle: {
                color: '#84CCC9',
              },
              barWidth: 10,
            }
          ]
        }
      }
    },
    mounted() {
      this.loadCharts();
    },
    methods: {
      /**
       * 加载图表
       */
      loadCharts() {
        //  初始图表
        let myChart = echarts.init(document.getElementById('charts1'));
        let myChart2 = echarts.init(document.getElementById('charts2'));
        //  折线图配置项
        myChart.setOption(this.option);
        // 柱状图
        myChart2.setOption(this.option2);
        // 自适应窗口变化
        window.onresize = function () {
          myChart.resize();
          myChart2.resize();
        };
      },
      /**
       * 选中日期
       * @param max
       * @param min
       */
      onPick(date) {
        this.max = parseDate(date.maxDate);
        this.min = parseDate(date.minDate);
      },
      /**
       * 查询
       */
      doQuery() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      },
      /**
       * 切换tabs
       * @param index
       */
      changeTabs(index) {
        this.tabIndex = index;
        this.doQuery();
      }
    }
  }
</script>

<style lang="less" src="../style/index.less">

</style>
