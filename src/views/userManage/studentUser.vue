<template>
  <div class="studentUser">
    <div class="containerTitle">
      学生用户
    </div>
    <div class="studentUser-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <SCREEN @getSchool="getSchool"></SCREEN>
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
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import SCREEN from './../../components/common/screen'
export default {
  data () {
    return {
      // 主体
      tableData: [],
      // 分页
      currentPage: 4,
      studentDialogVisible: false
    }
  },
  components: {
    SCREEN
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
    },
    // 筛选
    getSchool (data) {
      console.log('ss', data)
    }
  }
}
</script>
<style lang="scss">
.studentUser {
  padding: 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .studentUser-container {
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
}
</style>
