<template>
  <div class="articleRelease">
    <div class="containerTitle">
      <span @click="backArticleManage">文章管理</span> >> 文章发布
    </div>
    <div class="articleRelease-container">
      <ul class="articleReleaseContent">
        <li>
          <span>文章标题:</span>
          <el-input v-model="articleTitle" clearable placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>所属栏目:</span>
          <el-checkbox-group v-model="channelId" @change="changeColumn">
            <el-checkbox label="1">首页</el-checkbox>
            <el-checkbox label="2">防近视栏目</el-checkbox>
            <el-checkbox label="3">控肥胖栏目</el-checkbox>
          </el-checkbox-group>
        </li>
        <li>
          <span>缩略图</span>
          <el-upload
            :action="uploadPath"
            list-type="picture-card"
            :file-list="fileList"
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
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="articleDialog" class="articleReleaseDialog">
            <img width="100%" :src="articleImg" alt="">
          </el-dialog>
        </li>
        <li>
          <span>内容:</span>
          <div>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 400px" />
            <!-- <el-button size="small" @click="submit">提交</el-button> -->
          </div>
        </li>
      </ul>
      <div class="articleReleaseFoot">
        <el-button type="success" size="small">发布</el-button>
        <el-button size="small" @click="backArticleManage">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  data () {
    return {
      articleTitle: '',
      columnCheck: [],
      channelId: [],
      channelName: '',
      articleImg: '',
      articleDialog: false,
      fileList: [],
      content: '', // 输入的markdown
      html: '', // 及时转的html,
      configs: {}
    }
  },
  components: {
    mavonEditor
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
    handleRemove (file, fileList) {
      console.log(fileList)
      this.$store.dispatch('delUploadFile', { filepath: file.response.data.filepath })
    },
    // 缩略图显示大图
    handlePictureCardPreview (file) {
      this.articleImg = file.url
      this.articleDialog = true
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      let formdata = new FormData()

      this.$upload.post('/上传接口地址', formdata).then(res => {
        console.log(res.data)
        this.$refs.md.$img2Url(pos, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 栏目选择
    changeColumn (e) {
      this.channelId = e
      e * 1 === 1 ? this.channelName = '首页' : e * 1 === 2 ? this.channelName = '防近视栏目' : this.channelName = '控肥胖栏目'
    },
    // 文章提交
    articleconfirm () {
      this.$store.dispatch('addArticle', {
        channelId: this.channelId.join(),
        channelName: this.channelName,
        text: this.text,
        thumbnailPath: this.thumbnailPath,
        title: this.articleTitle
      })
    },
    // 提交
    submit () {
      console.log(this.content)
      console.log(this.html)
    },
    // 返回文章管理
    backArticleManage () {
      this.$router.push('/articleManage')
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
      cursor: pointer;
    }
  }
  .articleRelease-container {
    padding: 32px;
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
        .articleReleaseDialog {
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
    .articleReleaseFoot {
      margin-left: 200px;
      .el-button {
        width: 100px;
        margin: 10px;
      }
    }
  }
}
</style>
