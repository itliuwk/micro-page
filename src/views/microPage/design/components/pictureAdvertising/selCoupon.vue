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
          <el-radio :label="listData.row.id" v-model="radio"
                    @change.native="getTemplateRow(listData.$index,listData.row)">&nbsp
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="优惠券">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  //import {fetchList} from '@/api/coupon/coupon';

  export default {
    name: 'selCoupon',
    data () {
      return {
        listData: [
          {
            id: '1',
            name: '满500减499元优惠券'
          }, {
            id: '2',
            name: '满100减50元优惠券'
          }, {
            id: '3',
            name: '7.8折'
          }, {
            id: '4',
            name: '9折'
          }
        ],
        currentRow: null,
        radio: ''
      }
    },
    mounted () {
      //this.getList();
    },
    methods: {
      handleCurrentChange (val) {
        this.currentRow = val
      },
      getTemplateRow (index, row) {
        this.currentRow = row
      },
      getList () {
        fetchList().then(res => {
          this.listData = res.data
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
