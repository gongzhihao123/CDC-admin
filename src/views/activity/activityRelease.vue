<template>
  <div class="activityRelease">
    <div class="containerTitle">
      <span @click="backActivityManage">活动设置</span> >> 活动发布
    </div>
    <div class="activityRelease-container">
      <ul class="activityReleaseContent">
        <li>
          <span>选择活动模板:</span>
          <el-radio-group v-model="activityType">
            <el-radio :label="1">爱眼睛主题活动</el-radio>
            <el-radio :label="2">动起来主题活动</el-radio>
          </el-radio-group>
        </li>
        <li>
          <span>活动标题:</span>
          <el-input v-model="activityTitle" clearable placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>活动起止时间:</span>
          <el-date-picker
            v-model="formdate"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-ddTHH:mm:ss"
            :default-time="['00:00:00','23:59:59']"
            align="right">
          </el-date-picker>
          <!-- <el-date-picker
            v-model="formdate.startTime"
            type="datetime"
            placeholder="选择开始时间"
            align="right"
            @change="testStartClick"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions">
          </el-date-picker>
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <el-date-picker
            v-model="formdate.endTime"
            type="datetime"
            placeholder="选择终止时间"
            align="right"
            @change="testEndClick"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions">
          </el-date-picker> -->
        </li>
        <li>
          <span>活动logo:</span>
          <el-upload
            :class="{uoloadSty:showBtnImg1,disUoloadSty:noneBtnImg1}"
            :action="uploadPath"
            list-type="picture-card"
            :on-change="imgChange1"
            :on-success="uploadSuccess1"
            :file-list="fileList1"
            :limit="1"
            :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview1(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove1(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div class="el-upload__tip" slot="tip">建议上传图片尺寸为690*388</div>
          </el-upload>
          <el-dialog :visible.sync="activityDialog" class="activityReleaseDialog">
            <img width="100%" :src="activityImg" alt="">
          </el-dialog>
        </li>
        <li>
          <span>活动主题:</span>
          <el-upload
            :class="{uoloadSty:showBtnImg2,disUoloadSty:noneBtnImg2}"
            :action="uploadPath"
            list-type="picture-card"
            :on-change="imgChange2"
            :on-success="uploadSuccess2"
            :file-list="fileList2"
            :limit="1"
            :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview2(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove2(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div class="el-upload__tip" slot="tip">建议上传图片尺寸为690*388</div>
          </el-upload>
          <el-dialog :visible.sync="activityDialog" class="activityReleaseDialog">
            <img width="100%" :src="activityImg" alt="">
          </el-dialog>
        </li>
        <li>
          <span>我的活动:</span>
          <el-upload
            :class="{uoloadSty:showBtnImg3,disUoloadSty:noneBtnImg3}"
            :action="uploadPath"
            list-type="picture-card"
            :on-change="imgChange3"
            :on-success="uploadSuccess3"
            :file-list="fileList3"
            :limit="1"
            :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview3(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove3(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div class="el-upload__tip" slot="tip">建议上传图片尺寸为134*76</div>
          </el-upload>
          <el-dialog :visible.sync="activityDialog" class="activityReleaseDialog">
            <img width="100%" :src="activityImg" alt="">
          </el-dialog>
        </li>
      </ul>
      <div class="activityReleaseFoot">
        <el-button type="success" size="small" @click="confirmDefine">发布</el-button>
        <el-button size="small" @click="backActivityManage">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { success } from '@/utils/index'
export default {
  data () {
    return {
      isAdd: false,
      activityId: '',
      activityType: 1,
      activityTitle: '',
      columnCheck: [],
      activityImg1: '',
      activityImg2: '',
      activityImg3: '',
      activityDialog: false,
      imgUrl1: '',
      imgUrl2: '',
      imgUrl3: '',
      // 上传参数
      fileList1: [],
      fileList2: [],
      fileList3: [],
      showBtnImg1: true,
      showBtnImg2: true,
      showBtnImg3: true,
      noneBtnImg1: false,
      noneBtnImg2: false,
      noneBtnImg3: false,
      limitCountImg1: 1, // 上传图片的最大数量
      limitCountImg2: 1, // 上传图片的最大数量
      limitCountImg3: 1, // 上传图片的最大数量
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      formdate: []
    }
  },
  computed: {
    uploadPath () {
      const routePath = '/activity'
      return window.location.origin + routePath + '/common/attachment'
    }
  },
  methods: {
    // 上传操作
    // 删除上传图片
    handleRemove1 (file, fileList) {
      let url = ''
      if (this.isAdd) {
        url = file.response.data.filepath
      } else {
        url = file.url.replace(window.location.origin + '/activity/common/attachment?filepath=', '')
      }
      this.$store.dispatch('delUploadFile', { filepath: url })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.fileList1 = []
            // console.log(fileList.length >= this.limitCountImg)
            this.noneBtnImg1 = false
            this.imgUrl1 = ''
          }
        })
    },
    uploadSuccess1 (res) {
      if (res.data.resultCode === 1) {
        success(res.data.result)
      }
      this.imgUrl1 = res.data.filepath
    },
    handlePictureCardPreview1 (file) {
      this.activityImg1 = file.url
      this.activityDialog = true
    },
    imgChange1 (file, fileList) {
      this.noneBtnImg1 = fileList.length >= this.limitCountImg1
    },
    handleRemove2 (file, fileList) {
      let url = ''
      if (this.isAdd) {
        url = file.response.data.filepath
      } else {
        url = file.url.replace(window.location.origin + '/activity/common/attachment?filepath=', '')
      }
      this.$store.dispatch('delUploadFile', { filepath: url })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.fileList2 = []
            // console.log(fileList.length >= this.limitCountImg)
            this.noneBtnImg2 = false
            this.imgUrl2 = ''
          }
        })
    },
    uploadSuccess2 (res) {
      if (res.data.resultCode === 1) {
        success(res.data.result)
      }
      this.imgUrl2 = res.data.filepath
    },
    handlePictureCardPreview2 (file) {
      this.activityImg2 = file.url
      this.activityDialog = true
    },
    imgChange2 (file, fileList) {
      this.noneBtnImg2 = fileList.length >= this.limitCountImg2
    },
    handleRemove3 (file, fileList) {
      let url = ''
      if (this.isAdd) {
        url = file.response.data.filepath
      } else {
        url = file.url.replace(window.location.origin + '/activity/common/attachment?filepath=', '')
      }
      this.$store.dispatch('delUploadFile', { filepath: url })
        .then((res) => {
          if (res.code === 1) {
            success(res.message)
            this.fileList3 = []
            // console.log(fileList.length >= this.limitCountImg)
            this.noneBtnImg3 = false
            this.imgUrl3 = ''
          }
        })
    },
    uploadSuccess3 (res) {
      if (res.data.resultCode === 1) {
        success(res.data.result)
      }
      this.imgUrl3 = res.data.filepath
    },
    handlePictureCardPreview3 (file) {
      this.activityImg3 = file.url
      this.activityDialog = true
    },
    imgChange3 (file, fileList) {
      this.noneBtnImg3 = fileList.length >= this.limitCountImg3
    },
    confirmDefine () {
      if (this.isAdd) {
        // 添加
        this.$store.dispatch('addActivity', {
          carouselImg: this.imgUrl1,
          entranceImg: this.imgUrl2,
          miniImg: this.imgUrl3,
          startTime: this.formdate[0],
          endTime: this.formdate[1],
          title: this.activityTitle,
          type: this.activityType
        })
          .then((res) => {
            if (res.code === 1) {
              success(res.message)
              this.backActivityManage()
            }
          })
      }
      // else {
      //   // 编辑
      //   let postParms = {}
      //   postParms.img = this.imgUrl
      //   postParms.startTime = this.changeTime(this.formdate.startTime)
      //   postParms.endTime = this.changeTime(this.formdate.endTime)
      //   postParms.title = this.activityTitle
      //   postParms.type = this.activityType
      //   this.$store.dispatch('editActivity', {
      //     url: this.activityId,
      //     data: postParms
      //   })
      //     .then((res) => {
      //       if (res.code === 1) {
      //         success(res.message)
      //       }
      //     })
      // }
    },
    // 返回文章管理
    backActivityManage () {
      this.$router.go(-1)
    },
    testStartClick (e) {
      console.log(e)
      this.formdate.startTime = e
    },
    testEndClick (e) {
      this.formdate.endTime = e
    },
    changeTime (e) {
      let time = e.split(' ')
      return time[0] + 'T' + time[1]
    }
  },
  mounted () {
    if (this.$route.query.isAdd) {
      // 添加
      this.isAdd = true
    } else {
      // this.activityId = this.$route.query.data.id
      // console.log(this.$route.query.data)
      // this.$set(this.formdate, 'startTime', this.$route.query.data.startTime)
      // this.$set(this.formdate, 'endTime', this.$route.query.data.endTime)
      // // this.startTime = this.$route.query.data.startTime
      // // this.endTime = this.$route.query.data.endTime
      // this.activityTitle = this.$route.query.data.title
      // if (this.$route.query.data.img) {
      //   this.imgUrl = this.$route.query.data.img
      //   const routePath = '/activity'
      //   let obj = {}
      //   obj.url = window.location.origin + routePath + '/common/attachment?filepath=' + this.$route.query.data.img
      //   this.fileList.push(obj)
      //   if (this.fileList.length > 0) {
      //     this.noneBtnImg = true
      //   }
      // }
      // this.isAdd = false
    }
  }
}
</script>
<style lang="scss">
.activityRelease {
  padding: 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
    span {
      color: rgb(9, 98, 201);
      cursor: pointer;
    }
  }
  .activityRelease-container {
    padding: 32px;
    background: #fff;
    .activityReleaseContent {
      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        > span {
          display: inline-block;
          width: 120px;
          text-align: right;
          margin-right: 10px;
        }
        .el-upload--picture-card {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
        .el-upload-list__item {
          width: 100px;
          height: 100px;
        }
      }
      li:first-child {
        .el-input {
          width: 300px
        }
      }
      li:nth-child(2) {
        .el-input {
          width: 300px
        }
      }
      li:nth-child(4) {
        align-items: flex-start;
        > div {
          display: flex;
        }
        .activityReleaseDialog {
          .el-dialog__body {
            padding: 0;
          }
        }
      }
      li:nth-child(5) {
        align-items: flex-start;
        > div {
          .el-button {
            margin-top: 10px;
          }
        }
      }
    }
    .activityReleaseFoot {
      margin-left: 200px;
      .el-button {
        width: 100px;
        margin: 10px;
      }
    }
  }
}
</style>
<style>
.uoloadSty {
  display: flex;
  flex-direction: column;
}
.uoloadSty .el-upload--picture-card{
  width:110px;
  height:110px;
  line-height:110px;
}
.disUoloadSty .el-upload--picture-card{
  display:none;   /* 上传按钮隐藏 */
}
</style>
