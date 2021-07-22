<template>
  <div id="app">
    <div class="body">
      <h1 class="title">点标生成器</h1>

      <div class="main">
        <div class="left">
          <h4 style="margin-bottom: 16px;">代码</h4>
          <div class="code-box">
            <span class="copy-btn" @click="copy">复制</span>
            {{ codeStr }}
          </div>
        </div>

        <div class="right">
          <el-row class="top" type="flex">
            <el-input
              v-model="inputValue"
              class="input"
              placeholder="请输入图片地址"
              @change="handleConfirm"
            />

            <el-button style="margin-left: 4px" @click="handleConfirm"
              >确定</el-button
            >
          </el-row>
          <Maker
            class="maker-wrapper"
            :url="imageURL"
            @change="handleDotsChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';

import Maker from "./components/Maker.vue";

export default {
  name: "App",
  components: {
    Maker,
  },
  data() {
    return {
      inputValue:
        "http://m.huitu8.com/uploads/allimg/2019062800b0/smallfd69f1066aea8060013640cc93e57154.jpg",
      imageURL: "",
      codeStr: "",
    };
  },
  methods: {
    handleConfirm() {
      // TODO: url 校验
      this.imageURL = this.inputValue;
    },
    handleDotsChange (dots) {
      this.codeStr = dots && dots.length > 0 ? JSON.stringify(dots, null, 2) : ''
    },
    copy () {
      console.log('ff')
      copy(this.codeStr, {
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
