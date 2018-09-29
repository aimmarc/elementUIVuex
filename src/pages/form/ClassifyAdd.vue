<template>
  <div class="modal">
    <el-dialog title="添加分类" :visible.sync="classifyProps.visible" :before-close="onOk" width="500px">
      <div class="form_wrap">
        <el-form :model="classifyProps.addForm" :rules="classifyProps.rules" ref="addForm" label-width="120px">
          <el-form-item label="大分类" prop="classifyName">
            <el-input v-model="classifyProps.addForm.classifyName"></el-input>
          </el-form-item>
          <el-form-item label="小分类" prop="subClassifyName">
            <el-input v-model="classifyProps.addForm.subClassifyName"></el-input>
          </el-form-item>
          <el-form-item label="">
            <div class="add_classify">
              <i class="el-icon-plus"></i> <a>添加小分类</a>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="onOk(0)" class="btn btn_cancel">取 消</div>
        <div type="primary" @click="onOk(1)" class="btn btn_ok">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 大分类新增
  export default {
    name: "ClassifyAdd",
    props: {
      classifyProps: Object,
    },
    methods: {
      onOk(type) {
        if (type == 1) {
          this.classifyProps.onOk(this.$refs.addForm);
        } else {
          this.classifyProps.onCancel(this.$refs.addForm);
        }
      }
    }
  }
</script>

<style scoped>

</style>
