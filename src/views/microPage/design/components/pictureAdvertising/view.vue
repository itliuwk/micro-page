<template>
  <div class="pictureAdvertising-view ">
    <div class="picture-one curP" v-if="currDate.selTemplate=='one'&&currDate.imgs.length"
         :style="currDate.isEdit?'border: 1px dashed #38f;':''" @click="selClick(currDate)">
      <span @click="delItem(currDate)" v-if="currDate.isEdit" class="pictureAdvertising-view-del"><i
        class="el-icon-error"></i></span>
      <ul class="picture-one-ul">
        <li class="picture-one-img" :style="{marginBottom:currDate.spacing+'px'}" v-for="(item,index) in currDate.imgs"
            :key="index">
          <div class="picture-one-img-wrapper">
            <h3 v-if="item.title" class="picture-one-img-title pl20">{{item.title}}</h3>
            <img
              :src="item.url"
              style="width: 100%;"
              alt="">
          </div>
        </li>
      </ul>
    </div>

    <div v-if="currDate.selTemplate=='wheel'&&currDate.imgs.length" class="curP"
         :style="currDate.isEdit?'border: 1px dashed #38f;':''"
         @click="selClick(currDate)">
      <span @click="delItem(currDate)" v-if="currDate.isEdit" class="pictureAdvertising-view-del"><i
        class="el-icon-error"></i></span>
      <el-carousel height="136px">
        <el-carousel-item v-for="(item,index) in currDate.imgs" :key="index" style="text-align: center;">
          <img :src="item.url" alt="" style="height: 100%;width: 100%">
          <h3 v-if="item.title" class="picture-one-img-swper-title pl20">{{item.title}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div v-if="currDate.selTemplate=='other'||currDate.imgs.length===0" class="curP"
         :style="currDate.isEdit?'border: 1px dashed #38f;':''"
         @click="selClick(currDate)">
         <span @click="delItem(currDate)" v-if="currDate.isEdit" class="pictureAdvertising-view-del"><i
           class="el-icon-error"></i></span>
      <div class="rc-design-react-preview rc-design-component-default-preview">
        <div>
          <div class="rc-design-component-default-preview__title">点击编辑图片广告</div>
          <div class="rc-design-component-default-preview__tip">建议宽度750像素</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";

  export default {
    name: "views",
    props: ['data'],
    data() {
      return {
        value8: 0,
        visible2: false,
        currItem: {}
      }
    },
    computed: {
      ...mapState("micropage/lists/lists", {
        list: state => state.list
      }),
      currDate() {
        this.data.selTemplate = this.data.selTemplate || 'other';
        this.data.imgs = this.data.imgs || [];
        return this.data;
      }
    },

    watch: {
      list() {
        this.list.map((item, index) => {
          return item;
        })
      },
      data() {

      }
    },

    mounted() {
    },
    methods: {
      ...mapActions("micropage/lists/lists", [
        "editList"
      ]),
      selClick(item) {
        let idx = item.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          item.isEdit = false;
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.isEdit = true;
            }
          }
          return item;
        });
        this.editList(list);  //  重置总的  list
      },
      delItem(item) {
        this.visible2 = true;
        this.currItem = item;
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.sureClick();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 确定删除当前组件
       */
      sureClick() {
        let idx = this.currItem.index;
        let list = JSON.parse(JSON.stringify(this.list));
        let newList = [];
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            item.isEdit = false;
            if (item.index != idx) {
              newList.push(item);
            }
          } else {
            newList.push(item); //为了不影响其他组件，重新push一下
          }
          return item;
        });

        if (newList.length) {
          newList[newList.length - 1].isEdit = true;  // 选中最后一个
        }


        this.visible2 = false;
        this.editList(newList);  //  重置总的  list
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../styles.css";

  .pictureAdvertising-view {
    position: relative;

    .pictureAdvertising-view-del {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
    }

    .picture-one {
      width: 100%;

      .picture-one-ul li:last-child {
        margin-bottom: 0 !important;
      }

      .picture-one-img {
        /*height: 136px;*/
        text-align: center;

        .picture-one-img-wrapper {
          position: relative;
          height: 100%;
          z-index: 1;

          .picture-one-img-title {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0;
            z-index: 10;
            background-color: rgba(51, 51, 51, .8);
            color: #fff;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            text-align: left;
            overflow: hidden;
          }

          img {
            height: 100%;
          }
        }
      }
    }

    .picture-one-img-swper-title {
      position: relative;
      top: -35px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0;
      z-index: 10;
      background-color: rgba(51, 51, 51, .8);
      color: #fff;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      overflow: hidden;
    }
  }

  .rc-design-react-preview, .rc-design-vue-preview {
    position: relative;
    overflow: hidden;
  }

  .rc-design-react-preview:before, .rc-design-vue-preview:before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .rc-design-component-default-preview .rc-design-component-default-preview__title {
    margin-top: 50px;
    font-size: 14px;
  }

  .rc-design-component-default-preview {
    height: 136px;
    background-color: #ebf8fd;
    text-align: center;
    color: #88c4dc;
  }
</style>
