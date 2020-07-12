<template>
  <div class="column">
    <div class="containerTitle">
      栏目设置
    </div>
    <div class="column-container">
       <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="openDiaolog(1)">添加栏目</el-button>
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
              prop="date"
              label="学段代码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="学段名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="入学年龄">
            </el-table-column>
            <el-table-column
              prop="address"
              label="学制">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="openDiaolog(2,scope.row)">编辑</el-button>
                <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
                  <el-button slot="reference" size="small" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-dialog
        :title="addOrEdit ? '编辑' : '添加'"
        :visible.sync="columnDialog"
        width="30%"
        center>
        <span>
          栏目名称：<el-input placeholder="请输入内容" v-model="columnName" clearable></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="columnDialog = false">取 消</el-button>
          <el-button type="primary" @click="columnDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 主体
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' }],
      // 分页
      currentPage: 5,
      columnDialog: false,
      addOrEdit: false,
      columnName: ''
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
    delPlan () {},
    openDiaolog (e, data) {
      if (e * 1 === 1) {
        this.addOrEdit = false
        // 添加
      } else {
        this.addOrEdit = true
        // 编辑
      }
      this.columnDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
.column {
  padding: 30px 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .column-container {
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
    .el-dialog__wrapper {
      .el-dialog__body {
        text-align: center;
        .el-input {
          width: 300px;
        }
      }
    }
  }
}
</style>
