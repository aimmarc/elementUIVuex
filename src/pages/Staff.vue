<template>
  <div class="staff_wrap">
    <div class="toolbar clearfix">
      <el-button type="primary" @click="editStaff(1)"><i class="el-icon-plus"></i>添加员工</el-button>
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
          prop="index"
          label="员工序号"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="员工姓名"
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
          prop="job"
          label="职位"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="power"
          label="权限类型"
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
              <a class="action_btn" @click="editStaff(props.row)">编辑</a>
              <span class="split"></span>
              <a v-bind:class="props.row.status == 1 ? 'error action_btn' : 'success action_btn'"
                 @click="actionStaff(props.row, props.row.status)">{{props.row.status == '1' ? '禁用 ' : '启用'}}</a>
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
    <StaffAdd :form-props="formProps"></StaffAdd>
  </div>
</template>

<script>
  import StaffAdd from './form/StaffAdd';
  import {REGEXP_PHONE} from "../constant/regexp";


  // 员工管理
  export default {
    name: "Staff",
    components: {
      StaffAdd
    },
    data() {
      return {
        loading: false,
        formProps: {
          title: '添加员工',
          addForm: {
            name: '',
            job: '',
            phoneNumber: '',
            power: '',
          },
          rules: {
            name: [
              {required: true, message: '请输入员工姓名', trigger: 'blur'},
              {max: 20, message: '员工姓名长度超出限制', trigger: 'blur'},
            ],
            job: [
              {required: true, message: '请输入职位', trigger: 'blur'},
              {max: 20, message: '职位长度超出限制', trigger: 'blur'},
            ],
            phoneNumber: [
              {required: true, message: '请输入手机号', trigger: 'blur'},
              {
                validator(rule, value, callback) {
                  if (!REGEXP_PHONE.test(value)) {
                    return callback(new Error('手机号格式不正确'));
                  }
                  callback();
                }
              },
            ],
            power: [
              {required: true, message: '请输入权限类型', trigger: 'change'},
            ],
          },
          visible: false,
          onOk: this.onOk,
          onCancel: this.onCancel,
          left: 'left',
        },
        tableData: [],
        page: 1,
        pageSize: 20,
        total: 0,
        addType: 1,
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
            index: i,
            name: `员工${i}`,
            phoneNumber: `1356662222${i}`,
            job: `职位${i}`,
            power: `营业员`,
            status: '0',
          });
        }
        this.tableData = data;
        this.total = data.length; // 此处应为服务器返回数据
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
        this.loadTableData();
      },
      /**
       * 操作
       * @param row
       * @param type
       */
      actionStaff(row, type) {
        // 根据row, type请求数据库进行启用、禁用操作
        console.log(type);
      },
      /**
       *
       * @param form
       */
      onOk(form) {
        if (form) {
          form.validate(valid => {
            if (valid) {
              console.log(this.formProps.addForm);
              // 此处写请求后台逻辑
              this.formProps.visible = false;
              this.loadTableData();
              if (this.addType == 2) {
                this.$message.success('员工修改成功');
              }
              if (this.addType == 1) {
                this.$message.success('员工添加成功');
              }
              form.resetFields();
            }
          })
        } else {
          this.formProps.visible = false;
        }
      },
      onCancel(form) {
        form.resetFields();
        this.formProps.visible = false;
      },
      /**
       * 编辑
       */
      editStaff(row) {
        this.formProps.visible = true;
        if (row != 1) {
          this.formProps.title = '编辑员工';
          this.formProps.addForm = {...this.formProps.addForm, ...row};
          this.addType = 2;
        } else {
          this.formProps.title = '添加员工';
          this.addType = 1;
        }
      }
    },

  }
</script>

<style scoped lang="less" src="../style/staff.less">

</style>
