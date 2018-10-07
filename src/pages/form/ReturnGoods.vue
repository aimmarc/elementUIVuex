<template>
  <div class="modal return_goods">
    <el-dialog title="退货" :visible.sync="formProps.visible" :before-close="onOk" width="500px">
      <div class="goods_info">
        <div class="img">
          <img src="../../images/goods.png" alt="">
        </div>
        <div class="main">
          <div class="title">【风尚价】A21女装新款吊带连衣裙女2018时尚休闲个性学生连衣裙</div>
          <div class="price">￥899</div>
        </div>
        <div class="right">
          <i class="reduce" @click="formProps.plus(1)"></i>
          <span v-text="formProps.num"></span>
          <i class="plus" @click="formProps.plus(2)"></i>
        </div>
      </div>
      <div class="money_panel">
        <div class="left">退款金额：</div>
        <div class="right">￥899</div>
      </div>
      <div class="form_wrap">
        <el-form label-position="left" :model="formProps.returnForm" :rules="formProps.rules" ref="returnForm" label-width="100px">
          <el-form-item label="退款原因：" prop="reason">
            <el-select v-model="formProps.returnForm.reason" placeholder="请选择退款原因">
              <el-option label="原因" value="shanghai"></el-option>
              <el-option label="原因" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款备注：" prop="note">
            <el-input v-model="formProps.returnForm.note"></el-input>
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
