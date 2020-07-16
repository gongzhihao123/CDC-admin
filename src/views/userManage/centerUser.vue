<template>
  <div class="centerManage">
    <div class="containerTitle">
      中心用户
    </div>
    <div class="centerManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="openDialog(1)">添加用户</el-button>
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
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="account"
              label="账号">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" @click="openDialog(3, scope.row)">重置密码</el-button>
                <el-button size="small" type="primary" @click="openDialog(2, scope.row)">编辑</el-button>
                <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
                  <el-button slot="reference" size="small" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        :title="addOrEdit === 1 ? '添加' : addOrEdit === 2 ? '编辑' : '密码重置' "
        :visible.sync="centerUserDialog"
        width="30%"
        center>
        <span>
          <li v-if="addOrEdit !== 3">
            姓名：<el-input placeholder="请输入内容" v-model="userName" clearable></el-input>
          </li>
          <li v-if="addOrEdit !== 3">
            账号：<el-input placeholder="请输入内容" v-model="userAccount" clearable></el-input>
          </li>
          <li v-if="addOrEdit === 3">
            新密码：<el-input placeholder="请输入内容" v-model="newPassword" clearable></el-input>
          </li>
          <li v-if="addOrEdit === 3">
            旧密码：<el-input placeholder="请输入内容" v-model="oldPassWord" clearable></el-input>
          </li>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmDefine">确 定</el-button>
        </span>
      </el-dialog>
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
      currentPage: 1,
      pageNo: 1,
      pageSize: 10,
      total: '',
      centerUserDialog: false,
      addOrEdit: 1,
      userId: '',
      userName: '',
      userAccount: '',
      newPassword: '',
      oldPassWord: ''
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
    delPlan (res) {
      this.$store.dispatch('delUser', res.id)
        .then((res) => {
          if (res.code === 1) {
            this.getUserList()
            success(res.message)
          }
        })
    },
    openDialog (e, data) {
      if (e === 1) {
        // 添加
        this.userName = ''
        this.userAccount = ''
        this.centerUserDialog = true
        this.addOrEdit = 1
      } else if (e === 2) {
        this.addOrEdit = 2
        this.userId = data.id
        this.userName = data.name
        this.userAccount = data.account
        this.centerUserDialog = true
      } else {
        this.addOrEdit = 3
        this.userId = data.id
        this.newPassword = ''
        this.oldPassWord = ''
        this.centerUserDialog = true
      }
    },
    // 提交确认
    confirmDefine () {
      console.log(this.addOrEdit)
      if (this.addOrEdit === 1) {
        // 添加
        this.$store.dispatch('addUser', {
          account: this.userAccount,
          name: this.userName
        })
          .then(() => {
            this.getUserList()
            this.centerUserDialog = false
          })
      } else if (this.addOrEdit === 2) {
        // 编辑
        let postParam = {}
        postParam.name = this.userName
        postParam.account = this.userAccount
        let uId = this.userId
        this.$store.dispatch('editUser', {
          url: uId,
          data: postParam
        })
          .then((res) => {
            if (res.code === 1) {
              this.getUserList()
              success(res.message)
              this.centerUserDialog = false
            }
          })
      } else {
        // 重置密码
        let postParam = {}
        postParam.newPassword = this.newPassword
        postParam.oldPassword = this.newPassword
        this.$store.dispatch('resetUser', {
          url: this.userId,
          data: postParam
        })
          .then((res) => {
            if (res.code === 1) {
              this.getUserList()
              success(res.message)
              this.centerUserDialog = false
            }
          })
      }
    },
    getUserList () {
      this.$store.dispatch('userList', {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then((res) => {
          this.tableData = res.records
          this.total = res.total
        })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>
<style lang="scss">
.centerManage {
  padding: 30px 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .centerManage-container {
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
        li {
          margin: 5px 0;
          .el-input {
            width: 300px;
          }
        }
      }
    }
  }
}
</style>
