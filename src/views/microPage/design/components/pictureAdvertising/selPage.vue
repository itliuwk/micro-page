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
        label="页面">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
//  import {fetchList} from '@/api/coupon/coupon';

  export default {
    name: "selCoupon",
    data() {
      return {
        listData: [
          {
            id: '1',
            name: '店铺主页'
          }, {
            id: '2',
            name: '测试列表页'
          }, {
            id: '3',
            name: '测试商品页'
          }, {
            id: '4',
            name: '测试详情页'
          }
        ],
        currentRow: null,
        radio:''
      }
    },
    mounted() {
     // this.getList();
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
