<template>
  <div class="custom_wrap">
    <div class="toolbar clearfix">
      <el-input placeholder="搜索会员名称、手机号、会员卡号" v-model="queryForm.searchKey"></el-input>
      <el-select v-model="queryForm.status" placeholder="请选择状态">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="table">
      <el-table
        stripe
        :data="tableData"
        max-height="600"
        style="width: 100%"
        v-loading="loading"
        @select="onSelect"
        @select-all="onSelectAll"
      >
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="顾客ID"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="classify"
          label="会员类型"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="顾客名称"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="costList"
          label="消费记录"
          align="center"
          header-align="center">
          <template slot-scope="props">
            <a>点击查看</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="chatList"
          label="聊天记录"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="note"
          label="顾客备注"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          header-align="center"
          align="center">
          <template slot-scope="props">
            <div class="action_bar">
              <a class="action_btn" href="#/customRecord">查看详情</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  // 顾客管理
  export default {
    name: "Custom",
    data() {
      return {
        tableData: [],
        loading: false,
        queryForm: {
          searchKey: '',
          status: '',
        },
        statusOptions: [
          {
            label: '全部',
            value: '',
          }, {
            label: '选项1',
            value: '1',
          }, {
            label: '选项2',
            value: '2',
          },
        ],
        selectedRows: [],
        page: 1,
        pageSize: 20,
        total: 0,
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      loadTableData() {
        this.loading = true;
        let data = [];
        for (let i = 0; i < 20; i++) {
          data.push({
            id: `222333444${i}`,
            name: `顾客${i}`,
            classify: `类型${i}`,
            phoneNumber: `15666655553${i}`,
            costList: `记录${i}`,
            chatList: `记录${i}`,
            note: `备注备注备注${i}`,
          });
        }
        this.tableData = data;
        this.total = data.length * 3;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      onSelect(selection, row) {
        this.selectedRows = selection;
      },
      onSelectAll(selection) {
        this.selectedRows = selection;
      },
      onChange(page) {
        this.page = page;
        this.loadTableData();
      }
    }
  }
</script>

<style scoped lang="less" src="../style/custom.less">

</style>
