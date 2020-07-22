<template>
  <div class="classSet">
    <div class="classBox">
      <h3>怀柔二中</h3>
      <div class="classHandle">
        <ul>
          <li >
            <p>校区：</p>
            <el-radio-group v-model="period" @change="changeCampus">
              <el-radio v-for="(item, index) in campusList" :key="index" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </li>
          <li>
            <p>学段：</p>
            <el-radio-group v-model="section" @change="changeSection">
              <el-radio v-for="(section, index) in sectionList" :key="index" :label="section">{{ section * 1 === 1 ? '小学' : section * 1 === 2 ? '初中' : '高中' }}</el-radio>
            </el-radio-group>
          </li>
          <li>
            <p>年级：</p>
            <el-radio-group v-model="selectTepGrade" @change="changeGrade">
              <el-radio v-for="(tepGrade, index) in tepGradeList" :key="index" :label="tepGrade.id">{{ tepGrade.name }}</el-radio>
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
          prop="number"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="班级名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="editClass(scope.row)">编辑</el-button>
            <el-popconfirm title="您确定要删除吗？" @onConfirm='delClass(scope.row)'>
              <el-button slot="reference" size="small" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="isAdd * 1 === 1 ? '一键开班' : isAdd * 1 === 2 ? '添加班级' : '编辑'"
        :visible.sync="classSetDialog"
        width="30%"
        center>
        <span>
          <li v-if="isAdd * 1 !== 3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>年级：</span>
            <el-select v-model="gradeSelect" clearable placeholder="请选择">
              <el-option
                v-for="item in gradeSelectList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li v-if="isAdd * 1 === 1">
            &nbsp;&nbsp;&nbsp;<span>班级数：</span>
            <el-input placeholder="请输入班级数" v-model="classNumber" clearable></el-input>
          </li>
          <li v-if="isAdd * 1 !== 1">
            <span>班级名称：</span>
            <el-input placeholder="请输入班级名称" v-model="className" clearable></el-input>
          </li>
          <li v-if="isAdd * 1 !== 1">
            <span>班级序号：</span>
            <el-input placeholder="请输入班级序号" v-model="classSequence" clearable></el-input>
          </li>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="classSetDialog = false">取 消</el-button>
          <el-button type="primary" @click="comfirmDefine">确 定</el-button>
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
      tableData: [],
      classSetDialog: false,
      isAdd: 1,
      gradeSelectList: [],
      gradeSelect: '',
      period: '',
      grade: '',
      gradeName: '',
      campusList: [],
      section: '',
      sectionList: [],
      gradeList: [],
      tepGradeList: [],
      tepGrade: '',
      selectTepGrade: '',
      school: {},
      campusId: '',
      className: '',
      classNumber: 1,
      schoolId: '',
      classSequence: '',
      classId: ''
    }
  },
  methods: {
    addClass (e) {
      this.isAdd = e
      this.classNumber = ''
      this.className = ''
      this.classSequence = ''
      this.classSetDialog = true
    },
    comfirmDefine () {
      if (this.isAdd * 1 === 1) {
        // 一键添加
        this.classBatchAddDefine()
        this.classSetDialog = false
      } else if (this.isAdd * 1 === 2) {
        // 添加
        this.addClassDefine()
        this.classSetDialog = false
      } else {
        this.editClassDefine()
      }
    },
    // 添加班级
    addClassDefine () {
      this.$store.dispatch('addClass', {
        campusId: this.campusId,
        gradeId: this.selectTepGrade,
        name: this.className,
        number: this.classSequence,
        schoolId: this.schoolId
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.classSetDialog = false
            this.getClassList()
          }
        })
    },
    // 一键添加
    classBatchAddDefine () {
      this.$store.dispatch('classBatchAdd', {
        gradeId: this.gradeSelect,
        classNumber: this.classNumber
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.classSetDialog = false
            this.getClassList()
          }
        })
    },
    // 选择校区
    changeCampus (e) {
      this.campusId = e
      let arr = this.campusList
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id * 1 === e * 1) {
          this.sectionList = arr[i].sections
        }
      }
      this.getGradeList(e)
    },
    // 选择学段
    changeSection (e) {
      this.tepGradeList = this.gradeList.filter(item => item.section * 1 === e * 1)
      this.gradeSelectList = this.tepGradeList
    },
    // 选择年级
    changeGrade (e) {
      this.gradeSelect = e
      this.getClassList()
    },
    delClass (e) {
      this.$store.dispatch('delClass', e.id)
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.classSetDialog = false
            this.getClassList()
          }
        })
    },
    // 编辑班级
    editClass (data) {
      this.classId = data.id
      this.className = data.name
      this.classSequence = data.number
      this.isAdd = 3
      this.classSetDialog = true
    },
    // 编辑确认
    editClassDefine () {
      let postParams = {}
      postParams.name = this.className
      postParams.number = this.classSequence
      this.$store.dispatch('editClass', {
        url: this.classId,
        data: postParams
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.classSetDialog = false
            this.getClassList()
          }
        })
    },
    // 获取班级列表
    getClassList (e) {
      this.$store.dispatch('classList', this.gradeSelect)
        .then(res => {
          if (res.code === 1) {
            this.tableData = res.data
          }
        })
    },
    // 获取学区列表
    async getSchoolList () {
      await this.$store.dispatch('campusList', this.schoolId)
        .then((res) => {
          if (res.code === 1) {
            res.data.forEach(item => {
              if (item.sections !== null) {
                item.sections = item.sections.split(',')
              } else {
                item.sections = []
              }
            })
            this.campusList = res.data
          }
        })
    },
    // 获取年级列表
    async getGradeList (id) {
      this.$store.dispatch('gradeList', id)
        .then((res) => {
          if (res.code === 1) {
            this.gradeList = res.data
          }
        })
    }
  },
  async created () {
    if (this.$route.query.schoolId) {
      this.schoolId = this.$route.query.schoolId
      this.schoolName = this.$route.query.schoolName
      this.campusFlag = this.$route.query.campusFlag
      await this.getSchoolList()
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
    .el-table {
      .el-table__fixed-body-wrapper {
        .el-table__row {
          .cell {
            .el-button {
              margin-right: 10px;
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
