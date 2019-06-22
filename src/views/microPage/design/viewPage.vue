<template>
  <!--  @scroll="handleScroll"-->
  <div class="view-page">
    <Title class="view-page-title" :data="titleData" :style="{top:scrollTop}"></Title>
    <div v-if="list.length">
      <Draggable @update="updateList" v-if="isX">
        <div v-for="(item,index) in list" :key="index">
          <component class="view-page-item" :is="item.Element" v-if="item.Element!='Title'" :data="item"></component>
        </div>
      </Draggable>
    </div>
    <div v-else>
      <p style="text-align: center;">请先选择左侧组件</p>
    </div>
  </div>

</template>

<script>
  import Draggable from 'vuedraggable';
  import {mapState, mapActions} from "vuex";

  const Title = () => import('./components/title/view');
  const Picture = () => import('./components/pictureAdvertising/view');
  export default {
    name: "view-page",
    data() {
      return {
        scrollTop: 0,
        isX: true
      }
    },
    components: {
      Draggable,
      Title,
      Picture
    },
    computed: {
      ...mapState("micropage/lists/lists", {
        list: state => state.list
      }),
      titleData() {
        return this.list[0];
      }
    },

    watch: {
      list() {
        this.list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            item.Element = 'Picture'
          } else if (item.type == 'title') {
            item.Element = 'Title'
          }
          return item;
        });

      }
    },
    methods: {
      ...mapActions("micropage/lists/lists", [
        "editList"
      ]),
      handleScroll(e) {
        let scrollTop = e.target.scrollTop;
        if (scrollTop != undefined) {
          this.scrollTop = scrollTop + 'px'
        }
      },
      updateList(e) {
        this.isX = false; // 强制重新刷新组件
        let oldIndex = e.oldIndex; //拿出操作的第几个元素
        let newIndex = e.newIndex;//插到list的第几个元素里
        let list = JSON.parse(JSON.stringify(this.list));
        let opiItem = JSON.parse(JSON.stringify(list[oldIndex])); // 保存当前拖动的元素
        Array.prototype.removeIndex = function (index) {
          if (index > -1) {
            this.splice(index, 1);
          }
        };

        Array.prototype.add = function (val, index) {
          if (index > -1) {
            this.splice(index, 0, val);
          }
        };
        list.removeIndex(oldIndex); // 删除第几个元素
        list.add(opiItem, newIndex);// 保存当前的元素插入到指定位置
        this.$nextTick(function () {
          this.isX = true; // 强制重新刷新组件
          this.editList(list);  // 重新设置总的list值
        })


      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .view-page {
    position: relative;
    height: 100%;
    overflow: auto;


    .view-page-title {
      /*position: absolute;*/
      /*top: 0;*/
      /*left: 0;*/
      /*z-index: 999;*/
      /*width: 100%;*/
      /*margin-bottom: 60px;*/
      /*transition: top 0.5s;*/
    }

    .view-page-item {

    }
  }


  .view-page::-webkit-scrollbar {
    width: 5px;
    height: 16px;
    background-color: #fff;
  }

  .view-page::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    background-color: #ECEDF1;
  }

  .view-page::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }


</style>
