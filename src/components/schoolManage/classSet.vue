<template>
  <div class="classSet">
    <div class="classBox">
      <h3>怀柔二中</h3>
      <div class="classHandle">
        <ul>
          <li>
            <p>校区：</p>
            <el-radio-group v-model="radio">
              <el-radio :label="3">A校区</el-radio>
              <el-radio :label="6">B校区</el-radio>
            </el-radio-group>
          </li>
          <li>
            <p>年级：</p>
            <el-radio-group v-model="radio">
              <el-radio :label="3">A校区</el-radio>
              <el-radio :label="6">B校区</el-radio>
            </el-radio-group>
          </li>
          <li>
            <p>年级：</p>
            <el-radio-group v-model="radio">
              <el-radio :label="3">A校区</el-radio>
              <el-radio :label="6">B校区</el-radio>
            </el-radio-group>
          </li>
        </ul>
        <span>
          <el-button type="primary" size="small" @click="addClass(1)">一键开班</el-button>
          <el-button type="primary" size="small" @click="addClass(2)">添加班级</el-button>
        </span>
      </div>
      <el-table
        :data="tableData"
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
            <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
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
      <el-dialog
        :title="isAdd * 1 === 1 ? '一键开班' : '添加班级'"
        :visible.sync="classSetDialog"
        width="30%"
        center>
        <span>
          <li >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>年级：</span>
            <el-select v-model="period" clearable placeholder="请选择">
              <el-option
                v-for="item in periodList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li v-if="isAdd * 1 === 1">
            &nbsp;&nbsp;&nbsp;<span>班级数：</span>
            <el-input placeholder="请输入班级数" v-model="gradeName" clearable></el-input>
          </li>
          <li v-if="isAdd * 1 === 2">
            <span>班级名称：</span>
            <el-input placeholder="请输入班级名称" v-model="gradeName" clearable></el-input>
          </li>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="classSetDialog = false">取 消</el-button>
          <el-button type="primary" @click="classSetDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: 1,
      tableData: [],
      // 分页
      currentPage: 5,
      classSetDialog: false,
      isAdd: 1,
      periodList: [],
      period: '',
      gradeName: ''
    }
  },
  methods: {
    addClass (e) {
      this.isAdd = e
      this.classSetDialog = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss">
.classSet {
  display: flex;
  justify-content: center;
  .classBox {
    width: 700px;
    h3 {
      margin-bottom: 20px;
    }
    .classHandle {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      ul {
        li {
          display: flex;
          margin: 10px 0;
          .el-radio-group {
            .el-radio {
              .el-radio__input {
                display: none;
              }
            }
          }
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog__body {
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          .el-input {
            width: 200px;
          }
          .el-select {
            width: 200px;
          }
          > span::before {
            content: '*';
            color: #f00;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
