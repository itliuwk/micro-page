<template>
  <div class="design">
    <div class="edit-design">
      <el-button size="small" @click="preserve">保存</el-button>
      <el-button size="small" @click="release">发布页面</el-button>
    </div>
    <div class="edit-design-opi">
      <div class="assembly dl">
        <Basics @currComponents="currComponents"></Basics>
      </div>

      <div class="view dl">
        <view-page></view-page>
      </div>
      <div class="configure dl" v-if="list.length">
        <template v-for="(item,index) in list">
          <component class="view-page-item" v-if="item.isEdit" :is="item.Element" :data="item"
                     :key="index"></component>

        </template>
      </div>
      <div class="configure dl" v-else>
        <p style="text-align: center;">请先选择左侧组件</p>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";
  import {randomString} from '@/utils/micropage'

  const Basics = () => import('./basics'); //  左侧组件
  const viewPage = () => import('./viewPage'); //  中间view组件

  const Title = () => import('./components/title/control');  //  左侧公共组件 标题
  const Picture = () => import('./components/pictureAdvertising/control');  //  左侧公共组件 图片广告

  export default {
    name: "design",
    components: {
      Basics,
      viewPage,
      Title,
      Picture
    },
    data() {
      return {
        currComponent: {}
      }
    },
    mounted() {

    },
    computed: {
      ...mapState("micropage/lists/lists", {
        list: state => state.list
      })
    },
    watch: {
      list() {
        this.list.map((item, index) => {
          if (item.type == "pictureAdvertising") {  //为了添加动态组件名
            item.Element = 'Picture'
          }
          return item;
        })
      }
    },
    methods: {
      ...mapActions("micropage/lists/lists", [
        "editList",
        "currentItem"
      ]),
      /**
       * 当前组件
       * @param item
       */
      currComponents(item) {
        item.index = randomString();
        item.isEdit = true;
        let list = JSON.parse(JSON.stringify(this.list));
        if (item.type == "pictureAdvertising") {  // 图片广告
          list.map(items => {
            items.isEdit = false;
            items.index = randomString();
            return items;
          });
          this.editList([...list, item]);
        }

      },
      /**
       * 保存
       */
      preserve(){
        this.$message('打开控制台查看数据结构 console.log')
        console.table(this.list);
      },
      release(){
        this.$message('未开发')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .design {
    background: #ECEDF1;
    height: calc(100vh);

    .edit-design {
      height: 50px;
      line-height: 50px;
      padding-right: 50px;
      background: #fff;
      text-align: right;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, .12), 0 2px 2px 0 rgba(0, 0, 0, .12);
    }

    .edit-design-opi {
      position: relative;
      height: calc(100% - 52px);


      .assembly {
        height: 100%;
        width: 300px;
        padding: 20px;
        background: #F8F8F8;
        position: absolute;
        top: 2px;
        left: 0;
        text-align: left;
        box-sizing: border-box;
      }

      .view {
        width: 375px;
        height: 667px;
        text-align: left;
        background: #fff;
        margin: 50px 60px 0 0;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, .12), 0 2px 2px 0 rgba(0, 0, 0, .12);
      }


      @media screen and (max-width: 1500px) {
        .view {
          margin-left: 400px !important;
        }
      }

      @media screen and (max-width: 1400px) {
        .view {
          margin-left: 380px !important;
        }
      }


      @media screen and (max-width: 1360px) {
        .view {
          margin-left: 350px !important;
        }
      }

      .configure {
        position: absolute;
        background: #F8F8F8;
        top: 2px;
        right: 0;
        height: 100%;
        width: 420px;
        padding: 20px;
        text-align: left;
        box-sizing: border-box;
        overflow: auto;
      }
    }

    .dl {
      display: inline-block;
    }
  }
</style>
