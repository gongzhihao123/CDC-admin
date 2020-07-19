<template>
  <div class="shareManage">
    <div class="shareManage-container">
      <div class="containerTitle clearfloat">
        <span>分享管理</span>
        <!-- 筛选条件 -->
        <!-- <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="share-content">
            <img src="./../../assets/images/timg.jpg" alt="">
            <div class="share-info">
              <h2>{{ item.name }}</h2>
              <p>{{ item.content }}</p>
              <img src="./../../assets/images/timg.jpg" alt="">
              <dl>
                <dt>2020-06-11 13:55:50</dt>
                <dd @click="like(item, index)">
                  <img v-if="!item.likeFlag" :src="item.img" alt="">
                  <img v-else :src="item.activeImg" alt="">
                </dd>
              </dl>
            </div>
          </div>
          <i>
            <el-button size="small" type="primary">下架</el-button>
            <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan'>
              <el-button slot="reference" size="small" type="danger">删除</el-button>
            </el-popconfirm>
          </i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      options: [],
      tableData: [{ name: '1', id: 2 }, { name: '2', id: 2 }],
      list: [
        { name: '名称', content: '内容', likeFlag: false, img: require('./../../assets/img/praise.png'), activeImg: require('./../../assets/img/praise-active.png') },
        { name: '名称', content: '内容', likeFlag: false, img: require('./../../assets/img/praise.png'), activeImg: require('./../../assets/img/praise-active.png') },
        { name: '名称', content: '内容', likeFlag: false, img: require('./../../assets/img/praise.png'), activeImg: require('./../../assets/img/praise-active.png') }
      ]
    }
  },
  methods: {
    like (item, index) {
      console.log(index)
      if (!item.likeFlag) { // 判断是否有isShow属性
        this.$set(item, 'likeFlag', false) // 没有则为当前对象设置该属性为false
        item.likeFlag = !item.likeFlag
      } else {
        item.likeFlag = !item.likeFlag
      }
    },
    delPlan () {}
  }
}
</script>
<style lang="scss">
.shareManage {
  padding: 30px 20px;
  .shareManage-container {
    padding: 0 12px 12px 50px;
    width: 800px;
    .containerTitle {
      width: 100%;
      margin-bottom: 10px;
      > span {
        border-left: 4px solid rgb(9, 98, 201);
        padding-left: 5px;
      }
      .el-select {
        float: right;
      }
    }
    > ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 10px;
        padding: 30px 20px;
        background: #fff;
        .share-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          > img {
            display: inline-block;
            width: 60px;
            height: 60px;
            margin-right: 10px;
            border-radius: 60px;
          }
          .share-info {
            display: flex;
            flex-direction: column;
            h2 {
              font-size: 16px;
            }
            p {
              margin: 8px 0;
              width: 350px;
              overflow: hidden;
              line-height: 1.5;
              text-overflow: ellipsis;
              display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示。*/
              -webkit-line-clamp: 3; /*设置需要显示的行数*/
              -webkit-box-orient: vertical; /*设置伸缩盒子的子元素排列方式(从上到下垂直排列)*/
            }
            > img {
              max-width: 300px;
            }
            dl {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
              dd {
                cursor: pointer;
                > img {
                  width: 30px;
                }
              }
            }
          }
        }
        i {
          font-style: normal;
          .el-button {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
</style>
