<template>
  <div class="schoolManage">
    <div class="containerTitle">
      学校设置
    </div>
    <div class="schoolManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="$router.push('/schoolAdd')">添加学校</el-button>
        </el-col>
      </el-row>
  <!-- 表格主体 -->

      <div class="content">
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="数值 1（元）">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="数值 2（元）">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="数值 3（元）">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleClick(scope.row)">编辑</el-button>
              <!-- <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
                <el-button slot="reference" size="small" type="danger">删除</el-button>
              </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 主体
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      schoolDialogVisible: false
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
      this.schoolDialogVisible = true
    },
    delPlan () {},
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 !== 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  },
  mounted () {}
}
</script>
<style lang="scss">
.schoolManage {
  padding: 30px 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .schoolManage-container {
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
              text-align: school;
            }
          }
        }
        td {
          text-align: school;
          .el-popover__reference {
            margin-left: 10px;
          }
        }
      }
    }
    .el-pagination {
      text-align: school;
    }
  }
}
</style>
