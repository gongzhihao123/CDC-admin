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
          :span-method="cellMerge"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="name"
            label="学校">
          </el-table-column>
          <!-- <el-table-column
            prop="amount2"
            label="校区">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="所属学段">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="班级">
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
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
        :current-page="pageNo"
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
      pageSize: 10,
      pageNo: 1,
      total: '',
      spanArr: [],
      position: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getSchoolList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getSchoolList()
    },
    edit (item) {
      this.$router.push({ path: '/schoolAdd', query: { schoolId: item.id, schoolName: item.name, campusFlag: item.campusFlag, isEdit: true } })
    },
    // 删除学校
    delPlan (res) {
      this.$store.dispatch('delSchool', res.id)
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getSchoolList()
          }
        })
    },
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
    },
    getSpanArr (data) {
      this.spanArr = [] // 避免表格错乱！
      data.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (data[index].id === data[index - 1].id) { // 这里是要合并行
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },
    cellMerge ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // 对第一列进行合并
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 获取学校分页列表
    async getSchoolList () {
      await this.$store.dispatch('schoolList', {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then((res) => {
          this.tableData = res.records
          this.total = res.total
        })
    }
  },
  async mounted () {
    await this.getSchoolList()
    this.getSpanArr(this.tableData)
  }
}
</script>
<style lang="scss">
.schoolManage {
  padding: 20px;
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
