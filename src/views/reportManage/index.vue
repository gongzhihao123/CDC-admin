<template>
  <div class="reportManage">
    <div class="containerTitle">
      举报处理
    </div>
    <div class="reportManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
           <el-radio-group v-model="handleState" @change="changeHandleState">
            <el-radio :label="1">未处理</el-radio>
            <el-radio :label="2">已处理</el-radio>
          </el-radio-group>
          <!-- 举报原因筛选 -->
          <el-select v-model="resonScreen" clearable @change="chanegReson" placeholder="所有举报原因">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
  <!-- 表格主体 -->

      <div class="content">
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              label="举报原因">
              <template slot-scope="scope">
                <span>{{ scope.row.reason === 1 ? '色情低俗' : scope.row.reason === 2 ? '政治敏感' : scope.row.reason === 3 ? '广告垃圾信息' : scope.row.reason === 4 ? '病毒木马' : '其他' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="studentName"
              label="举报人">
            </el-table-column>
            <el-table-column
              label="处理状态">
              <template slot-scope="scope">
                <span>{{ scope.row.state === 0 ? '未处理' : scope.row.state === 1 ? '忽略' : scope.row.state === 2 ? '下架' : scope.row.state === 3 ? '删除' : ''}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope" >
                <el-button size="small" type="primary" @click="lookCheck(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        title="举报内容"
        :visible.sync="reportDialog"
        width="30%">
        <!-- 未处理 -->
        <span class="reportBox" v-if="handleState * 1 === 1">
          <div class="report-content">
            <img :src="shareInfo.wechatUserImg" alt="">
            <div class="report-info">
              <h2>{{shareInfo.studentName}}</h2>
              <p>{{shareInfo.content}}</p>
              <img v-if="shareInfo.contentImg" :src="readPath + shareInfo.contentImg" alt="">
              <dl>
                <dt v-if="shareInfo.createdTime">{{ shareInfo.createdTime[0] + '-' + shareInfo.createdTime[1] + '-' + shareInfo.createdTime[2] + ' ' + shareInfo.createdTime[3] + ':'
                  + shareInfo.createdTime[4] + ':' + shareInfo.createdTime[5] }}</dt>
                <dd>
                  {{ shareInfo.thumbsupNumber }}
                  <img src="./../../assets/img/praise.png" alt="">
                </dd>
              </dl>
            </div>
          </div>
          <ul class="report-info">
            <li>举报原因：{{ reportContent.reason === 1 ? '色情低俗' : reportContent.reason === 2 ? '政治敏感' : reportContent.reason === 3 ? '广告垃圾信息' : reportContent.reason === 4 ? '病毒木马' : '其他' }}</li>
            <li>举报人：{{reportContent.studentName}}</li>
          </ul>
        </span>
        <!-- 已处理 -->
        <span class="reportBox" v-if="handleState * 1 === 2">
          <div class="report-content">
            <img :src="shareInfo.wechatUserImg" alt="">
            <div class="report-info">
              <h2>{{shareInfo.studentName}}</h2>
              <p>{{shareInfo.content}}</p>
              <img v-if="shareInfo.contentImg" :src="readPath + shareInfo.contentImg" alt="">
              <dl>
                <dt v-if="shareInfo.createdTime">{{ shareInfo.createdTime[0] + '-' + shareInfo.createdTime[1] + '-' + shareInfo.createdTime[2] + ' ' + shareInfo.createdTime[3] + ':'
                  + shareInfo.createdTime[4] + ':' + shareInfo.createdTime[5] }}</dt>
                <dd>
                  {{ shareInfo.thumbsupNumber }}
                  <img src="./../../assets/img/praise.png" alt="">
                </dd>
              </dl>
            </div>
          </div>
          <ul class="report-info">
            <li>举报原因：{{ reportContent.reason === 1 ? '色情低俗' : reportContent.reason === 2 ? '政治敏感' : reportContent.reason === 3 ? '广告垃圾信息' :
              reportContent.reason === 4 ? '病毒木马' : '其他' }}{{ '(' + reportContent.reasonContent + ')' }}</li>
            <li>举报人：{{reportContent.studentName}}</li>
            <li>处理结果：{{ reportContent.state === 0 ? '未处理' : reportContent.state === 1 ? '忽略' : reportContent.state === 2 ? '下架' : '删除' }}</li>
            <li v-if="reportContent.dealTime">处理时间：{{ reportContent.dealTime[0] + '-' + reportContent.dealTime[1] + '-' + reportContent.dealTime[2] + ' ' + reportContent.dealTime[3] + ':'
                  + reportContent.dealTime[4] + ':' +reportContent.dealTime[5]}}</li>
          </ul>
        </span>
        <span slot="footer" v-if="handleState * 1 === 1" class="dialog-footer">
          <el-button @click="reporthandle(1)">忽略此投诉</el-button>
          <el-button type="primary" @click="reporthandle(2)">下架</el-button>
          <el-button type="primary" @click="reporthandle(3)">删除投诉内容</el-button>
        </span>
        <span slot="footer" v-if="handleState * 1 === 2" class="dialog-footer">
          <el-button @click="reportDialog = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { success } from '@/utils/index'
export default {
  data () {
    return {
      handleState: 1,
      // 主体
      tableData: [],
      state: '0',
      reason: '',
      // 分页
      currentPage: 5,
      reportId: '',
      shareId: '',
      total: '',
      pageNo: 1,
      pageSize: 10,
      reportDialog: false,
      reportContent: {},
      shareInfo: {},
      options: [{ id: '1', name: '色情低俗', checked: false },
        { id: '2', name: '政治敏感', checked: false },
        { id: '3', name: '广告垃圾信息', checked: false },
        { id: '4', name: '病毒木马', checked: false },
        { id: '5', name: '其他', checked: false }],
      resonScreen: ''
    }
  },
  computed: {
    readPath () {
      return window.location.origin + '/activity/common/attachment?filepath='
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getReportLis()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getReportLis()
    },
    handleClick (item) {
      console.log(item)
      this.reportDialogVisible = true
    },
    // 查看按钮
    lookCheck (e) {
      this.getShareInfo(e.shareId)
      this.reportContent = e
      console.log(this.reportContent)
      this.reportId = e.id
      this.shareId = e.shareId
      this.reportDialog = true
    },
    // 获取分享信息
    async getShareInfo (id) {
      await this.$store.dispatch('reportShare', id)
        .then((res) => {
          if (res.code === 1) {
            this.shareInfo = res.data
          }
        })
    },
    // 选择原因
    chanegReson (e) {
      this.reason = e
      this.getReportLis()
    },
    // 选择是否处理
    changeHandleState (e) {
      this.handleState = e
      if (e * 1 === 2) {
        let page = {}
        let postParams = {}
        page.pageNo = this.pageNo
        page.pageSize = this.pageSize
        postParams.reason = this.reason
        postParams.state = ''
        this.$store.dispatch('reportPage', {
          page: page,
          data: postParams
        })
          .then((res) => {
            if (res.code === 1) {
              this.tableData = res.data.records
              this.total = res.data.total
            }
          })
      } else {
        this.getReportLis()
      }
    },
    // 获取举报列表
    getReportLis () {
      let page = {}
      let postParams = {}
      page.pageNo = this.pageNo
      page.pageSize = this.pageSize
      postParams.reason = this.reason
      postParams.state = this.state
      this.$store.dispatch('reportPage', {
        page: page,
        data: postParams
      })
        .then((res) => {
          if (res.code === 1) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
    },
    // 举报处理
    reporthandle (e) {
      let postParams = {}
      postParams.shareId = this.shareId
      postParams.state = e
      this.$store.dispatch('reportDeal', {
        url: this.reportId,
        data: postParams
      })
        .then(res => {
          if (res.code === 1) {
            success(res.message)
            this.getReportLis()
            this.reportDialog = false
          }
        })
    },
    delPlan () {}
  },
  mounted () {
    this.getReportLis()
  }
}
</script>
<style lang="scss">
.reportManage {
  padding: 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .reportManage-container {
    padding: 12px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-radio-group {
          .el-radio {
            .el-radio__input {
              display: none;
            }
          }
        }
      }
    }
    .content {
      margin: 20px 0;
      .el-table {
        max-height: 740px;
        overflow: auto;
        .el-table__header {
          th {
            background-color: #e0e0e0;
            .cell {
              text-align: report;
            }
          }
        }
        td {
          text-align: report;
          .el-popover__reference {
            margin-left: 10px;
          }
        }
      }
    }
    .el-pagination {
      text-align: report;
    }
    .el-dialog__wrapper {
      .el-dialog__body {
        .reportBox {
          .report-content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-bottom: 10px;
            border-bottom: 1px solid #F3F3F3;
            > img {
              display: inline-block;
              width: 60px;
              height: 60px;
              margin-right: 10px;
              border-radius: 60px;
            }
            .report-info {
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
                margin-bottom: 5px;
              }
              dl {
                display: flex;
                justify-content: space-between;
                align-items: center;
                dd {
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  > img {
                    width: 18px;
                    margin-left: 3px;
                  }
                }
              }
            }
          }
          .report-info {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            li {
              display: flex;
              margin: 3px 70px;
            }
          }
        }
      }
      .el-dialog__footer {
        .el-button {
          padding: 10px 14px;
        }
      }
    }
  }
}
</style>
