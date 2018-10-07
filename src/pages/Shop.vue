<template>
  <div class="shop_wrap">
    <div class="header">
      <div class="head_panel">
        <i class="icon_head"></i>
      </div>
      <div class="name_panel">
        <input type="text" v-model="headInfo.title" disabled>
        <i class="icon_edit"></i>
      </div>
      <div class="id_panel">ID:{{headInfo.id}}</div>
      <div class="money_panel">
        <ul>
          <li>
            <div class="left"><i class="icon_money"></i>店铺余额</div>
            <div class="right">
              <span class="money">￥{{headInfo.money}}</span>
            </div>
          </li>
          <li>
            <div class="left"><i class="icon_put"></i>提现设置</div>
            <div class="right">
              请在手机端进行安全设置
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="shop_info">
      <div class="title_bar clearfix">
        <div class="title">店铺信息</div>
        <div class="right">
          <el-button type="primary" @click="saveShopInfo">保存</el-button>
        </div>
      </div>
      <div class="body">
        <div class="form_wrap">
          <el-form :model="shopForm" :rules="rules" label-position="left" ref="shopForm" label-width="120px"
                   class="demo-ruleForm">
            <div class="form_item_one">
              <el-form-item label="店铺名称" prop="name">
                <el-input v-model="shopForm.name" placeholder="请输入店铺名称"></el-input>
              </el-form-item>
            </div>
            <div class="form_item_two">
              <el-form-item label="营业类型" prop="classify">
                <el-select v-model="shopForm.classify" placeholder="请选择营业类型">
                  <el-option label="类型一" value="shanghai"></el-option>
                  <el-option label="类型二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_item_one">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="店铺地址" prop="city">
                    <el-cascader
                      :options="options"
                      v-model="selectedOptions"
                      @change="handleChange">
                    </el-cascader>
                    <el-input v-model="shopForm.city" class="hidden"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" label-width="0" prop="address">
                    <el-input v-model="shopForm.address" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="form_item_two">
              <el-form-item label="所属街区" prop="street">
                <el-select v-model="shopForm.street" placeholder="请选择所属街区">
                  <el-option label="街区" value="shanghai"></el-option>
                  <el-option label="街区" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_item_one">
              <el-form-item label="店铺标签" prop="labels">
                <span class="labels" v-for="(item, index) in labels" :key="index"><i class="close"
                                                                                     @click="deleteLabel(index)"></i>{{item}}</span>
                <span class="add" @click="formProps.visible = true">+ 添加标签</span>
              </el-form-item>
            </div>
            <div class="form_item_one">
              <el-form-item label="店铺封面">
                <img v-for="(item, index) in fileList" :key="index" :src="item.url" class="up_item">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  accept="image/*"
                  :file-list="fileList"
                  :before-upload="beforeIDUpload">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="shop_info">
      <div class="title_bar clearfix">
        <div class="title">退换货说明</div>
        <div class="right">
          <el-button type="primary" @click="saveBack">保存</el-button>
        </div>
      </div>
      <div class="body">
        <div class="form_wrap">
          <el-form :model="backForm" :rules="rules1" label-position="left" ref="backForm" label-width="120px"
                   class="demo-ruleForm">
            <div class="form_item_one">
              <el-form-item label="" prop="text">
                <el-input v-model="backForm.text" placeholder="请输入退换货详情" type="textarea" :rows="7"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <EntryLabel  :formProps="formProps"></EntryLabel>
  </div>
</template>

<script>
  import {CITY_DATA} from "../constant/city";
  import {fileReader} from "../util/common";
  import EntryLabel from './form/EntryLabel';


  // 我的店铺
  export default {
    name: "Shop",
    components: {
      EntryLabel
    },
    data() {
      return {
        headInfo: {
          title: 'Massimo Dutti高端女装',
          id: '111222333',
          money: '88876'
        },
        shopForm: {
          name: '',
          classify: '',
          city: '',
          address: '',
          street: '',
          labels: '',
        },
        pickOptions: {
          onPick: this.onPick,
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
            {max: 20, message: '店铺名称长度超出限制', trigger: 'blur'},
          ],
          classify: [
            {required: true, message: '请选择营业类型', trigger: 'change'},
          ],
          city: [
            {required: true, message: '请选择店铺地址', trigger: 'change'},
          ],
          address: [
            {required: true, message: '请输入店铺详细地址', trigger: 'blur'},
          ],
          street: [
            {required: true, message: '请选择所属街区', trigger: 'change'},
          ],
          labels: [
            {required: true, message: '请添加店铺标签', trigger: 'blur'},
          ],
        },
        backForm: {
          text: '',
        },
        rules1: {
          text: [
            {required: true, message: '请输入退换货详情', trigger: 'blur'},
            {max: 400, message: '退换货详情长度超出限制', trigger: 'blur'},
          ]
        },
        labels: ['实例标签'],
        imageUrl: '',
        options: CITY_DATA,
        selectedOptions: [],
        fileList: [],
        formProps: {
          visible: false,
          onOk: this.onOk,
          onCancel: this.onCancel,
        },
      }
    },
    mounted() {

    },
    methods: {
      onPick() {

      },
      beforeIDUpload(file) {
        fileReader(file).then(res => {
          this.fileList.push({
            name: new Date().getTime(),
            url: res,
          })
        }).catch(err => {
          this.$message.error(err);
        });
        return false;
      },
      handleChange(value) {
        this.shopForm.city = value.join(',');
      },
      saveShopInfo() {
        this.$refs.shopForm.validate(valid => {
          if (valid) {
            console.log(this.shopForm);
          }
        })
      },
      saveBack() {
        this.$refs.backForm.validate(valid => {
          if (valid) {
            console.log(this.backForm);
          }
        })
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
    }
  }
</script>

<style scoped lang="less" src="../style/shop.less">

</style>
