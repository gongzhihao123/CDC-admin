<template>
  <div class="classManage">
    <!-- 搜索表头 -->
    <!-- <el-row>
      <el-col>
        <el-button type="primary" @click="$router.push('/portal')">添加班级</el-button>
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
            label="班级代码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="班级名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="所属学校">
          </el-table-column>
          <el-table-column
            prop="address"
            label="学段范围">
          </el-table-column>
          <el-table-column
            prop="address"
            label="班主任">
          </el-table-column>
          <el-table-column
            prop="address"
            label="班级学生数">
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
      :current-page="currentPage"
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
      currentPage: 5,
      classDialogVisible: false
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
      this.classDialogVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
  .classManage {
    margin-left: 230px;
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
.classManage {
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
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
