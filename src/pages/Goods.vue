<template>
  <div class="goods_wrap">
    <div class="toolbar clearfix">
      <div class="search_input">
        <el-input v-model="searchKey" placeholder="搜索商品名称、拼音、条码"></el-input>
        <i class="search_btn"></i>
      </div>
      <el-select v-model="classify" placeholder="请选择类别">
        <el-option
          v-for="item in classifyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="classify" placeholder="请选择状态">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="right_panel">
        <el-button @click="deleteGoods">删除</el-button>
        <a href="#/goodsAdd"><el-button type="primary"><i class="el-icon-plus"></i>新增商品</el-button></a>
      </div>
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
          prop="date"
          label="商品图片"
          header-align="center"
          align="center"
          width="180">
          <template slot-scope="scope">
            <div class="img_box">
              <img :src="scope.row.imgUrl" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="code"
          align="center"
          header-align="center"
          label="商品条码">
        </el-table-column>
        <el-table-column
          prop="classify"
          label="商品分类"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          header-align="center"
          label="商品价格">
        </el-table-column>
        <el-table-column
          prop="size"
          label="商品规格"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="sum"
          align="center"
          header-align="center"
          label="库存">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="action"
          align="center"
          header-align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="action">
              <el-dropdown @command="onAction">
                <span class="el-dropdown-link">
                  {{actionOptions[scope.row.action]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{
                    action: '0',
                    row: scope.row,
                  }">上架
                  </el-dropdown-item>
                  <el-dropdown-item :command="{
                    action: '1',
                    row: scope.row,
                  }">下架
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  // 商品管理
  export default {
    name: "Goods",
    data() {
      return {
        searchKey: '',
        classify: '0',
        action: '0',
        total: 50,
        page: 1,
        pageSize: 20,
        classifyOptions: [
          {
            value: '0',
            label: '全部分类'
          }
        ],
        statusOptions: [
          {
            value: '0',
            label: '已上架'
          }
        ],
        actionOptions: {
          0: '上架',
          1: '下架'
        },
        tableData: [],
        loading: false,
        checked: false,
        selectedRows: [],
      }
    },
    mounted() {
      this.loadTableList();
    },
    methods: {
      /**
       * 加载table数据
       */
      loadTableList() {
        this.loading = true;
        let data = [];
        // 此处写request
        // request(...)
        for (let i = 0; i < 20; i++) {
          data.push({
            action: '0',
            name: `第${this.page}页的商品${i}`,
            code: `33333333${i}`,
            classify: `第${this.page}页的商品分类${i}`,
            price: `22${i}`,
            size: `L`,
            sum: `33${i}`,
            unit: `件`,
            imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1538138473&di=614a2a3f7a935e0238c51e2ad67a257a&src=http://pic.58pic.com/58pic/11/20/44/27C58PIC4Nh.jpg',
          });
        }
        this.tableData = data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      /**
       * 翻页事件
       * @param page
       */
      onChange(page) {
        this.page = page;
        this.loadTableList();
      },
      allCheck() {
        this.checked = !this.checked;
      },
      onAction(value) {
        console.log(value);
        // 此处写处理操作响应的请求逻辑，value.action为响应类型，可自行规定值，value.row为当前操作的行，用于请求接口
        // request(...)
        this.$message.success('操作成功!');
      },
      /**
       * 删除商品
       */
      deleteGoods() {
        if (this.selectedRows == '') {
          this.$message.error('请选择要删除的商品');
          return;
        }
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 此处根据this.selectedRows请求后台删除数据
          // request(...)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onSelect(selection, row) {
        this.selectedRows = selection;
      },
      onSelectAll(selection) {
        this.selectedRows = selection;
      }
    }
  }
</script>

<style scoped lang="less" src="../style/goods.less">

</style>
