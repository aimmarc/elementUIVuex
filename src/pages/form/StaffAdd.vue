<template>
  <div class="modal">
    <el-dialog :title="formProps.title" :visible.sync="formProps.visible" :before-close="onOk" width="500px">
      <div class="form_wrap">
        <el-form :model="formProps.addForm" :rules="formProps.rules" ref="addForm" label-width="120px" :label-position="formProps.left">
          <el-form-item label="员工姓名：" prop="name">
            <el-input v-model="formProps.addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="job">
            <el-input v-model="formProps.addForm.job"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phoneNumber">
            <el-input v-model="formProps.addForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="权限类型：" prop="power">
            <el-select v-model="formProps.addForm.power" placeholder="请选择权限类型">
              <el-option label="权限一" value="shanghai"></el-option>
              <el-option label="权限二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="onOk" class="btn btn_cancel">取 消</div>
        <div type="primary" @click="onOk(1)" class="btn btn_ok">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 员工新增
  export default {
    name: "StaffAdd",
    props: {
      formProps: Object,
    },
    methods: {
      onOk(type) {
        if (type == 1) {
          this.formProps.onOk(this.$refs.addForm);
        } else {
          this.formProps.onCancel(this.$refs.addForm);
        }
      }
    }
  }
</script>

<style scoped>

</style>
