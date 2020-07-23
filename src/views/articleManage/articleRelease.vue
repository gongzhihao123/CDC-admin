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
        <!-- <li>
          <span>所属栏目:</span>
          <el-checkbox-group v-model="channelId" @change="changeColumn">
            <el-checkbox label="1">首页</el-checkbox>
            <el-checkbox label="2">防近视栏目</el-checkbox>
            <el-checkbox label="3">控肥胖栏目</el-checkbox>
          </el-checkbox-group>
        </li> -->
        <li>
          <span>缩略图</span>
          <el-upload
            :class="{uoloadSty:showBtnImg,disUoloadSty:noneBtnImg}"
            :action="uploadPath"
            list-type="picture-card"
            :on-change="imgChange"
            :on-success="uploadSuccess"
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
                    @click="handleRemove(file, fileList)"
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
        <el-button type="success" size="small" @click="articleconfirm">发布</el-button>
        <el-button size="small" @click="backArticleManage">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { success } from '@/utils/index'
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
      isAdd: false,
      article: {},
      // 上传参数
      fileList: [],
      showBtnImg: true,
      noneBtnImg: false,
      limitCountImg: 1, // 上传图片的最大数量
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
            this.fileList = []
            this.noneBtnImg = false
            this.thumbnailPath = ''
          }
        })
    },
    uploadSuccess (res) {
      this.thumbnailPath = res.data.filepath
    },
    // 缩略图显示大图
    handlePictureCardPreview (file) {
      this.articleImg = file.url
      this.articleDialog = true
    },
    imgChange (file, fileList) {
      this.noneBtnImg = fileList.length >= this.limitCountImg
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      let formdata = new FormData()
      this.$upload.post('/上传接口地址', formdata).then(res => {
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
      if (this.isAdd) {
        this.$store.dispatch('addArticle', {
          rowText: this.content,
          text: this.html,
          thumbnailPath: this.thumbnailPath,
          title: this.articleTitle
        })
          .then((res) => {
            if (res.code === 1) {
              success(res.message)
            }
          })
      } else {
        this.$store.dispatch('editArticle', {
          rowText: this.content,
          text: this.html,
          thumbnailPath: this.thumbnailPath,
          title: this.articleTitle
        })
          .then((res) => {
            if (res.code === 1) {
              success(res.message)
            }
          })
      }
    },
    // 获取文章详情articleDetail
    getArticleDetail (id) {
      this.$store.dispatch('articleDetail', id)
        .then(res => {
          this.content = res.rowText
        })
    },
    // 返回文章管理
    backArticleManage () {
      this.$router.push('/articleManage')
    }
  },
  created () {
    if (this.$route.query.article) {
      this.article = this.$route.query.article
      this.articleTitle = this.$route.query.article.title
      if (this.$route.query.article.thumbnailPath) {
        const routePath = '/activity'
        let obj = {}
        obj.url = window.location.origin + routePath + '/common/attachment?filepath=' + this.$route.query.article.thumbnailPath
        this.fileList.push(obj)
        if (this.fileList.length > 0) {
          this.noneBtnImg = true
        }
      }
      this.getArticleDetail(this.$route.query.article.id)
      this.isAdd = false
    } else {
      this.isAdd = true
    }
  }
}
</script>
<style lang="scss">
.articleRelease {
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
<style>
.uoloadSty {
  display: flex;
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
