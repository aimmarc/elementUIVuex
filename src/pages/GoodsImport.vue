<template>
  <div class="goods_import_wrap" v-loading="loading">
    <ul class="header clearfix">
      <li class="step1">
        <i class="excel"></i>
        1、上传excel
      </li>
      <li v-bind:class="step !=1 ? 'step2 active' : 'step2'">
        <i class="than"></i>
        2、核对数据
      </li>
      <li v-bind:class="step == 3 ? 'step3 active' : 'step3'">
        <i class="import"></i>
        3、导入数据
      </li>
    </ul>
    <span v-if="step == 1">
      <div class="title">上传提醒</div>
    <div class="tips">您将通过上传的Excel文件，快速导入商品信息；<br>
      导入前，请先下载 <a href="">商品导入模板</a>，填写完成后再上传
    </div>
    <div class="body clearfix">
      <div class="left">
        <i class="split"></i>
        <el-upload
          class="upload-demo"
          action=""
          :before-upload="upload"
          :multiple="false"
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary">上传商品导入文件</el-button>
          <div slot="tip" class="el-upload__tip">支持200MB以内的xls文件<br><span>免费版</span>最多导入199行</div>
        </el-upload>
      </div>
      <div class="left">
        <i class="file"></i>
        <div class="el-upload__tip">或将文件拖动到这里导入</div>
      </div>
    </div>
    </span>
    <span v-if="step == 2">
      <div class="title">导入提示</div>
      <div class="tips">系统读取到3条商品数据；<br>
        预计导入<span class="success" v-text="classify"></span>种商品分类，有<span class="error" v-text="errorSum"></span>条异常数据不会被导入
      </div>
      <div class="body">
        <div class="abnormal">异常数据：</div>
        <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
          align="center"
          prop="reason"
          label="无法导入原因"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="index"
          label="行号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="classify"
          label="大分类">
        </el-table-column>
        <el-table-column
          align="center"
          prop="subClassify"
          label="小分类">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品名称">
        </el-table-column>
        </el-table>
        <div class="footer clearfix">
          系统将自动为您创建<span v-text="classify" class="success"></span>种商品分类
          <div class="right">
            <el-button @click="step = 1">上一步</el-button>
            <el-button type="primary" @click="importBegin">开始导入</el-button>
          </div>
        </div>
      </div>
    </span>
    <span v-if="step == 3">
      <div class="title">导入完成</div>
      <div class="tips">导入成功 <span class="success" v-text="successSum">1</span>条；<br>
        导入失败 <span class="error" v-text="errorSum">2</span>条
      </div>
      <div class="body">
        <div class="abnormal">异常数据：</div>
        <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
          align="center"
          prop="reason"
          label="无法导入原因"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="index"
          label="行号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="classify"
          label="大分类">
        </el-table-column>
        <el-table-column
          align="center"
          prop="subClassify"
          label="小分类">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品名称">
        </el-table-column>
        </el-table>
        <div class="footer clearfix">
          <div class="right">
            <el-button @click="goBack">返回商品列表</el-button>
            <el-button @click="step = 1">继续导入</el-button>
            <el-button type="primary" @click="step = 3">下载失败数据</el-button>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
  import {validXls} from "../util/common";


  // 导入商品
  export default {
    name: "GoodsImport",
    data() {
      return {
        fileList: [],
        step: 1,
        tableData: [],
        classify: 0,
        errorSum: 0,
        successSum: 0,
        loading: false,
      }
    },
    methods: {
      /**
       * 上传
       */
      upload(file) {
        if (file) {
          if (validXls(file.name)) {
            this.loading = true;
            setTimeout(() => {
              this.step = 2;
              this.getErrorData();
              this.loading = false;
            }, 1000);
          } else {
            this.$message.error('请选择正确的Excel文件!');
          }
        }
        return false;
      },
      /**
       * 获取失败数据
       */
      getErrorData() {
        let data = [];
        for (let i = 0; i < 2; i++) {
          data.push({
            name: `商品名称${i}`,
            classify: `大分类${i}`,
            index: i,
            reason: `原因${i}`,
            subClassify: `小分类${i}`,
          });
        }
        this.tableData = data;
        this.errorSum = data.length;
      },
      /**
       * 返回
       */
      goBack() {
        this.$router.replace('/goods');
      },
      /**
       * 开始导入
       */
      importBegin() {
        this.loading = true;
        setTimeout(() => {
          this.step = 3;
          this.getErrorData();
          this.loading = false;
        }, 1000);
      }
    }
  }
</script>

<style lang="less" src="../style/goodsImport.less">

</style>
