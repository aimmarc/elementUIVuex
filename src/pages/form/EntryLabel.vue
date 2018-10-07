<template>
  <div class="modal">
    <el-dialog title="添加标签" :visible.sync="formProps.visible" :before-close="formProps.onCancel" width="500px">
      <div class="form_wrap">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
          <el-form-item label="活动名称" prop="labelName">
            <el-input v-model="addForm.labelName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="onBindCancel" class="btn btn_cancel">取 消</div>
        <div type="primary" @click="onBindOk" class="btn btn_ok">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 添加商户入驻标签
  export default {
    name: "EntryLabel",
    data() {
      return {
        addForm: {
          labelName: '',
        },
        rules: {
          labelName: [
            {required: true, message: '请输入标签名称', trigger: 'blur'},
            {max: 5, message: '标签字数超出限制', trigger: 'blur'},
          ],
        },
      }
    },
    props: {
      formProps: Object,
    },
    mounted() {
    },
    methods: {
      onBindCancel() {
        this.formProps.onCancel(this.$refs.addForm);
      },
      onBindOk() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.formProps.onOk(this.addForm, this.$refs.addForm);
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
