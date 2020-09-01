<template>
  <div class="screen">
    <div class="handle">
      <el-select v-model="schoolId" @change="changeSchool" size="small" placeholder="选择学校">
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <el-select v-model="campusId" @change="changeCampus" size="small" placeholder="选择校区">
        <el-option
          v-for="item in campusList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="sectionId" @change="changeSection" size="small" placeholder="选择学段">
        <el-option
          v-for="item in sectionList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="gradeId" @change="changeGrade" size="small" placeholder="选择年级">
        <el-option
          v-for="item in gradeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="classId" @change="changeClass" size="small" placeholder="选择年级">
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="header-search">
      <el-input
        placeholder="请输入学生姓名"
        v-model="keyword"
        size="small"
        clearable>
      </el-input>
      <el-button type="success" size="small" @click="filterSearch">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchInput: '',
      value: [],
      options: [],
      schoolList: [],
      schoolId: '',
      schoolName: '',
      campusList: [],
      campusId: '',
      campusName: '',
      sectionList: [],
      sectionId: '',
      sectionName: '',
      gradeList: [],
      gradeId: '',
      gradeName: '',
      classList: [],
      classId: '',
      className: '',
      searchSchoolId: '',
      searchCampusId: '',
      searchSectionId: '',
      searchGradeId: '',
      searchClassId: '',
      keyword: ''
    }
  },
  methods: {
    // 搜索
    filterSearch () {
      let screenObj = {}
      screenObj.searchSchoolId = this.searchSchoolId
      screenObj.searchCampusId = this.searchCampusId
      screenObj.searchSectionId = this.searchSectionId
      screenObj.searchGradeId = this.searchGradeId
      screenObj.searchClassId = this.searchClassId
      screenObj.keyword = this.keyword
      this.$emit('screenInfo', screenObj)
    },
    // 选择学校
    async changeSchool (data) {
      this.searchSchoolId = data
      this.campusId = ''
      this.campusList = []
      this.sectionId = ''
      this.sectionList = []
      this.gradeId = ''
      this.gradeList = []
      this.classId = ''
      this.classList = []
      await this.getCampusList()
    },
    // 选择校区
    async changeCampus (data) {
      this.searchCampusId = data
      this.sectionId = ''
      this.sectionList = []
      this.gradeId = ''
      this.gradeList = []
      this.classId = ''
      this.classList = []
      await this.switchFormat()
    },
    // 选择学段
    async changeSection (data) {
      this.searchSectionId = data
      this.gradeId = ''
      this.gradeList = []
      this.classId = ''
      this.classList = []
      await this.getGradeList()
    },
    // 选择年级
    async changeGrade (data) {
      this.searchGradeId = data
      this.gradeList = data
      this.classId = ''
      this.classList = []
      await this.getClassList()
    },
    // 选择班级
    changeClass (data) {
      this.searchClassId = data
    },
    // 转换校区学段格式
    switchFormat () {
      this.sectionList = []
      let temCamp = this.campusList.filter(item => item.id === this.campusId)
      let temSec = temCamp[0].sections
      for (let j = 0; j < temSec.length; j++) {
        let obj = {}
        if (temSec[j] * 1 === 1) {
          obj.name = '小学'
          obj.id = 1
        } else if (temSec[j] * 1 === 2) {
          obj.name = '初中'
          obj.id = 2
        } else if (temSec[j] * 1 === 3) {
          obj.name = '高中'
          obj.id = 3
        }
        this.sectionList.push(obj)
      }
    },
    // 获取学校列表
    getSchoolList () {
      this.$store.dispatch('actvitySchoolList')
        .then(res => {
          this.schoolList = res.data
        })
    },
    // 获取校区
    async getCampusList () {
      await this.$store.dispatch('totalCampusList', this.schoolId)
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
    async getGradeList () {
      let getParam = {}
      getParam.campusId = this.campusId
      getParam.sectionId = this.sectionId
      this.$store.dispatch('totalGradeList', {
        campusId: this.campusId,
        section: this.sectionId
      })
        .then((res) => {
          if (res.code === 1) {
            this.gradeList = res.data
          }
        })
    },
    // 获取班级列表
    getClassList () {
      this.$store.dispatch('totalClassList', this.gradeId)
        .then(res => {
          if (res.code === 1) {
            this.classList = res.data
          }
        })
    }
  },
  mounted () {
    this.getSchoolList()
  }
}
</script>
<style lang="scss" scoped>
.screen {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .handle {
    .el-select {
      width: 150px;
      margin-right: 5px;
    }
    .el-select:first-child {
      width: 250px;
    }
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
</style>
