<template>
  <div class="microPage">
    <el-table
      :data="listData"
      style="width: 100%">
      <el-table-column
        label="标题">
        <template slot-scope="listData">
          <span>{{listData.row.name}}</span>
          <span class="home" v-if="listData.row.isHome">店铺主页</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="listData">
          <el-button size="small" @click="editDesign(listData.row)" type="primary">编辑</el-button>
          <el-button size="small" @click="extension(listData.row)" type="success">推广</el-button>
          <el-button size="small" type="info">设为主页</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="推广"
      :visible.sync="isExtension"
      width="570px">
      <Extension v-if="isExtension"></Extension>
    </el-dialog>


  </div>
</template>

<script>
  const Extension = () => import('./extension')
  export default {
    name: 'list',
    components: {
      Extension
    },
    data () {
      return {
        listData: [
          {
            date: '2019-6-18 18:31:49',
            name: '首页',
            isHome: true
          }, {
            date: '2019-6-18 18:31:56',
            name: '封面海报页',
            isHome: false
          }, {
            date: '2019-6-18 18:31:59',
            name: '宣传页',
            isHome: false
          }
        ],
        isExtension: false
      }
    },
    methods: {
      extension (row) {
        this.isExtension = true
      },

      editDesign (row) {
        this.$router.push('/microPage/design')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .microPage {
    padding: 20px;

    .home {
      margin-left: 5px;
      padding: 5px 10px;
      background: #3F51B5;
      color: #fff;
      border-radius: 10px;
    }

  }
</style>
