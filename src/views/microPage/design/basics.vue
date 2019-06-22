<template>
  <div class="basics">
    <h3>组件</h3>
    <el-row :gutter="20">
      <el-col class="mb" :span="12" v-for="item in listData" :key="item.id">
        <div class="grid-content bg-purple"
             :style="item.uncultivated==true?'background: #ccc;color:#666;cursor:default;':''"
             @click="currComponents(item)">
          {{item.name}}
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    name: "basics",
    data() {
      return {
        class: 'uncultivated',
        listData: [
          {
            id: 1,
            name: '图片广告',
            type: 'pictureAdvertising',
            uncultivated: false,
          }, {
            id: 2,
            name: '商品',
            uncultivated: true,
          }, {
            id: 3,
            name: '商品组',
            uncultivated: true,
          }, {
            id: 4,
            name: '文本',
            uncultivated: true,
          }, {
            id: 5,
            name: '魔方',
            uncultivated: true,
          }, {
            id: 6,
            name: '商品搜索',
            uncultivated: true,
          }, {
            id: 7,
            name: '辅助空白',
            uncultivated: true,
          }, {
            id: 8,
            name: '优惠券',
            uncultivated: true,
          },
        ]
      }
    },
    methods: {
      currComponents(item) {
        if (!item.uncultivated) {
          this.$emit('currComponents', item);
        }else {
          this.$message('暂未开发');
        }

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .basics {

    h3 {
      margin-bottom: 10px;
    }

    .grid-content {
      background: #fff;
      border: 1px solid #e6e6e6;
      height: 100px;
      line-height: 100px;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
    }

    .mb {
      margin-bottom: 20px;
    }
  }

</style>
