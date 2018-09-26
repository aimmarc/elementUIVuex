<template>
  <div class="merchant_wrap">
    <div class="banner">
      <Logo></Logo>
    </div>
    <div class="container">
      <ul class="steps clearfix">
        <li>提交审核
          <div class="badge">1</div>
        </li>
        <li>实地考察
          <div class="badge">2</div>
        </li>
        <li>审核通过
          <div class="badge">3</div>
        </li>
        <li>入驻成功
          <div class="badge">4</div>
        </li>
      </ul>
      <div class="form_wrap">
        <div class="entry_form_panel">
          <div class="head"></div>
          <div class="body">
            <el-form :model="entryForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="店铺名称：" prop="name">
                <el-input v-model="entryForm.name" placeholder="请输入店铺名称"></el-input>
              </el-form-item>
              <el-form-item label="营业类型：" prop="name">
                <el-select v-model="entryForm.class" placeholder="请选择营业类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="店铺标签：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="城市区域：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="详细地址：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="所属街区：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="负责人：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="验证码：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="营业执照：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="法人身份证：" prop="name">
                <el-input v-model="entryForm.name"></el-input>
              </el-form-item>
            </el-form>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '../components/Menu';
  import Header from '../components/Header';
  import Logo from '../components/Logo';


  // 商户入驻
  export default {
    name: "MerchantEntry",
    components: {
      Menu,
      Header,
      Logo
    },
    data() {
      return {
        entryForm: {
          name: '',
          class: '',
        },
        rules: {}
      }
    }
  }
</script>

<style scoped lang="less" src="../style/merchantEntry.less">

</style>
