<template>
  <div class="goods_wrap">
    <div class="toolbar clearfix">
      <el-input v-model="searchKey" placeholder="搜索商品名称、拼音、条码"></el-input>
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
        <el-button type="primary"><i class="el-icon-plus"></i>新增商品</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        stripe
        :data="tableData"
        max-height="600"
        style="width: 100%"
        v-loading="loading"
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
              <el-select v-model="action" placeholder="操作">
                <el-option
                  v-for="item in actionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="toolbar clearfix">
      <div class="checkbox">
        <div class="tick" @click="allCheck">
          <i v-bind:class="checked ? 'icon_tick' : 'hidden icon_tick'"></i>
        </div>
        <span class="auto_login">全选</span>
      </div>
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
  import Menu from '../components/Menu';
  import Header from '../components/Header';


  // 商品管理
  export default {
    name: "Goods",
    components: {
      Menu,
      Header
    },
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
        actionOptions: [
          {
            value: '0',
            label: '上架'
          },
          {
            value: '2',
            label: '下架'
          },
        ],
        tableData: [],
        loading: false,
        checked: false,
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
            name: `第${this.page}页的商品${i}`,
            code: `33333333${i}`,
            classify: `第${this.page}页的商品分类${i}`,
            price: `22${i}`,
            size: `L`,
            sum: `33${i}`,
            unit: `件`,
            imgUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1538122894&di=d00b5992976c4e313356c0a89c6f231e&src=http://scimg.jb51.net/allimg/170211/106-1F21114011EN.jpg',
          });
        }
        this.tableData = data;
        setTimeout(() => {
          this.loading= false;
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
      }
    }
  }
</script>

<style scoped lang="less" src="../style/goods.less">

</style>
