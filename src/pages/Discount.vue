<template>
  <div class="discount_wrap">
    <div class="form_wrap">
      <el-form :model="discountForm" :rules="rules" ref="discountForm" label-width="120px" class="demo-ruleForm">
        <div class="form_item_one">
          <el-form-item label="活动名称" prop="name" >
            <el-input v-model="discountForm.name" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" prop="time">
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
        </div>
        <div class="form_item_two">
          <el-form-item label="折扣设置" prop="discount">
            <el-select v-model="discountForm.discount" placeholder="请选择营业类型">
              <el-option label="满减优惠" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-form-item label="" prop="target">
                <i class="icon_man"></i>
                <el-input v-model="discountForm.target" placeholder="请输入金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="50px" prop="forSell">
                <i class="icon_jian"></i>
                <el-input v-model="discountForm.forSell" placeholder="请输入金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form_item_there">
          <el-form-item label="活动详情" prop="disc" >
            <el-input v-model="discountForm.disc" placeholder="请输入活动详情" type="textarea" :rows="7"></el-input>
          </el-form-item>
        </div>
        <div class="form_item_two">
          <el-form-item label="活动状态" prop="status" >
            <el-select v-model="discountForm.status" placeholder="请选择活动状态">
              <el-option label="无活动" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="btn_panel">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
        </div>
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
          target: '',
          forSell: '',
          disc: '',
          status: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {max: 20, message: '活动名称长度超出限制', trigger: 'blur'},
          ],
          time: '',
          discount:  [
            {required: true, message: '请选择折扣', trigger: 'change'},
          ],
          target: [],
          forSell: [],
          disc:  [
            {required: true, message: '请输入活动详情', trigger: 'blur'},
            {max: 200, message: '活动详情长度超出限制', trigger: 'blur'},
          ],
          status: [
            {required: true, message: '请选择活动状态', trigger: 'change'},
          ],
        },
        pickOptions: {
          onPick: this.onPick,
        },
      }
    },
    methods: {
      onPick(time) {
        console.log(time);
      },
      save() {
        this.$refs.discountForm.validate(valid => {
          if (valid) {
            console.log(this.discountForm);
          }
        });
      }
    }
  }
</script>

<style lang="less" src="../style/discount.less">

</style>
