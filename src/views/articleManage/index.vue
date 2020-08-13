<template>
  <div class="articleManage">
    <div class="containerTitle">
      文章列表
    </div>
    <div class="articleManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="navReleaseOrEdit(1)">文章发布</el-button>
          <div>
            <!-- 栏目选择 -->
            <el-select v-model="value" clearable  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.name">
              </el-option>
            </el-select>
            <!-- 输入框 -->
            <el-input
              placeholder="请输入内容"
              v-model="keyword"
              clearable>
            </el-input>
            <el-button type="primary" size="small">搜索</el-button>
          </div>
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
            label="标题">
          </el-table-column>
          <!-- <el-table-column
            prop="name"
            label="栏目">
          </el-table-column> -->
          <el-table-column
            label="发布日期">
              <template slot-scope="scope">
                <span>
                  {{ scope.row.publishedTime[0] + '-' + scope.row.publishedTime[1] + '-' + scope.row.publishedTime[2] + ' '
                  + scope.row.publishedTime[3] + ':' + scope.row.publishedTime[4] + ':' + scope.row.publishedTime[5] }}
                </span>
              </template>
          </el-table-column>
          <el-table-column
            prop="publishedUserName"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="clickCount"
            label="点击量">
          </el-table-column>
          <el-table-column
            prop="avgReadingTime"
            label="平均阅读时长（秒）">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="340">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="getChannelArticleList(scope.row.id)">选择栏目</el-button>
              <!-- <el-button size="small" @click="navArticleDetail(scope.row.id)">查看</el-button> -->
              <el-button type="primary" size="small" @click="navReleaseOrEdit(2, scope.row)">编辑</el-button>
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row.id)'>
                <el-button slot="reference" size="small" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <el-dialog
          title="选择栏目"
          :visible.sync="columnDialog"
          width="30%"
          center>
          <span class="articleManage-columnSet">
            <!-- 栏目选择 -->
            <div>
              栏目名称：
              <el-checkbox-group v-model="channelSelectList">
                <el-checkbox @change="changeColumn(item, $event)" :label="item.id"  v-for="(item, index) in channelList" :key="index">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </span>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="columnDialog = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确 定</el-button>
          </span> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { success } from '@/utils/index'
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      total: '',
      tableData: [],
      options: [],
      value: '',
      columnArticleId: '',
      channelList: [],
      channelArticleList: [],
      channelSelectList: [],
      keyword: '',
      articleId: '',
      channelId: '',
      channelName: '',
      columnDialog: false
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getArticleList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getArticleList()
    },
    handleClick (item) {
      this.centerDialogVisible = true
    },
    // 查看详情
    navArticleDetail () {
      this.$router.push({ path: '/articleDetail' })
    },
    navReleaseOrEdit (e, data) {
      if (e * 1 === 2) {
        this.$router.push({ path: '/articleRelease', query: { article: data } })
      } else {
        this.$router.push('/articleRelease')
      }
    },
    // 选择栏目提交
    dialogConfirm () {},
    // 获取栏目文章列表
    getChannelArticleList (id) {
      this.articleId = id
      this.$store.dispatch('channelArticleList', {
        articleId: id
      })
        .then((res) => {
          if (res.code === 1) {
            this.channelList = res.data.channelList
            this.channelArticleList = res.data.channelArticleList
            this.columnDialog = true
            this.columnArticleId = ''
            setTimeout(() => {
              this.channelSelectList = this.arrHandle(this.channelArticleList)
            }, 300)
          }
        })
    },
    // 数组处理
    arrHandle (arr) {
      let newArr = []
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          newArr.push(arr[i].channelId)
        }
      } else {
        newArr = []
      }
      return newArr
    },
    // 选择栏目
    async changeColumn (e) {
      if (event.target.checked) {
        // console.log('选中')
        this.$store.dispatch('addChannelArticle', {
          articleId: this.articleId,
          channelId: e.id
        })
          .then((res) => {
            if (res.code === 1) {
              success(res.message)
            }
          })
      } else {
        let handleArr = this.channelArticleList.filter(item => item.channelId === e.id)
        await this.$store.dispatch('delChannelArticle', handleArr[0].id)
          .then((res) => {
            if (res.code === 1) {
              success(res.message)
            }
          })
      }
    },
    // 删除文章
    delPlan (id) {
      this.$store.dispatch('delArticle', id)
        .then(res => {
          if (res.code === 1) {
            success(res.message)
            this.getArticleList()
          }
        })
    },
    // 获取文章列表
    getArticleList () {
      let postParams = {}
      postParams.channelId = this.channelId
      postParams.keyword = this.keyword
      this.$store.dispatch('articleList', {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        data: postParams
      })
        .then(res => {
          this.total = res.total
          this.tableData = res.records
        })
    }
  },
  mounted () {
    this.getArticleList()
  }
}
</script>
<style lang="scss">
.articleManage {
  padding: 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .articleManage-container {
    padding: 12px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
        > div {
          display: flex;
          .el-select {
            width: 220px;
          }
          .el-input {
            width: auto;
            margin-right: 10px;
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
              text-align: center;
            }
          }
        }
        td {
          text-align: center;
          .el-popover__reference {
            margin-left: 10px;
          }
        }
      }
    }
    .articleManage-columnSet {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
