<template>
  <div class="studentManage">
    <!-- 搜索表头 -->
    <!-- <el-row>
      <el-col>
        <el-button type="primary" @click="$router.push('/portal')">新增</el-button>
        <div class="header-search">
          <template>
            <el-select v-model="searchValue" placeholder="所有区域">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <el-input
            placeholder="请输入学校名称或代码"
            v-model="searchInput"
            clearable>
          </el-input>
          <el-button type="success" @click="login">搜索</el-button>
        </div>
      </el-col>
    </el-row> -->
<!-- 表格主体 -->

    <div class="content">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="教育ID"
            width="180">
            <template slot-scope='scope'>
              <span>{{scope.row.date}} <i>临</i></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="address"
            label="出生日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="所属学校">
          </el-table-column>
          <el-table-column
            prop="address"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="address"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="address"
            label="家长姓名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="现住详细地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="班主任姓名">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <!-- <el-button @click="handleClick(scope.row)" type="primary" >查看</el-button> -->
              <el-button type="primary" @click="handleClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      studentDialogVisible: false
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
      this.studentDialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
  .studentManage {
    padding: 30px 20px;
    .el-row {
      .el-col {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>.el-button {
          padding: 9px 20px;
        }
        .header-search {
          .el-select {
            width: 150px;
            .el-input {
              width: 150px;
              margin: auto;
            }
          }
          .el-input {
            width: 220px;
            margin: 0 10px;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
.studentManage {
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
      }
      td:first-child {
        .cell {
          span {
            i {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              font-style: normal;
              background: #67C23A;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
