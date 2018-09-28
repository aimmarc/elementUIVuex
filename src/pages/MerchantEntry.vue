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
          <div class="head">
            <div v-bind:class="activeTab == '0' ? 'item active' : 'item'" @click="changeTabs('0')">
              普通门店
              <i class="line"></i>
            </div>
            <div v-bind:class="activeTab == '1' ? 'item active' : 'item'" @click="changeTabs('1')">
              连锁品牌
              <i class="line"></i>
            </div>
          </div>
          <div class="body">
            <el-form :model="entryForm" :rules="rules" ref="entryForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="店铺名称：" prop="name">
                <el-input v-model="entryForm.name" placeholder="请输入店铺名称"></el-input>
              </el-form-item>
              <el-form-item label="营业类型：" prop="shopClass">
                <el-select v-model="entryForm.shopClass" placeholder="请选择营业类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="店铺标签：">
                <span class="labels" v-for="(item, index) in labels" :key="index"><i class="close" @click="deleteLabel(index)"></i>{{item}}</span>
                <span class="add" @click="formProps.visible = true">+ 添加标签</span>
              </el-form-item>
              <el-form-item label="城市区域：" prop="city">
                <el-cascader
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>
                <el-input v-model="entryForm.city" class="hidden"></el-input>
              </el-form-item>
              <el-form-item label="详细地址：" prop="address">
                <el-input v-model="entryForm.address" placeholder="请输入详细地址"></el-input>
              </el-form-item>
              <el-form-item label="所属街区：" prop="street">
                <el-select v-model="entryForm.street" placeholder="请选择街区">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="负责人：" prop="person">
                <el-input v-model="entryForm.person" placeholder="请输入负责人姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="phoneNumber">
                <el-input v-model="entryForm.phoneNumber" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="验证码：" prop="confirmCode">
                <el-input v-model="entryForm.confirmCode" placeholder="请输入验证码"/>
                <div class="confirm_code" @click="getConfirmCode">{{codeFlag ? second + ' 秒后再试' : '获取验证码'}}</div>
              </el-form-item>
              <el-form-item label="营业执照：">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  accept="image/*"
                  :before-upload="beforeCardUpload">
                  <img v-if="imageUrlCard" :src="imageUrlCard" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="法人身份证：">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  accept="image/*"
                  :before-upload="beforeIDUpload">
                  <img v-if="imageUrlID" :src="imageUrlID" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
            <div class="body_item">
              <div class="tick" @click="reading = !reading">
                <i v-bind:class="reading ? 'icon_tick' : 'hidden icon_tick'"></i>
              </div>
              <span class="auto_login">已阅读并同意<a href="#/protocol">小二衣橱商家协议</a></span>
            </div>
            <div class="btn_panel" v-loading="loading">
              <el-button type="primary" @click="save">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EntryLabel :formProps="formProps"></EntryLabel>
  </div>
</template>

<script>
  import Logo from '../components/Logo';
  import EntryLabel from './form/EntryLabel';
  import {CITY_DATA} from '../constant/city';
  import {REGEXP_PHONE} from '../constant/regexp';
  import {fileReader} from '../util/common';


  // 商户入驻
  export default {
    name: "MerchantEntry",
    components: {
      Logo,
      EntryLabel
    },
    data() {
      return {
        labels: ['事例标签'],
        loading: false,
        entryForm: {
          name: '',
          shopClass: '',
          city: '',
          address: '',
          street: '',
          person: '',
          phoneNumber: '',
          confirmCode: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
            {max: 20, message: '店铺名称长度超出限制', trigger: 'blur'},
          ],
          shopClass: [
            {required: true, message: '请选择服务类型', trigger: 'change'},
          ],
          city: [
            {required: true, message: '请选择城市区域', trigger: 'change'},
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
            {max: 40, message: '地址长度超出限制', trigger: 'blur'},
          ],
          street: [
            {required: true, message: '请选择所属街区', trigger: 'change'},
          ],
          person: [
            {required: true, message: '请输入负责人姓名', trigger: 'blur'},
            {max: 20, message: '负责人姓名长度超出限制', trigger: 'blur'},
          ],
          phoneNumber: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {
              validator(rule, value, callback) {
                if (!REGEXP_PHONE.test(value)) {
                  return callback(new Error('手机号格式不正确'));
                }
                callback();
              }
            },
          ],
          confirmCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {max: 10, message: '验证码长度超出限制', trigger: 'blur'},
          ],
        },
        activeTab: '0',
        formProps: {
          visible: false,
          onOk: this.onOk,
          onCancel: this.onCancel,
        },
        reading: true,
        options: CITY_DATA,
        selectedOptions: [],
        codeFlag: false,
        second: 59,
        imageUrlCard: '',
        imageUrlID: '',
        timer: null,
      }
    },
    methods: {
      /**
       * 切换tabs
       * @param index
       */
      changeTabs(index) {
        this.activeTab = index;
      },
      /**
       * dlg取消事件
       * @param form
       */
      onCancel(form) {
        if (form == undefined) {
          return;
        }
        this.formProps.visible = false;
        form.resetFields();
      },
      /**
       * 删除label
       * @param index
       */
      deleteLabel(index) {
        this.labels.splice(index, 1);
      },
      /**
       * dlg确认事件
       * @param formData
       * @param form
       */
      onOk(formData, form) {
        if (formData == undefined) {
          return;
        }
        this.labels.push(formData.labelName);
        this.formProps.visible = false;
        form.resetFields();
        this.$message.success('标签添加成功');
      },
      /**
       * 联级选择器变化
       */
      handleChange(value) {
        this.entryForm.city = value.join(',');
      },
      /**
       * 获取验证码
       */
      getConfirmCode() {
        if (this.codeFlag) {
          return;
        }
        if (!REGEXP_PHONE.test(this.entryForm.phoneNumber)) {
          this.$message.error('手机号格式不正确');
          return;
        }
        this.codeFlag = true;
        this.timer = setInterval(() => {
          if (this.second < 1) {
            clearInterval(this.timer);
            this.codeFlag = false;
            return;
          }
          this.second = this.second - 1;
        }, 1000);
      },
      /**
       * 上传营业执照回调
       */
      beforeCardUpload(file) {
        fileReader(file).then(res => {
          this.imageUrlCard = res;
        }).catch(err => {
          this.$message.error(err);
        });
        // 此处可以写上传逻辑，file即为上传的文件对象
        // request(...);
        return false;
      },
      /**
       * 上传身份证回调
       */
      beforeIDUpload(file) {
        fileReader(file).then(res => {
          this.imageUrlID= res;
        }).catch(err => {
          this.$message.error(err);
        });
        // 此处可以写上传逻辑，file即为上传的文件对象
        // request(...);
        return false;
      },
      /**
       * 保存
       */
      save() {
        this.$refs.entryForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            console.log(this.entryForm);
            // 此处写提交表单的逻辑，this.entryForm即为需要保存的表单数据
            // request(...);
            setTimeout(() => {
              this.$message.success('信息提交成功');
              this.loading = false;
              this.$router.push('/submission');
            }, 2000);
          }
        });
      }
    }
  }
</script>

<style scoped lang="less" src="../style/merchantEntry.less">

</style>
