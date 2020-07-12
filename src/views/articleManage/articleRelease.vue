<template>
  <div class="articleRelease">
    <div class="containerTitle">
      <span>文章管理</span> >> 文章发布
    </div>
    <div class="articleRelease-container">
      <ul class="articleReleaseContent">
        <li>
          <span>文章标题:</span>
          <el-input v-model="articleTitle" clearable placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>所属栏目:</span>
          <el-checkbox-group v-model="columnCheck">
            <el-checkbox label="1">首页</el-checkbox>
            <el-checkbox label="2">防近视栏目</el-checkbox>
            <el-checkbox label="3">控肥胖栏目</el-checkbox>
          </el-checkbox-group>
        </li>
        <li>
          <span>缩略图</span>
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
          <el-dialog :visible.sync="articleDialog">
            <img width="100%" :src="articleImg" alt="">
          </el-dialog>
        </li>
        <li>
          <span>内容:</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articleTitle: '',
      columnCheck: [],
      articleImg: '',
      articleDialog: false,
      fileList: []
    }
  },
  methods: {
    // 上传操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.articleImg = file.url
      this.articleDialog = true
    },
    handleDownload (file) {
      console.log(file)
    }
  }
}
</script>
<style lang="scss">
.articleRelease {
  padding: 30px 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
    span {
      color: rgb(9, 98, 201);
    }
  }
  .articleRelease-container {
    padding: 12px;
    background: #fff;
    .articleReleaseContent {
      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        > span {
          display: inline-block;
          width: 80px;
        }
      }
      li:first-child {
        .el-input {
          width: 300px
        }
      }
      li:nth-child(3) {
        align-items: flex-start;
      }
    }
  }
}
</style>
