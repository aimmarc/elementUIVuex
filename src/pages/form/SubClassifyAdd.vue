<template>
  <el-dialog title="添加小分类" :visible.sync="formProps.visible" :before-close="onOk" width="500px">
    <div class="form_wrap">
      <el-form :model="formProps.addForm" :rules="formProps.rules" ref="addForm" label-width="120px">
        <el-form-item label="小分类名称" prop="classifyName">
          <el-input v-model="formProps.addForm.classifyName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onOk(0)">取 消</el-button>
      <el-button type="primary" @click="onOk(1)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // 新增小分类
  export default {
    name: "SubClassifyAdd",
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
