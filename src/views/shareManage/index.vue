<template>
  <div class="shareManage">
    <div class="shareManage-container">
      <div class="containerTitle clearfloat">
        <span>分享管理</span>
        <div>
          <!-- 筛选条件 -->
          <el-date-picker
            v-model="time"
            type="date"
            @change="changeTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-select v-model="activityScreen" @change="changeActivity" clearable placeholder="请选择">
            <el-option
              v-for="item in allActivity"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in shareList" :key="index">
          <div class="share-content">
            <img :src="item.wechatUserImg" alt="">
            <div class="share-info">
              <h2>{{ item.studentName }}</h2>
              <p>{{ item.content }}</p>
              <img v-if="item.contentImg" :src="readPath + item.contentImg" alt="">
              <dl>
                <dt>{{ item.createdTime[0] + '-' + item.createdTime[1] + '-' + item.createdTime[2] + ' ' + item.createdTime[3] + ':' + item.createdTime[4] + ':' +item.createdTime[5]}}</dt>
                <dd @click="like(item, index)">
                  <img v-if="!item.likeFlag" :src="item.img" alt="">
                  <img v-else :src="item.activeImg" alt="">
                </dd>
              </dl>
            </div>
          </div>
          <i>
            <el-button v-if="!item.topFlag" size="small" type="primary" @click="shareTop(item.id)">置顶</el-button>
            <el-button v-if="item.topFlag" size="small" type="primary" @click="unShareTop(item.id)">取消置顶</el-button>
            <el-button v-if="item.state * 1 === 1" size="small" type="primary" @click="shareOffline(item.id)">下架</el-button>
            <el-button v-if="item.state * 1 === 2" size="small" type="primary" @click="shareUnOffline(item.id)">取消下架</el-button>
            <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(item.id)'>
              <el-button slot="reference" size="small" type="danger">删除</el-button>
            </el-popconfirm>
          </i>
        </li>
      </ul>
      <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { success } from '@/utils/index'
export default {
  data () {
    return {
      time: this.getNowTime(),
      activityScreen: '',
      allActivity: [],
      shareList: [],
      currentPage: 1,
      pageNo: 1,
      pageSize: 8,
      total: ''
    }
  },
  computed: {
    readPath () {
      const routePath = '/activity'
      return window.location.origin + routePath + '/common/attachment?filepath='
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
    // 更改时间
    changeTime (e) {
      this.time = e
      this.getShareList()
    },
    // 选择活动
    changeActivity (e) {
      // let arr = this.allActivity.filter(item => item.id * 1 === e * 1)
      // this.activityId = arr[0].id
      this.activityId = e
      this.getShareList()
    },
    // 下架
    shareOffline (id) {
      this.$store.dispatch('offline', id)
        .then(res => {
          success(res.message)
          this.getShareList()
        })
    },
    // 取消下架
    shareUnOffline (id) {
      this.$store.dispatch('unoffline', id)
        .then(res => {
          success(res.message)
          this.getShareList()
        })
    },
    // 置顶
    shareTop (id) {
      this.$store.dispatch('shareTop', id)
        .then(res => {
          success(res.message)
          this.getShareList()
        })
    },
    // 取消置顶
    unShareTop (id) {
      this.$store.dispatch('unShareTop', id)
        .then(res => {
          this.getShareList()
          success(res.message)
        })
    },
    // 删除
    delPlan (id) {
      this.$store.dispatch('delShare', id)
        .then(res => {
          this.getShareList()
          success(res.message)
        })
    },
    // 获取进行中活动列表
    getAllActivity () {
      this.$store.dispatch('shareActivityList')
        .then(res => {
          this.allActivity = res.data
        })
    },
    // 处理默认选中当前日期
    getNowTime () {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      // var hour = 'T00:00:00' // 默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      console.log(defaultDate)
      return defaultDate
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getShareList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getShareList()
    },
    // 获取分享列表
    getShareList () {
      let page = {}
      page.pageNo = this.pageNo
      page.pageSize = this.pageSize
      let postParms = {}
      postParms.activityId = this.activityScreen
      postParms.date = this.time
      this.$store.dispatch('sharePage', {
        page: page,
        data: postParms
      })
        .then(res => {
          this.shareList = res.data.records
          this.total = res.data.total
        })
    }
  },
  mounted () {
    this.getAllActivity()
    this.getShareList()
  }
}
</script>
<style lang="scss">
.shareManage {
  padding: 20px;
  .shareManage-container {
    padding: 0 12px 12px 50px;
    width: 980px;
    .containerTitle {
      width: 100%;
      margin-bottom: 10px;
      > span {
        border-left: 4px solid rgb(9, 98, 201);
        padding-left: 5px;
      }
      > div {
        float: right;
        margin-top: -10px;
        .el-select {
          margin-left: 10px;
        }
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
            // height: 60px;
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
