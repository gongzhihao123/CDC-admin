<template>
  <div class="activityRelease">
    <div class="containerTitle">
      <span @click="backActivityManage">活动设置</span> >> 活动发布
    </div>
    <div class="activityRelease-container">
      <ul class="activityReleaseContent">
        <li>
          <span>活动标题:</span>
          <el-input v-model="activityTitle" clearable placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>活动起止时间:</span>
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </li>
        <li>
          <span>活动宣传图片:</span>
          <el-upload
            action="#"
            list-type="picture-card"
            :file-list="fileList"
            :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <!-- <span
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span> -->
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="activityDialog" class="activityReleaseDialog">
            <img width="100%" :src="activityImg" alt="">
          </el-dialog>
        </li>
      </ul>
      <div class="activityReleaseFoot">
        <el-button type="success" size="small">发布</el-button>
        <el-button size="small" @click="backActivityManage">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activityTitle: '',
      columnCheck: [],
      activityImg: '',
      activityDialog: false,
      fileList: [],
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
      timeRange: []
    }
  },
  methods: {
    // 上传操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.activityImg = file.url
      this.activityDialog = true
    },
    handleDownload (file) {
      console.log(file)
    },
    // 返回文章管理
    backActivityManage () {
      this.$router.push('/activityManage')
    }
  }
}
</script>
<style lang="scss">
.activityRelease {
  padding: 30px 20px;
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
      li:nth-child(3) {
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
      li:nth-child(4) {
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
