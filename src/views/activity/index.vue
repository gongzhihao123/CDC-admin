<template>
  <div class="structure">
    <!-- 组织架构树形组件 -->
    <div class="structure-tree">
      <el-input
        placeholder="请输入部门名称"
        v-model="filterText">
      </el-input>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="组织架构" name="first">
          <div class="tree">
            <!-- <el-tree
              ref="deptTree"
              :load="loadNode"
              :props="defaultProps"
              node-key="id"
              :expand-on-click-node="false"
              :lazy="true"
              accordion
              >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <img @click="edit(node, data)" src="@/assets/img/structrue-edit.png" alt="">
                  <img @click="remove(node, data)" src="@/assets/img/structrue-detail.png" alt="">
                  <img @click.stop="append(node, data)" src="@/assets/img/structrue-add.png" alt="">
                </span>
              </span>
            </el-tree> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色" name="second">
          <div class="tree">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 组织架构表格 -->
    <div class="structure-main">
      <div>
        <el-button @click="addMembers" type="primary">添加成员</el-button>
        <el-button type="text">批量导入成员</el-button>
        <el-button type="text">模板下载</el-button>
        <div class="header-search">
          <el-input
            placeholder="请输入姓名、账号或人员代码"
            v-model="searchInput"
            clearable>
          </el-input>
        </div>
      </div>
      <div class="structure-content">
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="人员代码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              label="账号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="手机号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="部门"
              width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              label="职位"
              width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              label="角色"
              width="50">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="primary" >查看</el-button> -->
                <el-button size="mini" type="primary" @click="compile(scope.row)"><i></i><p>编辑</p> </el-button>
                <el-button size="mini" type="warning" @click="resetpass(scope.row)"><i></i><p>重置密码</p></el-button>
                <el-button size="mini" type="danger" @click="prohibit(scope.row)"><i></i><p>禁用</p></el-button>
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
    <!-- 添加弹框 -->
    <el-dialog
      title="编辑单位信息"
      :visible.sync="structureDialogVisible"
      width="30%"
      >
      <div class="structureDialogVisible">
        <el-form ref="structureForm" :model="structureForm" class="demo-ruleForm" :rules="rules" >
          <el-form-item label="单位名称:">
            北京市丰台区西罗园第五中学
          </el-form-item>
          <el-form-item label="联系人：" prop='name'>
            <el-input v-model="structureForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="region">
            <el-radio-group v-model="structureForm.region">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账号:" prop="address">
            <el-input v-model="structureForm.address"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="address">
            <el-input v-model="structureForm.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop='phone'>
            <el-input v-model.number="structureForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="部门:" prop="address">
            <el-input v-model="structureForm.address"></el-input>
          </el-form-item>
          <el-form-item label="职业:" prop="address">
            <el-input v-model="structureForm.address"></el-input>
          </el-form-item>
          <el-form-item label="角色:" prop="address">
            <el-input v-model="structureForm.address"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="structureDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="structureDefine">确 定</el-button>
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
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tempDeptList: [],
      filterText: '',
      // 搜索表头
      searchInput: '',
      // 选项卡
      activeName: 'first',
      // 主体
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上' },
        { date: '2016-05-04', name: '王小虎', address: '上' },
        { date: '2016-05-01', name: '王小虎', address: '上' }],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 弹窗
      addName: '',
      nameFlag: false,
      structureDialogVisible: false,
      structureForm: {
        name: '',
        region: 1,
        phone: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // tree 方法
    // 懒加载
    async loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(await this.getDepartmentList())
      }
      if (node.level >= 1) {
        let children = await this.getDepartmentList(node.data.id)
        node.data.childList = children
        return resolve(children)
      }
    },

    // 组件过滤
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    // 重命名
    edit (node, data) {
      console.log(data)
      const object = {}
      object.id = data.id
      this.$prompt('请输入名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async ({ value }) => {
        data.name = value
        object.label = value
        await this.$store.dispatch('editDepartment', object)
          .then(() => {
            this.reloadNode(node)
            this.$message({
              type: 'success',
              message: '命名成功'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },

    // 新建树形节点
    append (node, data) {
      let parentPath = this.getTreeNodeParentId(node, '')
      this.$prompt('请输入名称', '新建', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async ({ value }) => {
        await this.$store.dispatch('addDepartment', {
          deptName: value,
          parentPath: parentPath
        })
          .then(() => {
            this.reloadNode(node)
            this.$message({
              type: 'success',
              message: '新建成功'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },

    // 查找父元素ID
    getTreeNodeParentId (node, path) {
      path = node.data.id + ((path === '') ? path : ('-' + path))
      if (node.parent.data !== undefined) {
        return this.getTreeNodeParentId(node.parent, path)
      } else {
        return path
      }
    },

    // 动态加载子节点
    async reloadNode (node) {
      let children = await this.getDepartmentList(node.data.id)
      // 清空节点
      node.childNodes = []
      // 更新节点
      node.doCreateChildren(children)
      // 如果没展开则展开节点
      if (!node.expanded) {
        node.expand()
      }
    },

    // 删除树形节点
    async remove (node, data) {
      console.log(data)
      await this.$store.dispatch('deleteDepartment', data)
      const parent = node.parent
      console.log(parent)
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    // 获取树性节点
    getDepartmentList (id) {
      // return this.$store.dispatch('departmentList', {
      //   parentId: id
      // })
    },

    // 表格部分
    // 添加成员
    async addMembers () {
      this.structureDialogVisible = true
      // await this.$store.dispatch('addStructureUser')
    },

    // 编辑
    async compile (data) {
      await this.$store.dispatch('editStructureUser', data)
    },

    // 重置密码
    async resetpass (data) {
      await this.$store.dispatch('reastStructurePassword', data)
    },

    // 禁用
    async prohibit (data) {
      await this.$store.dispatch('prohibitStructureUser', data)
    },

    // 弹框确认
    structureDefine () {
      this.$refs['structureForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.structureDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  created () {
  },
  mounted () {
    // this.$refs.deptTree.setCurrentKey(0)
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .structure {
    padding: 30px 20px;
  }
</style>
<style lang="scss">
  .structure {
    display: flex;
    .structure-tree {
      width: 270px;
      min-height: 800px;
      border: 1px solid #ccc;
      padding-bottom: 10px;
      &>.el-input {
        margin: 10px;
        width: 216px;
      }
      &>.el-tabs {
        &>.el-tabs__header {
          border: none;
          .el-tabs__nav {
            margin-left: 10px;
            border: 1px solid #E4E7ED;
            .el-tabs__item {
              width: 106px;
              text-align: center;
            }
          }
        }
        &>.el-tabs__content {
          overflow: visible;
          .tree {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            .el-tree {
              width: 100%;
              .el-tree-node {
                .el-tree-node__content {
                  .custom-tree-node {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }
              .custom-tree-node span:nth-child(2){
                width: 30px;
                height: 30px;
                margin-right: 58px;
                display: none;
              }
              .custom-tree-node:hover span:nth-child(2) {
                width: 30px;
                height: 30px;
                margin-right: 58px;
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .structure-main {
      width: 100%;
      &>div {
        padding-left: 10px;
        .el-button {
          padding: 9px 20px;
        }
        .header-search {
          display: inline-block;
          float: right;
          .el-input {
            width: auto;
            margin-right: 10px;
            .el-input__inner {
              width: 240px;
            }
          }
        }
      }
      .structure-content {
        margin-top: 20px;
        .el-table {
          .el-table__body {
            .el-table__row {
              td:last-child {
                .el-button {
                  span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i {
                      display: inline-block;
                      width: 20px;
                      height: 20px;
                      margin-right: 5px;
                    }
                  }
                }
                .el-button:first-child {
                  i {
                    background: url('../../assets/img/structrue-editor.png') no-repeat center;
                    background-size: 100% 100%;
                  }
                }
                .el-button:nth-child(2) {
                  i {
                    background: url('../../assets/img/structrue-reset.png') no-repeat center;
                    background-size: 100% 100%;
                  }
                }
                .el-button:last-child {
                  background-color: #fff;
                  color: #888;
                  border: 1px solid #888;
                  i {
                    border-radius: 50%;
                    background: url('../../assets/img/structrue-prohibit.png') no-repeat center;
                    background-size: 100% 100%;
                    background-color: #f00;
                  }
                }
              }
            }
          }
        }
      }
    }
    .el-dialog {
      .el-dialog__body {
        .el-form {
          .el-form-item {
            label {
              width: 100px;
            }
            .el-form-item__content {
              .el-input {
                width: 300px;
              }
              .el-form-item__error {
                  padding-left: 20%;
                }
            }
          }
        }
      }
    }
  }
</style>
