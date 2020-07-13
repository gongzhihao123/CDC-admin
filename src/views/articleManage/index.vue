<template>
  <div class="articleManage">
    <div class="containerTitle">
      文章列表
    </div>
    <div class="articleManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="$router.push('/articleRelease')">文章发布</el-button>
          <div>
            <!-- 栏目选择 -->
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
            prop="date"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="岗位名称">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="navArticleDetail(scope.row)">查看</el-button>
              <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='handleClick(scope.row)'>
                <el-button slot="reference" size="small" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
      tableData: [{ name: 1 }],
      options: [],
      value: '',
      keyword: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleClick (item) {
      console.log(item)
      this.centerDialogVisible = true
    },
    // 查看详情
    navArticleDetail () {
      this.$router.push('/articleDetail')
    }
  }
}
</script>
<style lang="scss" scoped>
.articleManage {
  padding: 30px 20px;
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
            width: 300px;
          }
          .el-input {
            margin: 0 10px;
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
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
