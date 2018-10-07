<template>
  <div class="discount_wrap">
    <div class="form_wrap">
      <el-form :model="discountForm" :rules="rules" ref="discountForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="discountForm.name" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：" prop="shopClass">
          <el-date-picker
            v-model="discountForm.time"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="折扣设置：" prop="shopClass">
          <el-select v-model="discountForm.discount" placeholder="请选择营业类型">
            <el-option label="满减优惠" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="平台售价：" prop="platPrice">
              <el-input v-model="discountForm.platPrice" placeholder="请输入平台售价"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="折扣：" prop="forSell">
              <el-input v-model="discountForm.forSell" placeholder="请输入折扣"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  // 折扣活动
  export default {
    name: "Discount",
    data() {
      return {
        discountForm: {
          name: '',
          time: '',
          discount: '',
        },
        rules: {},
        pickOptions: {
          onPick: this.onPick,
        }
      }
    },
    methods: {
      onPick() {

      }
    }
  }
</script>

<style lang="less" src="../style/discount.less">

</style>
