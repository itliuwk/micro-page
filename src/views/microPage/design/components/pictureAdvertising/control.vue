<template>
  <div class="pictureAdvertising-control" v-loading="isLoading">
    <div class="picture-items">
      <p>选择模板:</p>
      <div class="picture-items-sel">
        <div @click="selTemplate('one')" :style="currData.selTemplate=='one'?'border: 1px solid #38f;':''">
          <p class="bg"></p>
          <p class="bg"></p>
          <p>一行一个</p>
        </div>
        <div @click="selTemplate('wheel')" :style="currData.selTemplate=='wheel'?'border: 1px solid #38f;':''">
          <p class="wheel-bg">
            <span>···</span>
          </p>
          <p>轮播海报</p>
        </div>
      </div>
    </div>

    <div class="picture-items mt20">
      <p>添加图片:</p>
      <p class="pl20 text-info">最多添加10个广告</p>
    </div>
    <div class="mt20">

      <div class="picture-items-upload df mb20" v-for="(item,index) in currData.imgs" :key="index">
        <span @click="delItem(currData,index)" class="pictureAdvertising-view-del curP"><i
          class="el-icon-error"></i></span>
        <div class="picture-items-upload-img br5 fz14">
          <img :src="item.url" alt="" height="80" style="width: 100%">
          <a href="javascript:;" class="file"><span>更换图片</span>
            <input type="file" @change="uploadImg($event,index)"
                   accept="image/jpg,image/jpeg,image/png" name="" title="">
          </a>
        </div>
        <div class="picture-items-upload-info">
          <div class="mb20">
            <span class="ml10 mr10 fz14">图片标题:</span>
            <el-input size="small" class="picture-items-upload-input" @input="titleChange($event,index)"
                      v-model="item.title"
                      placeholder="请输入标题"></el-input>
          </div>
          <div>
            <span class="ml10 mr10 fz14">跳转路径:</span>
            <span class="fz12 selJumpType" v-if="item.jumpType"><span class="url-title" :title="item.jumpName">{{item.jumpType|jumpType}} <span
              v-if="item.jumpName">| {{item.jumpName}}</span></span> <span class="del-url"
                                                                           @click="delItemImgUrl(index)"><i
              class="el-icon-error"></i></span></span>
            <el-dropdown trigger="click" @command="handleCommand($event,index)">
            <span class="el-dropdown-link text-cursor">{{item.jumpType?'修改':'选择跳转路径'}}<i
              class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="page">微页面</el-dropdown-item>
                <el-dropdown-item command="main_page">首页</el-dropdown-item>
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="cart">购物车</el-dropdown-item>
                <el-dropdown-item command="products">全部商品</el-dropdown-item>
                <el-dropdown-item command="product">商品</el-dropdown-item>
                <el-dropdown-item command="coupon">优惠券</el-dropdown-item>
                <el-dropdown-item command="url">自定义链接</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="picture-items-upload mb20 tac">
        <a href="javascript:;" class="file">
          <p class="picture-items-upload-plus text-cursor"> + 添加一个背景图</p>
          <p class="text-info fz14">建议宽度750像素</p>
          <input type="file" @change="uploadImgs"
                 accept="image/jpg,image/jpeg,image/png" name="">
        </a>
      </div>

    </div>

    <div class="picture-items mt20" v-if="currData.selTemplate=='one'">
      <p>图片间距:</p>
      <div class="block ml20">
        <el-slider
          @change="spacingChange"
          v-model="currData.spacing"
          :min="0"
          :max="30"
          show-input>
        </el-slider>
      </div>
    </div>


    <!-- 微页面弹窗 -->
    <el-dialog
      title="选择微页面"
      :visible.sync="isPage"
      width="800px">
      <sel-page ref="SelPage"></sel-page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isPage = false">取 消</el-button>
        <el-button type="primary" @click="SelPageClick">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 优惠券弹窗 -->
    <el-dialog
      title="选择优惠券"
      :visible.sync="isCoupon"
      width="800px">
      <SelCoupon v-if="isCoupon" ref="SelCoupon"></SelCoupon>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCoupon = false">取 消</el-button>
        <el-button type="primary" @click="SelCouponClick">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 商品弹窗 -->
    <el-dialog
      title="选择商品"
      :visible.sync="isProduct"
      width="800px">
      <SelProduct v-if="isProduct" ref="SelProduct"></SelProduct>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isProduct = false">取 消</el-button>
        <el-button type="primary" @click="SelProductClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 自定义链接弹窗 -->
    <el-dialog
      title="自定义链接"
      :visible.sync="isUrl"
      width="800px">
      <el-input v-model="url" placeholder="请填写自定义链接"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUrl = false">取 消</el-button>
        <el-button type="primary" @click="SelUrlClick">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";
  import upload from '@/utils/upload'

  const SelCoupon = () => import('./selCoupon');
  const SelPage = () => import('./selPage');
  const SelProduct = () => import('./selProduct');

  export default {
    name: "control",
    data() {
      return {
        isTemplate: true,
        isLoading: false,
        currItem: {},

        isPage: false, //微页面弹窗
        isCoupon: false, //优惠券弹窗
        isProduct: false, //商品弹窗
        isUrl: false, //自定义链接弹窗
        url: '',

        command: '',  // 为了保存跳转url的选择值
        imgI: ''   // 为了保存跳转url的选择index值
      }
    },
    components: {
      SelCoupon,
      SelPage,
      SelProduct
    },
    props: ['data'],
    mounted() {

    },
    computed: {
      ...mapState("micropage/lists/lists", {
        list: state => state.list
      }),
      currData() {
        this.data.imgs = this.data.imgs || [];
        return this.data;
      }
    },
    methods: {
      ...mapActions("micropage/lists/lists", [
        "editList"
      ]),
      selTemplate(val = 'one') {
        let idx = this.data.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.selTemplate = val;
            }
          }
          return item;
        });
        this.editList(list);
      },

      /**
       * 标题的修改
       * @param val  当前的值
       * @param imgI  当前操作的第几个
       */
      titleChange(val, imgI) {
        let idx = this.data.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.imgs.map((items, imgIdx) => {
                if (imgIdx == imgI) {
                  items.title = val
                }
                return items;
              })
            }
          }
          return item;
        });
        this.editList(list);
      },


      /**
       * 删除图片组 对应的 跳转  url
       * @param imgI  当前操作的第几个
       */
      delItemImgUrl(imgI) {
        let idx = this.data.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.imgs.map((items, imgIdx) => {
                if (imgIdx == imgI) {
                  items.jumpType = '';
                  items.jumpValue = '';
                }
                return items;
              })
            }
          }
          return item;
        });
        this.editList(list);
      },


      /**
       * 更改某个图片
       * @param e  当前文件
       * @param imgI  当前操作的第几个
       */
      uploadImg(e, imgI) {
        let files = e.target.files[0];
        let idx = this.data.index;
        let list = JSON.parse(JSON.stringify(this.list));
        this.isLoading = true;
        upload(files).then(res => {
          list.map((item, index) => {
            if (item.type == "pictureAdvertising") {
              if (item.index == idx) {
                item.imgs.map((items, imgIdx) => {
                  if (imgIdx == imgI) {
                    items.url = res.path
                  }
                  return items;
                })
              }
            }
            return item;
          });
          this.editList(list);
          this.isLoading = false;
        });
      },

      /**
       * 添加图片
       * @param e
       */
      uploadImgs(e) {
        let files = e.target.files[0];
        this.isLoading = true;
        upload(files).then(res => {
          let obj = {
            title: '',
            url: res.path
          };

          let idx = this.data.index;
          let list = JSON.parse(JSON.stringify(this.list));
          list.map((item, index) => {
            if (item.type == "pictureAdvertising") {
              if (item.index == idx) {
                item.imgs = [...item.imgs, obj];
              }
            }
            return item;
          });
          this.editList(list);
          this.selTemplate();
          this.isLoading = false;
        });
      },

      /**
       * 间距
       * @param val
       */
      spacingChange(val) {

        let idx = this.data.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.spacing = val;
            }
          }
          return item;
        });
        this.editList(list);
      },

      /**
       * 删除当前图片组
       * @param currData  总的数据
       * @param index     当前操作的第几个
       */
      delItem(currData, index) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sureClick(currData, index);
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
      sureClick(currData, imgI) {
        let idx = this.currData.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.imgs.map((items, imgIdx) => {
                if (imgIdx == imgI) {
                  item.imgs.splice(imgIdx, 1);
                }
                return items;
              })
            }
          }
          return item;
        });

        this.editList(list);  //  重置总的  list
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      },

      /**
       * 点击菜单项触发的事件回调
       * @param command
       * @param imgI  当前操作的第几个
       */
      handleCommand(command, imgI) {
        if (command == 'page') {
          this.isPage = true;
        } else if (command == 'coupon') {
          this.isCoupon = true;
        } else if (command == 'product') {
          this.isProduct = true;
        } else if (command == 'url') {
          this.isUrl = true;
          this.url = '';
        } else {
          this.editCommand(command, imgI);
        }
        this.command = command;
        this.imgI = imgI;
      },
      editCommand(command, imgI, jumpValue = null, jumpName = null) {  //  jumpValue 值要弹窗的选择 未完成
        let idx = this.data.index;
        let list = JSON.parse(JSON.stringify(this.list));
        list.map((item, index) => {
          if (item.type == "pictureAdvertising") {
            if (item.index == idx) {
              item.imgs.map((items, imgIdx) => {
                if (imgIdx == imgI) {
                  items.jumpType = command;
                  items.jumpValue = jumpValue;
                  items.jumpName = jumpName;
                }
                return items;
              })
            }
          }
          return item;
        });
        this.editList(list);
      },

      /**
       * 选择的优惠券
       * @constructor
       */
      SelCouponClick() {
        let Sel = this.$refs['SelCoupon'].currentRow;
        if (!Sel) {
          this.$message('请选择优惠券');
          return;
        }

        this.editCommand(this.command, this.imgI, Sel.id, Sel.name);
        this.isCoupon = false;
      },

      /**
       * 选择的微页面
       * @constructor
       */
      SelPageClick() {
        let Sel = this.$refs['SelPage'].currentRow;
        if (!Sel) {
          this.$message('请选择微页面');
          return;
        }

        this.editCommand(this.command, this.imgI, Sel.id, Sel.name);
        this.isPage = false;
      },

      /**
       * 选择的商品
       * @constructor
       */
      SelProductClick() {
        let Sel = this.$refs['SelProduct'].currentRow;
        if (!Sel) {
          this.$message('请选择商品');
          return;
        }

        this.editCommand(this.command, this.imgI, Sel.id, Sel.name);
        this.isProduct = false;
      },

      /**
       * 选择的自定义链接
       * @constructor
       */
      SelUrlClick() {
        let Sel = this.url;
        if (!Sel) {
          this.$message('请填写自定义链接');
          return;
        }

        this.editCommand(this.command, this.imgI, Sel, Sel);
        this.isUrl = false;
      }
    },
    filters: {
      jumpType(val) {
        switch (val) {
          case 'page':
            return '微页面';
            break;
          case 'main_page':
            return '首页';
            break;
          case 'personal':
            return '个人中心';
            break;
          case 'cart':
            return '购物车';
            break;
          case 'products':
            return '全部商品';
            break;
          case 'product':
            return '商品';
            break;
          case 'coupon':
            return '优惠券';
            break;
          case 'url':
            return '链接';
            break;
          default:
            return ''
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../styles.css";
  /* 控制层样式  */
  .pictureAdvertising-control {
    .picture-items {
      display: flex;
    }

    .picture-items > p {
      display: inline-block;
      min-width: 60px;
      font-size: 14px;
      margin: 0;
      line-height: 36px;
    }

    .picture-items-sel {
      margin-left: 10px;
      width: 100%;
      display: flex;
    }

    .picture-items-sel > div {
      flex: 1;
      cursor: pointer;
      margin: 0 10px;
      width: 105px;
      height: 105px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #e6e6e6;
      background: #fff;
      padding: 10px;
    }

    .picture-items-sel .bg {
      width: 100%;
      height: 30px;
      background: #B2DEFF;
      margin-bottom: 5px;
    }

    .picture-items-sel .wheel-bg {
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      background: #B2DEFF;
      text-align: center;
      line-height: 60px;
    }

    .picture-items-sel .wheel-bg span {
      color: #008AFF;
      font-size: 40px;
    }

    .picture-items-upload {
      border: 1px dashed #e6e6e6;
      padding: 20px 0 20px 20px;
      background: #fff;
      position: relative;
    }

    .pictureAdvertising-view-del {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
    }

    .picture-items-upload-img {
      height: 80px;
      width: 90px;
      border: 1px solid #e6e6e6;
      position: relative;
      text-align: center;
    }

    .picture-items-upload-img p {
      width: 100%;
      position: absolute;
      background: #7F7F7F;
      color: #fff;
      left: 0;
      bottom: 0;
    }

    .picture-items-upload-input {
      width: 150px;
    }

    .picture-items .block {
      width: 100%;
    }

    .picture-items-upload-info {
      width: 100%;
    }

  }

  .picture-items-upload-img {
    .file {
      position: relative;
      top: -22px;
      display: inline-block;
      overflow: hidden;
      text-decoration: none;
      text-indent: 0;
      height: 20px;
      text-align: center;
      background: rgba(0, 0, 0, .5);
    }

    span {
      color: #fff;
    }
  }

  .file {
    position: relative;
    top: 0;
    display: inline-block;
    border-radius: 4px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  .selJumpType {
    display: inline-block;
    width: 130px;
    border: 1px solid rgba(51, 136, 255, 0.3);
    background: rgb(226, 243, 255);
    color: rgb(102, 102, 102);
    vertical-align: middle;
    line-height: 18px;
    padding: 2px;
    position: relative;
  }

  .selJumpType .url-title {
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
  }

  .selJumpType .del-url {
    cursor: pointer;
    position: absolute;
    top: 2px;
    right: 2px;
  }
</style>
