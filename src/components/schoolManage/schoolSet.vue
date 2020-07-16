<template>
  <div class="schoolSet">
    <ul class="schoolHandle">
      <li class="schoolHandle_schoolName">
        <span>学校名称：</span>
        <el-input placeholder="请输入学校名称" v-model="schoolName" clearable></el-input>
        <el-button type="primary" @click="saveSchool" v-if="showButton">保存</el-button>
        <el-button type="primary" @click="editsSchool" v-if="isEdit">编辑</el-button>
      </li>
      <li><span>是否有分校区：</span><el-radio v-model="campusFlag" :label='true'>是</el-radio><el-radio v-model="campusFlag" :label='false'>否</el-radio></li>
      <li class="noCampus" v-if="isCampus * 1 === 1">
          <div>
            <span>校区名称：</span>
            <p>主校区</p>
          </div>
          <p>
            <span>所属学段：</span>
            <el-checkbox-group v-model="sections">
              <el-checkbox label="1">小学</el-checkbox>
              <el-checkbox label="2">初中</el-checkbox>
              <el-checkbox label="3">高中</el-checkbox>
            </el-checkbox-group>
            <el-button type="text" @click="addnoCampusConfirm">保存</el-button>
            <el-button type="text" @click="editnoCampus">编辑</el-button>
          </p>
        </li>
      <li class="campusTitle" v-if="isCampus * 1 === 2">
        <span>校区设置：</span>
        <el-button size="small" type="primary" @click="addCampus">添加校区</el-button>
      </li>
      <div v-if="isCampus * 1 === 2">
        <li class="campus" v-for="(item, index) in itemArr" :key="index">
          <div>
            <span>校区名称：</span>
            <el-input placeholder="请输入学校名称" v-model="item.name" clearable></el-input>
            <el-button type="text" @click="delCampus(item.id)">删除</el-button>
            <el-button type="text" @click="editCampus(item)">编辑</el-button>
            <el-button type="text" @click="addCampusConfirm(item)">保存</el-button>
          </div>
          <p>
            <span>所属学段：</span>
            <el-checkbox-group v-model="item.sections">
              <el-checkbox label="1">小学</el-checkbox>
              <el-checkbox label="2">初中</el-checkbox>
              <el-checkbox label="3">高中</el-checkbox>
            </el-checkbox-group>
          </p>
        </li>
      </div>
      <!-- <p class="addSchools">
        <el-button type="primary">下一步</el-button>
        <el-button>返回</el-button>
      </p> -->
    </ul>
  </div>
</template>
<script>
import { success } from '@/utils/index'
export default {
  data () {
    return {
      isEdit: false,
      schoolName: '',
      schoolId: '',
      campusFlag: false,
      showButton: true,
      isCampus: 0,
      sections: [],
      itemArr: [],
      ele: { name: '', sections: [] }
    }
  },
  methods: {
    addCampus () {
      this.itemArr.push(this.ele)
    },
    // 编辑校区
    editCampus (item) {
      let postParams = {}
      postParams.name = item.name
      postParams.sections = item.sections.join()
      postParams.schoolId = this.schoolId
      this.$store.dispatch('editCampus', {
        url: item.id,
        data: postParams
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getCampusList()
          }
        })
    },
    // 删除校区
    delCampus (item) {
      this.$store.dispatch('delCampus', item)
        .then((res) => {
          success(res.message)
          this.getCampusList()
        })
    },
    // 学校保存
    saveSchool () {
      this.$store.dispatch('addSchool', {
        name: this.schoolName,
        campusFlag: this.campusFlag
      })
        .then((res) => {
          if (res.code === 1) {
            if (!this.campusFlag) {
              // 无校区
              this.isCampus = 1
              this.showButton = false
              this.sections = []
              this.schoolId = res.data
            } else {
              // 有校区
              this.isCampus = 2
              this.schoolId = res.data
            }
            success(res.message)
          }
        })
    },
    // 编辑学校
    editsSchool () {
      let postParams = {}
      postParams.name = this.schoolName
      postParams.campusFlag = this.campusFlag
      this.$store.dispatch('editSchool', {
        url: this.schoolId,
        data: postParams
      })
        .then(res => {
          if (res.code === 1) {
            success(res.message)
          }
        })
    },
    // 编辑无校区时学段
    editnoCampus () {
      let postParams = {}
      postParams.name = '主校区'
      postParams.sections = this.sections.join()
      postParams.schoolId = this.schoolId
      this.$store.dispatch('editCampus', {
        url: this.campusId,
        data: postParams
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getCampusList()
          }
        })
    },
    // 新增学校无校区主校区
    addnoCampusConfirm () {
      this.$store.dispatch('addCampus', {
        name: '主校区',
        schoolId: this.schoolId,
        sections: this.sections.join()
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getCampusList()
          }
        })
    },
    // 新增学校分校校区
    addCampusConfirm (item) {
      this.$store.dispatch('addCampus', {
        name: item.name,
        schoolId: this.schoolId,
        sections: item.sections.join()
      })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.getCampusList()
          }
        })
    },
    // 获取校区列表
    getCampusList () {
      this.$store.dispatch('campusList', this.schoolId)
        .then((res) => {
          if (res.code === 1) {
            res.data.forEach(item => {
              if (item.sections !== null) {
                item.sections = item.sections.split(',')
              } else {
                item.sections = []
              }
            })
            this.itemArr = res.data
          }
        })
    },
    // 获取无分校区列表
    getnoCampusList () {
      this.$store.dispatch('campusList', this.schoolId)
        .then((res) => {
          if (res.code === 1) {
            this.sections = res.data[0].sections.split(',')
            this.campusId = res.data[0].id
          }
        })
    }
  },
  created () {
    if (this.$route.query.schoolId) {
      this.schoolId = this.$route.query.schoolId
      this.schoolName = this.$route.query.schoolName
      this.campusFlag = this.$route.query.campusFlag
      if (this.campusFlag === 'true') {
        this.isCampus = 2
        this.getCampusList()
      } else {
        this.getnoCampusList()
        this.isCampus = 1
      }
      this.showButton = false
    }
    this.isEdit = this.$route.query.isEdit
  }
}
</script>
<style lang="scss">
.schoolSet {
  display: flex;
  justify-content: center;
  .schoolHandle {
    li {
      display: flex;
      margin: 10px 0;
      > span {
        display: inline-block;
        width: 110px;
        text-align: right;
      }
      .el-input {
        width: 200px;
      }
    }
    .schoolHandle_schoolName {
      align-items: center;
      > .el-button {
        margin-left: 20px;
      }
    }
    // .addSchools {
    //     display: flex;
    //     margin: 20px  0 10px 50px;
    //   }
    .campusTitle {
      padding-top: 10px;
      border-top: 1px solid #ccc;
    }
    .noCampus {
      display: flex;
      flex-direction: column;
      div {
        > span {
          display: inline-block;
          width: 110px;
          text-align: right;
        }
        > p {
          display: inline-block;
        }
      }
      p {
        display: flex;
        align-items: center;
        margin: 10px 0;
        > span {
          display: inline-block;
          width: 110px;
          text-align: right;
        }
        .el-button {
          margin-left: 20px;
        }
      }
    }
    .campus {
      display: flex;
      flex-direction: column;
      div {
        > span {
          display: inline-block;
          width: 110px;
          text-align: right;
        }
        .el-input {
          margin-right: 10px;
        }
        > p {
          display: inline-block;
        }
      }
      p {
        display: flex;
        margin: 10px 0;
        > span {
          display: inline-block;
          width: 110px;
          text-align: right;
        }
      }
    }
    // > p {
    //   margin: 40px 0 0 30px;
    // }
  }
}
</style>
