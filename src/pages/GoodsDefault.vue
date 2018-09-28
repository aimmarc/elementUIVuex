<template>
  <div class="goods_default_wrap">
    <div class="form_wrap">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <div class="form_space">
              <div class="title">商品信息</div>
              <div class="tab_bar">
                <div v-bind:class="tabIndex == '0' ? 'tab_item active' : 'tab_item'" @click="changeTabs('0')">折扣</div>
                <div v-bind:class="tabIndex == '1' ? 'tab_item active' : 'tab_item'" @click="changeTabs('1')">上新</div>
              </div>
              <el-form-item label="商品条码：" prop="code">
                <el-input v-model="goodsForm.code" placeholder="请输入商品条码"></el-input>
              </el-form-item>
              <el-form-item label="商品名称：" prop="name">
                <el-input v-model="goodsForm.name" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="成本价：" prop="minPrice">
                <el-input v-model="goodsForm.minPrice" placeholder="请输入成本价" type="number"></el-input>
              </el-form-item>
              <el-form-item label="吊牌价：" prop="price">
                <el-input v-model="goodsForm.price" placeholder="请输入吊牌价"></el-input>
              </el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="平台售价：" prop="platPrice">
                    <el-input v-model="goodsForm.platPrice" placeholder="请输入平台售价"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="折扣：" prop="forSell">
                    <el-input v-model="goodsForm.forSell" placeholder="请输入折扣"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="商品图片：">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  accept="image/*"
                  :before-upload="beforeUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="form_space">
              <div class="title">更多设置</div>
              <el-form-item label="商品状态：" prop="status">
                <el-select v-model="goodsForm.status" placeholder="请选择商品状态">
                  <el-option label="上架" value="shanghai"></el-option>
                  <el-option label="下架" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类：" prop="goodsClass">
                    <el-select v-model="goodsForm.goodsClass" placeholder="大分类">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="subClass">
                    <el-select v-model="goodsForm.subClass" placeholder="小分类">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品规格：" prop="size">
                    <el-input v-model="goodsForm.size" placeholder="请输入店铺名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item props="defaultSize" prop="defaultSize">
                    <el-select v-model="goodsForm.defaultSize" placeholder="默认尺码">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button><i class="el-icon-plus"></i>新增规格</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="footer">
          <el-button type="primary" @click="submit">保存并新增</el-button>
          <el-button @click="submit">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {fileReader} from "../util/common";
  // 普通商品
  export default {
    name: "GoodsDefault",
    data() {
      return {
        goodsForm: {
          code: '',
          name: '',
          minPrice: '',
          price: '',
          platPrice: '',
          forSell: '',
          status: '',
          goodsClass: '',
          subClass: '',
          size: '',
          defaultSize: '',
        },
        rules: {
          code: [
            {required: true, message: '请输入商品条码', trigger: 'blur'},
            {max: 20, message: '店铺名称长度超出限制', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {max: 20, message: '商品名称长度超出限制', trigger: 'blur'},
          ],
          minPrice: [
            {required: true, message: '请输入成本价', trigger: 'blur'},
            {max: 20, message: '成本价长度超出限制', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入吊牌价', trigger: 'blur'},
            {max: 20, message: '吊牌价长度超出限制', trigger: 'blur'},
          ],
          platPrice: [
            {required: true, message: '请输入平台价格', trigger: 'blur'},
            {max: 20, message: '平台价格长度超出限制', trigger: 'blur'},
          ],
          forSell: [
            {required: true, message: '请输入折扣', trigger: 'blur'},
            {max: 20, message: '折扣长度超出限制', trigger: 'blur'},
          ],
          status: [
            {required: true, message: '请选择商品状态', trigger: 'change'},
          ],
          goodsClass: [
            {required: true, message: '请选择大分类', trigger: 'change'},
          ],
          subClass: [
            {required: true, message: '请选择小分类', trigger: 'change'},
          ],
          size: [
            {required: true, message: '请输入商品规格', trigger: 'blur'},
            {max: 20, message: '商品规格长度超出限制', trigger: 'blur'},
          ],
          defaultSize: [
            {required: true, message: '请选择默认尺码', trigger: 'change'},
          ],
        },
        tabIndex: '0',
        imageUrl: '',
      }
    },
    methods: {
      beforeUpload(file) {
        fileReader(file).then(res => {
          this.imageUrl = res;
        }).catch(err => {
          this.$message.error(err);
        });
        return false;
      },
      changeTabs(type) {
        this.tabIndex = type;
      },
      submit() {
        this.$refs.goodsForm.validate(valid => {
          if (valid) {
            console.log(this.goodsForm);
            // 此处写请求逻辑
            this.$message.success('添加成功');
            this.$router.replace('/goods');
          }
        })
      }
    }
  }
</script>

<style lang="less" src="../style/goodsDefault.less">

</style>
