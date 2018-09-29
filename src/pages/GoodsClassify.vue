<template>
  <div class="classify_wrap">
    <div class="toolbar clearfix">
      <el-button type="primary" @click="classifyProps.visible = true"><i class="el-icon-plus"></i>新增分类</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        max-height="600"
        style="width: 100%"
        v-loading="loading"
        @expand-change="expandChange"
      >
        <el-table-column
          type="expand"
          align="center">
          <template slot-scope="props">
            <div class="classify_panel">
              <div class="classify_item" v-for="(item, index) in props.row.subData" :key="index">
                <div class="title" v-text="item.title"></div>
                <div class="sub">{{item.goods}}件商品</div>
              </div>
              <div class="classify_item" @click="formProps.visible = true">
                <div class="add">
                  <i class="el-icon-plus"></i>
                </div>
                <div class="sub text_center">添加小分类</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="classify"
          label="大分类"
          header-align="left"
          align="left">
        </el-table-column>
        <el-table-column
          prop="subClassify"
          label=""
          header-align="center"
          align="right">
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          header-align="center"
          width="410"
          align="center">
          <template slot-scope="props">
            <div class="action_item" @click="upClassify(props.row)">
              <i class="up"></i>
              上移
            </div>
            <div class="action_item">
              <i class="edit"></i>
              修改名称
            </div>
            <div class="action_item" @click="deleteClassify">
              <i class="delete"></i>
              删除大分类
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
    <SubClassifyAdd :formProps="formProps"></SubClassifyAdd>
    <ClassifyAdd :classifyProps="classifyProps"></ClassifyAdd>
  </div>
</template>

<script>
  import SubClassifyAdd from './form/SubClassifyAdd';
  import ClassifyAdd from './form/ClassifyAdd';


  // 商品分类
  export default {
    name: "GoodsClassify",
    components: {
      SubClassifyAdd,
      ClassifyAdd
    },
    data() {
      return {
        loading: false,
        tableData: [],
        page: 1,
        pageSize: 10,
        total: 0,
        formProps: {
          addForm: {
            classifyName: '',
          },
          rules: {
            classifyName: [
              {required: true, message: '请输入小分类名称', trigger: 'blur'},
              {max: 10, message: '标签字数超出限制', trigger: 'blur'},
            ],
          },
          visible: false,
          onCancel: this.onCancel,
          onOk: this.onOk,
          expandIndex: null,
        },
        classifyProps: {
          addForm: {
            classifyName: '',
          },
          rules: {
            classifyName: [
              {required: true, message: '请输入大分类名称', trigger: 'blur'},
              {max: 10, message: '标签字数超出限制', trigger: 'blur'},
            ],
            subClassifyName: [
              {required: true, message: '请输入小分类名称', trigger: 'blur'},
              {max: 10, message: '标签字数超出限制', trigger: 'blur'},
            ],
          },
          visible: false,
          onCancel: this.onClassifyCancel,
          onOk: this.onClassifyOk,
          expandIndex: null,
        }
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /**
       * 加载table数据
       */
      loadTableData() {
        this.loading = true;
        let data = [];
        for (let i = 0; i < 5; i++) {
          data.push({
            index: i,
            classify: `大分类${i}`,
            subClassify: `${i}个小分类，${i}个商品`,
            subData: [],
          });
        }
        this.tableData = data;
        this.total = data.length;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      onChange() {

      },
      /**
       * 上移
       * @param rows
       */
      upClassify(rows) {
        console.log(rows)
      },
      /**
       * 改变table行展开状态
       * @param row
       * @param expandedRows
       */
      expandChange(row, expandedRows) {
        // 此处根据行索引请求后台获取小分类数据，并合并到this.tableData
        let subData = [];
        for (let i = 0; i < 3; i++) {
          subData.push({
            title: `小分类${i}`,
            goods: i,
          });
        }
        this.tableData[row.index].subData = subData;
        this.expandIndex = row.index;
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
            this.tableData[this.expandIndex].subData.push({
              title: this.formProps.addForm.classifyName,
              goods: 0,
            });
            this.formProps.visible = false;
            this.$message.success('小分类添加成功');
            form.resetFields();
          }
        })
      },
      /**
       * 删除大分类
       */
      deleteClassify() {
        // 此处根据this.expandIndex请求后台删除数据
        this.$confirm('此操作将永久删除该大分类, 是否继续?', '提示', {
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
      /**
       *
       * @param form
       */
      onClassifyOk(form) {
        form.validate(valid => {
          if (valid) {
            // 此处写请求逻辑，this.classifyProps.addForm为要存储的数据
            this.classifyProps.visible = false;
            this.$message.success('大分类添加成功');
            form.resetFields();
          }
        })
      },
      /**
       *
       * @param form
       */
      onClassifyCancel(form) {
        this.classifyProps.visible = false;
        form.resetFields();
      },
    },
  }
</script>

<style lang="less" src="../style/goodsClassify.less">

</style>
