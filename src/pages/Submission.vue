<template>
  <div class="submission_wrap">
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
      <div class="main_panel">
        <i class="icon_wait"></i>
        <div class="msg">您的店铺资料正在审核中，请耐心等待...</div>
        <div class="sub">（ 客服会在24小时联系您进行考察审核，<br>请保持联系电话畅通，整个审核过程为1-3个工作日 ）</div>
        <div class="btn_panel">
          <el-button>催下客服</el-button>
          <el-button type="primary" @click="toBack">重新修改提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '../components/Logo';


  // 提交审核
  export default {
    name: "Submission",
    components: {
      Logo,
    },
    methods: {
      toBack() {
        this.$router.push('/merchantEntry');
      }
    }
  }
</script>

<style scoped lang="less" src="../style/submission.less">

</style>
