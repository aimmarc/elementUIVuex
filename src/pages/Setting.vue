<template>
  <div class="setting_wrap">
    <div class="main_panel">
      <div class="form_wrap" v-loading="loading">
        <el-form :model="setForm" :rules="rules" ref="setForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="营业状态：" prop="status">
            <el-select v-model="setForm.status" placeholder="请选择营业类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业时间：" prop="servingTime">
            <el-time-picker
              is-range
              v-model="setForm.servingTime"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item label="其它时间：" prop="otherTime">
            <el-input v-model="setForm.otherTime" placeholder="补充节假日或特殊时段营业时间"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn_panel">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 设置
  export default {
    name: "setting",
    data() {
      return {
        loading: false,
        setForm: {
          status: '',
          otherTime: '',
          servingTime: '',
        },
        rules: {
          status: [
            {required: true, message: '请选择营业状态', trigger: 'change'},
          ],
          otherTime: [
            {max: 40, message: '地址长度超出限制', trigger: 'blur'},
          ],
          servingTime: [
            {required: true, message: '请选择营业时间', trigger: 'change'},
          ]
        },
      }
    },
    methods: {
      save() {
        this.$refs.setForm.validate(valid => {
          if (valid) {
            console.log(this.setForm);
            this.loading = true;
            // 此处写请求逻辑
            // request(...)
            setTimeout(() => {
              this.loading = false;
            }, 1000)
          }
        });
      }
    }
  }
</script>

<style scoped lang="less" src="../style/setting.less">

</style>
