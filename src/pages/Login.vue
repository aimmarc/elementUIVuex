<template>
  <div class="login_wrap">
    <div class="banner">
      <Logo></Logo>
      <div class="login_panel">
        <div class="title">登录管理后台</div>
        <input type="text" class="login_input" placeholder="手机号" ref="phoneNumber">
        <div class="login_input password">
          <input type="number" placeholder="验证码" ref="confirmCode">
          <div class="confirm_code" @click="getConfirmCode">{{codeFlag ? second + ' 秒后再试' : '获取验证码'}}</div>
        </div>
        <div class="login_btn" @click="login">登录</div>
        <div class="footer">
          <div class="left">
            <div class="tick" @click="autoLogin">
              <i v-bind:class="autoFlag ? 'icon_tick' : 'hidden icon_tick'"></i>
            </div>
            <span class="auto_login">下次自动登录</span>
          </div>
          <a class="right" href="#/merchantEntry">商户入驻 ></a>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '../components/Footer';
  import Logo from '../components/Logo';
  import {REGEXP_PHONE} from '../constant/regexp';
  import {store, ACTION_SET_LOGIN} from "../vuex/store";
  import {setHeaders, getHeaders} from "../util/request";


  // 登陆
  export default {
    name: "Login",
    components: {
      Footer,
      Logo
    },
    data() {
      return {
        codeFlag: false,
        autoFlag: true,
        second: 59,
        timer: null,
      }
    },
    methods: {
      /**
       * 获取验证码
       */
      getConfirmCode() {
        if (this.codeFlag) {
          return;
        }
        if (!this.validPhone()) {
          return;
        }
        this.codeFlag = true;
        this.timer = setInterval(() => {
          if (this.second < 1) {
            clearInterval(this.timer);
            this.codeFlag = false;
            this.second = 59;
            return;
          }
          this.second = this.second - 1;
        }, 1000);
      },
      /**
       * 验证手机号
       */
      validPhone() {
        let phoneNum = this.$refs.phoneNumber.value;
        if (phoneNum == '') {
          this.$message.error('请输入手机号');
          return false;
        }
        if (!REGEXP_PHONE.test(phoneNum)) {
          this.$message.error('手机号格式不正确');
          return false;
        }
        return true;
      },
      /**
       * 验证码
       */
      validCode() {
        let confirmCode = this.$refs.confirmCode.value;
        if (confirmCode == '') {
          this.$message.error('请输入验证码');
          return false;
        }
        if (confirmCode.length > 10) {
          this.$message.error('验证码长度超出限制');
          return false;
        }
        return true;
      },
      /**
       * 登录
       */
      login() {
        if (this.validPhone() && this.validCode()) {
          setHeaders({loginStatus: 1});
          store.dispatch(ACTION_SET_LOGIN, getHeaders().loginStatus); // 设置登录状态为1，需网络请求后台返回正确后设置
          this.$router.push('/');
        }
      },
      /**
       * 自动登录
       */
      autoLogin() {
        this.autoFlag = !this.autoFlag;
      },
    }
  }
</script>

<style scoped lang="less" src="../style/login.less">

</style>
