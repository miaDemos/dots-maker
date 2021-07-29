<template>
  <div id="app">
    <div class="body">
      <h1 class="title">点标生成器</h1>
      <div class="main">
        <div class="left">
          <h4 style="margin-bottom: 16px;">
            代码（必含name）
            <input type="file" id="file-input" name="fileContent" @change="updateJson($event)"/>
          </h4>
          <div class="code-box">
            <span class="copy-btn" @click="copy">复制</span>
            {{ codeStr }}
          </div>
        </div>

        <div class="right">
          <el-row class="top" type="flex">
            <el-input
              v-model="imageData.url"
              class="input"
              placeholder="请输入图片地址"
            />
            <el-input
              class="w160"
              v-model="imageData.width"
              placeholder="图片宽度"
            />
            <el-input
              class="w160"
              v-model="imageData.height"
              placeholder="图片高度"
            />

            <el-button style="margin-left: 4px" @click="handleConfirm"
              >确定</el-button
            >
          </el-row>
          <Maker2
            class="maker-wrapper"
            v-bind="markerOption"
            @change="handleDotsChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';

import Maker2 from "./components/Maker2.vue";

export default {
  name: "App",
  components: {
    Maker2,
  },
  data() {
    return {
      codeStr: "aaaa",
      imageData:{
        url:"https://z3.ax1x.com/2021/07/29/Wb9ASA.png",
        width:'780px',
        height:'78vh'
      },
      markerOption:{
        url: "",
        width:'',
        height:'',
        color:''
      },
    };
  },
  methods: {
    //上传json
    updateJson(e){
      console.log('e',e);
    },
    handleConfirm() {
      // TODO: url 校验
      this.markerOption = {...this.imageData};
    },
    handleDotsChange (dots) {
      this.codeStr = dots
    },
    copy () {
      copy(JSON.stringify(this.codeStr), {
        debug: true,
        message: 'Press #{key} to copy',
      });
      this.$message.success('已将代码复制到剪切板中')
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
}

.main {
  display: flex;
  margin: 0 32px;
}

.left {
  display: flex;
  flex-direction: column;
  width: 400px;
}
.w160{
  width: 160px;
}

.code-box {
  position: relative;
  border: 1px solid #e0e0e0;
  margin-right: 16px;
  flex: 1;
  white-space: pre;

  .copy-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    color: #409eff;
    cursor: pointer;
  }
}


.right {
  /* display: flex;
  flex-direction: column; */
  flex: 1;
  text-align: center;
}

.top {
  width: 100%;
}
.maker-wrapper {
  margin-top: 16px;
  /* flex: 1; */
  height: 600px;
  border: 1px solid #e0e0e0;
  resize: both;
  overflow: auto;
}
</style>
