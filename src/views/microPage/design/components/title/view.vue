<template>
  <div class="title" @click="titleClick(currDate)">
    {{currDate.title}}
  </div>

</template>

<script>
  import {mapState, mapActions} from "vuex";

  export default {
    name: "config-title",
    data() {
      return {
      }
    },
    props: ['data'],
    computed: {
      ...mapState("micropage/lists/lists", {
        list: state => state.list
      }),
      currDate() {
        return this.data;
      }
    },
    methods: {
      ...mapActions("micropage/lists/lists", [
        "editList"
      ]),
      titleClick(item) {
        let idx = item.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          item.isEdit = false;
          if (item.type == "title") {
            item.isEdit = true;
          }
          return item;
        });
        this.editList(list);  //  重置总的  list
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title {
    cursor: pointer;
    height: 60px;
    width: 100%;
    background: url("https://cdn.renqilai.com/2019_06_21/11_44_04.png");
    text-align: center;
    color: #fff;
    padding-top: 36px;
    font-weight: bold;
    box-sizing: border-box;
  }
</style>
