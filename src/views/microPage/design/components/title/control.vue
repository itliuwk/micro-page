<template>
  <div class="title">
    <div class="title-item">
      <span class="fz14">页面标题: </span>
      <el-input style="width: 250px" size="small" @input="titleChange" v-model="currDate.title"></el-input>
    </div>
  </div>

</template>

<script>
  import {mapState, mapActions} from "vuex";

  export default {
    name: "control",
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
      titleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../styles.css";
</style>
