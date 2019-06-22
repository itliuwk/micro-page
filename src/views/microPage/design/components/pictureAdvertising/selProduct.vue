<template>
  <div>
    <!--          highlight-current-row
          @current-change="handleCurrentChange" -->
    <el-table
      ref="singleTable"
      :data="listData"
      style="width: 100%">
      <el-table-column label="" width="65">
        <template slot-scope="listData">
          <el-radio :label="listData.row.id" v-model="radio" @change.native="getTemplateRow(listData.$index,listData.row)">&nbsp</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="商品">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
 // import {fetchList} from '@/api/coupon/coupon';

  export default {
    name: "selCoupon",
    data() {
      return {
        listData: [
          {
            id: '1',
            name: '戴尔（DELL）Precision 7530 15.6英寸移动工作站笔记本电脑 指纹识别'
          }, {
            id: '2',
            name: '小米（MI） 游戏本 15.6英寸轻薄本窄边框金属吃鸡笔记本电脑游戏本 I7-7700H '
          }, {
            id: '3',
            name: '华为笔记本 MateBook X Pro超薄本13.9英寸轻薄本商务便携电脑超极本 灰2019款'
          }, {
            id: '4',
            name: '神舟（HASEE） 战神ZX8/GX8 RTX2060/70/80显卡学生办公制图游戏'
          }
        ],
        currentRow: null,
        radio:''
      }
    },
    mounted() {
    //  this.getList();
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      getTemplateRow(index,row) {
        this.currentRow = row;
      },
      getList() {
        fetchList().then(res => {
          this.listData = res.data;
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
