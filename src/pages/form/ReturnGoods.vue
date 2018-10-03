<template>
  <div class="modal return_goods">
    <el-dialog title="添加分类" :visible.sync="formProps.visible" :before-close="onOk" width="500px">
      <div class="goods_info">
        <div class="img">
          <img src="../../images/goods.png" alt="">
        </div>
        <div class="main"></div>
      </div>
      <div class="form_wrap">
        <el-form :model="formProps.returnForm" :rules="formProps.rules" ref="returnForm" label-width="120px">
          <el-form-item label="大分类" prop="classifyName">
            <el-input v-model="formProps.returnForm.classifyName"></el-input>
          </el-form-item>
          <el-form-item label="小分类" prop="subClassifyName">
            <el-input v-model="formProps.returnForm.subClassifyName"></el-input>
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
        <div type="primary" @click="onOk(1)" class="btn btn_ok">立即退货</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 退货
  export default {
    name: "ReturnGoods",
    props: {
      formProps: Object,
    },
    methods: {
      onOk(type) {
        if (type == 1) {
          this.formProps.onOk(this.$refs.returnForm);
        } else {
          this.formProps.onCancel(this.$refs.returnForm);
        }
      }
    }
  }
</script>

<style lang="less" src="../../style/returnGoods.less">

</style>
