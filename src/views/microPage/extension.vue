<template>
  <div class="extension">
    <div>
      <el-input class="url" disabled v-model="MathUrl"></el-input>
      <el-button type="primary"
                 v-clipboard:copy="MathUrl"
                 v-clipboard:success="onCopy"
                 v-clipboard:error="onError">复制链接
      </el-button>
    </div>
    <div class="code">
      <img :src="code" alt="">
      <a :href="code" target="_blank">下载二维码</a>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'extension',
    data () {
      return {
        url: '',
        code: 'https://s2.ax1x.com/2019/06/18/VL3DRe.png'
      }
    },
    mounted () {
    },
    computed: {
      MathUrl: function () {
        let routes = this.$router.options.routes
        let MathS = parseInt(12 * Math.random())
        return window.location.host + routes[MathS].redirect
      }
    },
    methods: {

      // 复制成功
      onCopy (e) {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      },
      // 复制失败
      onError (e) {
        this.$message({
          message: '复制失败',
          type: 'warning'
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .url {
    width: 80%;
  }

  .code {
    margin-top: 15px;

    img {
      width: 175px;
      height: 175px;
    }

    a {
      color: #188ae2;
    }
  }
</style>
