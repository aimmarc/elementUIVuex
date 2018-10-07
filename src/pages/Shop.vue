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
          <el-button type="primary">保存</el-button>
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
              <el-form-item label="营业类型" prop="status">
                <el-select v-model="shopForm.status" placeholder="请选择营业类型">
                  <el-option label="类型一" value="shanghai"></el-option>
                  <el-option label="类型二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_item_one">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="店铺地址" prop="name">
                    <el-input v-model="shopForm.name" placeholder="请输入店铺名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" label-width="0" prop="name">
                    <el-input v-model="shopForm.name" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="form_item_two">
              <el-form-item label="所属街区" prop="status">
                <el-select v-model="shopForm.status" placeholder="请选择所属街区">
                  <el-option label="街区" value="shanghai"></el-option>
                  <el-option label="街区" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_item_one">
              <el-form-item label="店铺标签" prop="status">
                <span class="labels" v-for="(item, index) in labels" :key="index"><i class="close"
                                                                                     @click="deleteLabel(index)"></i>{{item}}</span>
                <span class="add" @click="formProps.visible = true">+ 添加标签</span>
              </el-form-item>
            </div>
            <div class="form_item_one">
              <el-form-item label="店铺封面" prop="status">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  accept="image/*"
                  :before-upload="beforeIDUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
          <el-button type="primary">保存</el-button>
        </div>
      </div>
      <div class="body">
        <div class="form_item_one back_goods">
          <el-input v-model="shopForm.name" placeholder="请输入退换货详情" type="textarea" :rows="7"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 我的店铺
  export default {
    name: "Shop",
    data() {
      return {
        headInfo: {
          title: 'Massimo Dutti高端女装',
          id: '111222333',
          money: '88876'
        },
        shopForm: {},
        pickOptions: {
          onPick: this.onPick,
        },
        rules: {},
        labels: ['实例标签'],
        imageUrl: '',
      }
    },
    mounted() {

    },
    methods: {
      onPick() {

      },
      beforeIDUpload(file) {
        return false;
      }
    }
  }
</script>

<style scoped lang="less" src="../style/shop.less">

</style>
