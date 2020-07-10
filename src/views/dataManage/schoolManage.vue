<template>
  <div class="schoolManage">
    <!-- 搜索表头 -->
    <el-row>
      <el-col>
        <el-button type="primary">添加学校</el-button>
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
            label="学校代码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="address"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="address"
            label="区域划分">
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
    <!-- 添加弹框 -->
    <el-dialog
      title="编辑单位信息"
      :visible.sync="schoolDialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="schoolDialogVisible">
        <el-form ref="schoolForm" :model="schoolForm" class="demo-ruleForm" :rules="rules" >
          <el-form-item label="单位名称:">
            北京市丰台区西罗园第五中学
          </el-form-item>
          <el-form-item label="联系人：" prop='name'>
            <el-input v-model="schoolForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop='phone'>
            <el-input v-model.number="schoolForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="区域划分:" prop="region">
            <el-radio-group v-model="schoolForm.region">
              <el-radio label="城区"></el-radio>
              <el-radio label="平原"></el-radio>
              <el-radio label="山区"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单位地址:" prop="address">
            <el-input v-model="schoolForm.address"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="schoolDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="schoolDefine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    // 添加学生账号的正则
    let validPhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      msg: '',
      options: [{ value: '选项1', label: '黄金糕' }, { value: '选项5', label: '北京烤鸭' }],
      searchValue: '',
      searchInput: '',
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
      schoolDialogVisible: false,
      schoolForm: {
        name: '',
        region: '',
        phone: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login () {
      await this.$store.dispatch('login', {
        account: 'zhouling',
        password: '123456'
      })
        .then(res => {
          this.msg = res
        })
    },
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$refs['schoolForm'].resetFields()
        })
        .catch(_ => {})
    },
    // 弹框确认
    schoolDefine () {
      this.$refs['schoolForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.schoolDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" >
  .schoolManage {
    padding: 30px 20px;
    .el-row {
      .el-col {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
.schoolManage {
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
  .el-dialog {
    .el-dialog__body {
      .schoolDialogVisible {
        padding-left: 10%;
        .el-form {
          .el-form-item {
            .el-input {
              width: 60%;
            }
            .el-form-item__error {
              padding-left: 20%;
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
