<template>
  <div class="income_detail_wrap">
    <div class="navbar">
      <div class="title">销售单号：{{orderNo}}</div>
      <div class="breadcrumb"><a href="#/">首页</a> > <a href="#/income">收益统计</a> > 销售详情</div>
    </div>
    <div class="main_panel">
      <div class="table_border">
        <el-table
          :data="tableData"
          max-height="600"
          style="width: 100%"
          v-loading="loading"
          :span-method="arraySpanMethod"
          border
        >
          <el-table-column
            prop="goodsInfo"
            label="商品信息"
            align="left"
            width="350px"
            header-align="center">
            <template slot-scope="scope">
              <div class="goodsInfo clearfix">
                <div class="goodsImg">
                  <img src="../images/goods.png" alt="">
                </div>
                <div class="right">
                  <div class="title" v-text="scope.row.goodsInfo.title"></div>
                  <div class="body">颜色： {{scope.row.goodsInfo.color}} 尺码： {{scope.row.goodsInfo.size}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            align="center"
            header-align="center">
            <template slot-scope="scope">
              <div class="price">
                <span>￥</span>
                <span v-text="scope.row.price"></span>
                <a class="action_btn" @click="formProps.visible = true">退货</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="total"
            label="支付总额"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="income"
            label="收益金额"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="gross"
            label="毛利润"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="custom"
            label="顾客信息"
            align="center"
            header-align="center">
            <template slot-scope="scope">
              <div>ID:{{scope.row.custom}}</div>
              <el-button type="primary">查看详情</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="other"
            label="其他"
            align="left"
            header-align="center">
            <template slot-scope="scope">
              <div>销售：{{scope.row.other.seller}}</div>
              <div>备注：{{scope.row.other.note}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <ReturnGoods :form-props="formProps"></ReturnGoods>
  </div>
</template>


<script>
  import ReturnGoods from './form/ReturnGoods';


  // 收益详情
  export default {
    name: "IncomeDetail",
    components: {
      ReturnGoods
    },
    data() {
      return {
        loading: false,
        tableData: [],
        orderNo: `11444555667`,
        formProps: {
          visible: false,
          returnForm: {

          },
          rules: {

          },
          onCancel: this.onCancel,
          onOk: this.onOk,
        }
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      loadTableData() {
        let data = [];
        for (let i = 0; i < 2; i++) {
          data.push({
            goodsInfo: {
              title: `【风尚价】商品商品商品商品商品${i}`,
              url: `../images/goods.png`,
              color: `白色`,
              size: `L`,
            },
            num: i,
            price: `223${i}`,
            total: `448${i}`,
            income: `448${i}`,
            gross: `339${i}`,
            custom: `2009990${i}`,
            other: {
              seller: '李销售',
              note: '备注备注备注'
            }
          })
        }
        this.tableData = data;
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex !== 0 && columnIndex !== 1 && columnIndex !== 2) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      onCancel(form) {
        form.resetFields();
        this.formProps.visible = false;
      },
      /**
       * 确认添加
       */
      onOk(form) {
        form.validate(valid => {
          if (valid) {
            // this.tableData[this.expandIndex].subData.push({
            //   title: this.formProps.addForm.classifyName,
            //   goods: 0,
            // });
            this.formProps.visible = false;
            this.$message.success('小分类添加成功');
            form.resetFields();
          }
        })
      },
    }
  }
</script>

<style scoped lang="less" src="../style/incomeDetail.less">

</style>
