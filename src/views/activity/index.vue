<template>
  <div class="activityManage">
    <div class="containerTitle">
      活动设置
    </div>
    <div class="activityManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="goActivityRelease(1)">发布活动</el-button>
        </el-col>
      </el-row>
  <!-- 表格主体 -->

      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            label="活动标题">
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scope">
              <span>
                {{ scope.row.createdTime[0] + '-' + scope.row.createdTime[1] + '-' + scope.row.createdTime[2] + ' '
                  + scope.row.createdTime[3] + ':' + scope.row.createdTime[4] + ':' + scope.row.createdTime[5] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdUserName"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="joinedCount"
            label="参与人数">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.state == 0 ? '未开始' : scope.row.state == 1 ? '进行中' : '已结束' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="340">
            <template slot-scope="scope">
              <el-button v-if="scope.row.state == 0" size="small" type="success" @click="changeActivityState(1, scope.row.id)">发布</el-button>
              <el-button v-if="scope.row.state == 1" size="small" type="info" @click="changeActivityState(2, scope.row.id)">结束</el-button>
              <el-button size="small" type="primary" @click="viewStatistics(scope.row)">查看统计</el-button>
              <!-- <el-button size="small" type="primary" @click="goActivityRelease(2, scope.row)">编辑</el-button> -->
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row.id)'>
                <el-button slot="reference" size="small" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]"
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
      // 主体
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      total: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getActivityList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getActivityList()
    },
    handleClick (item) {
      console.log(item)
    },
    delPlan (e) {
      this.$store.dispatch('delActivity', e)
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getActivityList()
          }
        })
    },
    // 跳转添加编辑页面
    goActivityRelease (e, data) {
      if (e === 1) {
        // 添加
        this.$router.push({ path: '/activityRelease', query: { isAdd: true } })
      } else {
        // 编辑
        this.$router.push({ path: '/activityRelease', query: { isAdd: false, data: data } })
      }
    },
    // 修改状态
    changeActivityState (e, data) {
      let postParms = {}
      postParms.state = e
      this.$store.dispatch('editActivityState', {
        url: data,
        data: postParms
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getActivityList()
          }
        })
    },
    // 查看统计跳转
    viewStatistics (data) {
      this.$router.push({ path: '/activityDetail', query: { } })
    },
    getActivityList () {
      this.$store.dispatch('activityList', {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then((res) => {
          if (res.code === 1) {
            this.tableData = res.data.records
          }
        })
    }
  },
  mounted () {
    this.getActivityList()
  }
}
</script>
<style lang="scss">
.activityManage {
  padding: 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .activityManage-container {
    padding: 12px;
    background: #fff;
    .content {
      margin: 20px 0;
      .el-table {
        max-height: 740px;
        overflow: auto;
        .el-table__header {
          th {
            background-color: #e0e0e0;
            .cell {
              text-align: activity;
            }
          }
        }
        td {
          text-align: activity;
          .el-popover__reference {
            margin-left: 10px;
          }
        }
      }
    }
    .el-pagination {
      text-align: activity;
    }
  }
}
</style>
