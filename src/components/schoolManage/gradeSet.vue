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
        <div class="campusBox" v-for="(item, index) in campusLists" :key="index">
          <span>
            <h3>{{item.name}}</h3>
            <el-button type="primary" size="small" @click="handleGrade(1, item)">添加年级</el-button>
          </span>
          <div v-for=" (ite, ind) in item.sections " :key="ind">
            <b>{{ ite === '1' ? '小学' : ite === '2' ? '初中' : '高中' }}：</b>
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
              :key="item.id"
              :label="item === '1' ? '小学' : item === '2' ? '初中' : '高中'"
              :value="item.id">
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
      sections: [],
      gradeList: []
    }
  },
  methods: {
    handleGrade (uid, e) {
      this.campusId = e.id
      this.sections = e.sections
      this.gradeName = ''
      this.period = ''
      this.gradeSetDialog = true
      this.isAdd = uid
    },
    confirmDefine () {
      if (this.isAdd === 1) {
        // 添加
        this.addsGrade()
      }
    },
    addsGrade () {
      this.$store.dispatch('addGrade', {
        campusId: this.campusId,
        name: this.gradeName,
        schoolId: this.schoolId,
        sections: this.sections[0] * 1,
        number: this.gradeNumber
      })
        .then((res) => {
          if (res.code === 1) {
            console.log(res)
            success(res.message)
            this.gradeSetDialog = false
          }
        })
    },
    // 获取年级列表
    getGradeList () {
      this.$store.dispatch('gradeList', this.campusId)
        .then((res) => {
          console.log(res)
          if (res.code === 1) {
            this.gradeList = res.data
          }
        })
    },
    // 获取校区列表
    async getCampusList () {
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
            this.campusLists = res.data
            // this.campusId = res.data.
          }
        })
    }
  },
  async created () {
    if (this.$route.query.schoolId) {
      this.schoolId = this.$route.query.schoolId
      this.schoolName = this.$route.query.schoolName
      this.campusFlag = this.$route.query.campusFlag
      await this.getCampusList()
      await this.getGradeList()
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
