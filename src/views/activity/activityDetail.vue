<template>
  <div class="activityDetail">
    <div class="containerTitle">
      <span @click="backActivityManage">活动设置</span> >> 活动详情
    </div>
    <div class="activityRelease-container">
      <div class="activityRelease-info">
        <h1>{{ activityDetail.title }}</h1>
        <ul>
          <li>
            <p>创建时间：</p>
            <span v-if="activityDetail.createdTime[0]">{{ activityDetail.createdTime[0] + '-' + activityDetail.createdTime[1] + '-' + activityDetail.createdTime[2] + ' '
                  + activityDetail.createdTime[3] + ':' + activityDetail.createdTime[4] + ':' + activityDetail.createdTime[5] }}</span>
          </li>
          <li>
            <p>状态：</p>
            <span>{{ activityDetail.state == 0 ? '未开始' : activityDetail.state == 1 ? '进行中' : '已结束' }}</span>
          </li>
          <li>
            <p>创建人：</p>
            <span>{{ activityDetail.createdUserName }}</span>
          </li>
        </ul>
        <img v-if="activityDetail.carouselImg" :src="readPath + activityDetail.carouselImg" alt="">
      </div>
      <div class="activityRelease-content">
        <dl>
          <dt>起止时间：</dt>
          <dd>{{ activityDetail.startTime[0] + '-' + activityDetail.startTime[1] + '-' + activityDetail.startTime[2] }}
            到 {{ activityDetail.endTime[0] + '-' + activityDetail.endTime[1] + '-' + activityDetail.endTime[2] }} </dd>
        </dl>
        <SCREEN @screenInfo = "getSCreenCrite"></SCREEN>
        <ul>
          <li>参与人数：<span>{{ activityDetail.joinedCount }}</span></li>
          <li>打卡总数：<span v-if="activityDetail.id * 1 === 3">579</span><span v-if="activityDetail.id * 1 === 4">635</span></li>
          <li>分享总数：<span v-if="activityDetail.id * 1 === 3">150</span><span v-if="activityDetail.id * 1 === 4">145</span></li>
        </ul>
        <el-table
          :data="tableData"
          border
          stripe="true"
          style="width: 100%">
          <el-table-column
            prop="rank"
            label="当前排名">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="参与人员">
          </el-table-column>
          <el-table-column
            label="所属学校"
            width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.schoolName + scope.row.campusName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="年级班级">
            <template slot-scope="scope">
              <span>{{ scope.row.gradeName + scope.row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="clockInCount"
            label="打卡次数">
          </el-table-column>
          <el-table-column
            prop="clockInScore"
            label="打卡分数">
          </el-table-column>
          <el-table-column
            prop="shareCount"
            label="分享次数">
          </el-table-column>
          <el-table-column
            prop="shareScore"
            label="分享分数">
          </el-table-column>
          <el-table-column
            prop="thumbsupCount"
            label="点赞次数">
          </el-table-column>
          <el-table-column
            prop="thumbsupScore"
            label="点赞分数">
          </el-table-column>
          <el-table-column
            prop="totalScore"
            label="总分数">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import SCREEN from './../../components/common/screen'
export default {
  data () {
    return {
      activityDetail: {},
      // 主体
      tableData: [],
      // 分页
      pageNo: 1,
      pageSize: 10,
      schoolInfo: {},
      total: '',
      detailData: {},
      keyword: '',
      searchSectionId: '',
      searchCampusId: '',
      searchClassId: '',
      searchGradeId: '',
      searchSchoolId: ''
    }
  },
  components: {
    SCREEN
  },
  computed: {
    readPath () {
      const routePath = '/activity'
      return window.location.origin + routePath + '/common/attachment?filepath='
    }
  },
  methods: {
    getSCreenCrite (data) {
      this.searchCampusId = data.searchCampusId
      this.searchSectionId = data.searchSectionId
      this.searchClassId = data.searchClassId
      this.searchGradeId = data.searchGradeId
      this.searchSchoolId = data.searchSchoolId
      this.keyword = data.keyword
      this.getScreenInfo()
    },
    // 筛选
    async getScreenInfo () {
      let getParams = {}
      getParams.schoolId = this.searchSchoolId
      getParams.searchSectionId = this.searchSectionId
      getParams.campusId = this.searchCampusId
      getParams.classId = this.searchClassId
      getParams.gradeId = this.searchGradeId
      getParams.keyword = this.keyword
      await this.$store.dispatch('totalActivitySitua', {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        activityId: this.activityDetail.id,
        getParams: getParams
      })
        .then(res => {
          this.tableData = res.records
          this.total = res.total
        })
    },
    backActivityManage () {
      this.$router.go(-1)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getScreenInfo()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getScreenInfo()
    }
  },
  async created () {
    if (this.$route.query.jsonData) {
      this.activityDetail = JSON.parse(this.$route.query.jsonData)
    }
    await this.getScreenInfo()
  }
}
</script>
<style lang="scss">
.activityDetail {
  padding: 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
    span {
      color: rgb(9, 98, 201);
      cursor: pointer;
    }
  }
  .activityRelease-container {
    padding: 32px;
    background: #fff;
    .activityRelease-info {
      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      > ul {
        display: flex;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          margin:10px 30px 10px 0;
          p {
            color: #ACACAC;
          }
        }
        li:nth-child(2) {
          span {
            color: #51D47D;
          }
        }
      }
      > img {
        display: block;
        width: 200px;
        height: 150px;
      }
    }
    .activityRelease-content {
      > dl {
        display: flex;
        margin: 10px 0;
      }
      > ul {
        display: flex;
        margin: 10px 0;
        li {
          margin-left: 20px;
          font-size: 16px;
          span {
            color: #13D071;
            font-weight: 600;
          }
        }
      }
      .el-table {
        .cell {
          text-align: center;
        }
      }
    }
  }
}
</style>
