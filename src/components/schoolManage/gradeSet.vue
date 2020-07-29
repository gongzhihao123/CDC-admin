<template>
  <div class="gradeSet">
    <div class="gradeBox">
      <!-- <div class="schoolZone">
        <span>
          <h3>{{ schoolName }}</h3>
          <el-button type="primary" size="small" @click="handleGrade(1)">添加年级</el-button>
        </span>
        <div>
          <b>小学：</b>
          <ul>
            <li>
              <p>一年级</p>
              <span>
                <el-button type="text" @click="handleGrade(2)">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </li>
          </ul>
        </div>
        <div>
          <b>初中：</b>
          <ul>
            <li>
              <p>一年级</p>
              <span>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </li>
          </ul>
        </div>
      </div> -->
      <div class="campusZone">
        <div class="campusBox" v-for="(item, index) in school.campusList" :key="index">
          <span>
            <h3>{{item.name}}</h3>
            <el-button type="primary" size="small" @click="handleGrade(1, item)">添加年级</el-button>
          </span>
          <div v-for="(section, sid) in item.sectionList" :key="sid">
            <div>
              <b>{{ section.name }}：</b>
              <ul>
                <li v-for="(garde, gid) in section.gradeList" :key="gid">
                  <p>{{garde.name}}</p>
                  <span>
                    <el-button type="text" @click="handleGrade(2, garde)">编辑</el-button>
                    <el-button type="text" @click="delPlan(garde)">删除</el-button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="isAdd * 1 === 1 ? '添加' : '编辑'"
      :visible.sync="gradeSetDialog"
      width="30%"
      center>
      <span>
        <li >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>年级：</span><el-input placeholder="请输入年级" v-model="gradeName" clearable></el-input></li>
        <li v-if="isAdd * 1 === 1" ><span>年级序号：</span><el-input placeholder="请输入年级" v-model="gradeNumber" clearable></el-input></li>
        <li v-if="isAdd * 1 === 1">
          <span>所属学段：</span>
          <el-select v-model="period" clearable placeholder="请选择">
            <el-option
              v-for="item in sections"
              :key="item"
              :label="item === '1' ? '小学' : item === '2' ? '初中' : '高中'"
              :value="item">
            </el-option>
          </el-select>
        </li>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gradeSetDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmDefine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { success } from '@/utils/index'
export default {
  data () {
    return {
      gradeSetDialog: false,
      periodList: [],
      period: '',
      gradeName: '',
      gradeNumber: 1,
      isAdd: 1,
      schoolId: '',
      schoolName: '',
      campusFlag: false,
      campusLists: [],
      campusId: '',
      gradeId: '',
      sections: [],
      tempSections: [],
      gradeList: [],
      school: {},
      sectionMap: ['', '小学', '初中', '高中']
    }
  },
  methods: {
    handleGrade (uid, e) {
      if (uid * 1 === 2) {
        // 编辑
        this.gradeName = e.name
        this.period = e.section
        this.gradeId = e.id
      } else {
        // 添加
        this.campusId = e.id
        this.sections = e.sections.split(',')
        this.gradeName = ''
        this.period = ''
      }
      this.gradeSetDialog = true
      this.isAdd = uid
    },
    confirmDefine () {
      if (this.isAdd === 1) {
        // 添加
        this.addsGrade()
      } else {
        this.editGrade()
      }
    },
    // 添加年级
    addsGrade () {
      this.$store.dispatch('addGrade', {
        campusId: this.campusId,
        name: this.gradeName,
        schoolId: this.schoolId,
        section: this.period,
        number: this.gradeNumber
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.init()
            this.gradeSetDialog = false
          }
        })
    },
    // 编辑年级
    editGrade () {
      let postParms = {}
      postParms.name = this.gradeName
      postParms.number = this.gradeNumber
      postParms.section = this.period
      this.$store.dispatch('editGrade', {
        url: this.gradeId,
        data: postParms
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.init()
            this.gradeSetDialog = false
          }
        })
    },
    // 删除年级
    delPlan (item) {
      this.$store.dispatch('delGrade', item.id)
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.init()
          }
        })
    },
    async init () {
      // 生成学校
      await this.initSchool()
      // 学区
      await this.initCampus()
      for (let cam = 0; cam < this.school.campusList.length; cam++) {
        let campus = this.school.campusList[cam]
        // 学段
        await this.initSection(campus)
        // todo
        await this.getGradeClassData(campus)
      }
      console.log(this.school)
      this.$forceUpdate()
    },
    initSchool () {
      this.school.name = this.schoolName
      this.school.id = this.schoolId
    },
    async initCampus () {
      await this.$store.dispatch('campusList', this.school.id)
        .then((res) => {
          if (res.code === 1) {
            this.school.campusList = res.data
          }
        })
    },
    async initSection (campus) {
      let sections = campus.sections.split(',')
      campus.sectionList = []
      sections.forEach(sec => {
        sec = {
          id: sec,
          name: this.sectionMap[sec]
        }
        campus.sectionList.push(sec)
      })
    },
    getGradeClassData (campus) {
      let sectionList = campus.sectionList
      if (sectionList) {
        sectionList.forEach(async (section) => {
          let gradeList = []
          await this.$store.dispatch('gradeList', {
            campusId: campus.id,
            section: section.id
          })
            .then((res) => {
              if (res.code === 1) {
                gradeList = res.data
              }
            })
          let classList = []
          await this.$store.dispatch('classList', campus.id)
            .then((res) => {
              if (res.code === 1) {
                classList = res.data
              }
            })
          campus.sectionList.forEach(section => {
            section.gradeList = []
            gradeList.forEach(grade => {
              console.log(section)
              if (section.id * 1 === grade.section * 1) {
                section.gradeList.push(grade)
              }
              classList.forEach(clazz => {
                if (!grade.classList) {
                  grade.classList = []
                }
                if (grade.id === clazz.gradeId) {
                  grade.classList.push(clazz)
                }
              })
            })
          })
        })
      }
    }
  },
  async created () {
    if (this.$route.query.schoolId) {
      this.schoolId = this.$route.query.schoolId
      this.schoolName = this.$route.query.schoolName
      this.campusFlag = this.$route.query.campusFlag
      // await this.getCampusList()
      // await this.getGradeList()
      await this.init()
    }
  }
}
</script>
<style lang="scss">
.gradeSet {
  .gradeBox {
    display: flex;
    justify-content: center;
    .schoolZone {
      > span {
        display: flex;
        align-items: center;
        .el-button {
          margin-left: 30px;
        }
      }
      > div {
        display: flex;
        align-items: flex-start;
        > b {
          margin-top: 10px;
        }
        > ul {
          li {
            width: 400px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
          }
        }
      }
      div:nth-child(3) {
        margin-top: 10px;
      }
    }
    > div:last-child {
      margin-left: 20px;
    }
    .campusZone {
      display: flex;
      flex-direction: column;
      .campusBox {
        > span {
          display: flex;
          align-items: center;
          .el-button {
            margin-left: 30px;
          }
        }
        > div {
          > div {
            display: flex;
            align-items: flex-start;
            > b {
              margin-top: 10px;
            }
            > ul {
              li {
                width: 400px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #ccc;
              }
            }
          }
        }
        div:nth-child(3) {
          margin-top: 10px;
        }
      }
      > div {
        margin-bottom: 10px;
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
</style>
