<template>
  <div class="articleDetail">
    <div class="containerTitle">
      <span @click="backArticleManage">文章管理</span> >> 文章详情
    </div>
    <div class="articleDetail-container">
      <div class="articleDetail-content">
        <div class="articleDetail-title">
          <div>
            <span></span>
            <h1>预防近视最有效的方法</h1>
            <el-button type="text" @click="backArticleManage">返回</el-button>
          </div>
          <div>发布时间：2020-07-09  10:29</div>
        </div>
        <div class="articleDetail-info">
          <p>大家知道，我国中小学生的近视情况是越来越严重的。小学五、六年级，一个班有一半的孩子带上了眼镜，甚至刚刚进入小学一年级的孩子，就有佩戴眼镜的了。针对这种情况，教育部门联合学校和医院，展开行动。</p>
          <img src="./../../assets/images/timg.jpg" alt="">
          <p>最近，北京市海淀医院展开了一项针对小学生视力卫生档案的长期跟踪活动。活动针对海淀区小学的学生，从一年级开始，记录裸眼视力、储备视力（眼轴长度）、眼底健康情况等信息。学校也为孩子们准备了视力表和健康日记，要求家长协助孩子做好视力的记录。医院、学校、老师、家长、孩子一起努力，为孩子眼睛保持良好的健康状态奋斗。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    backArticleManage () {
      this.$router.push('/articleManage')
    }
  }
}
</script>
<style lang="scss">
.articleDetail {
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
  .articleDetail-container {
    display: flex;
    justify-content: center;
    background: #fff;
    padding-bottom: 30px;
    .articleDetail-content {
      width: 600px;
      // border: 1px solid #ccc;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .articleDetail-title {
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          justify-content: center;
          h1 {
            font-size: 20px;
          }
        }
        div:first-child {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
        }
        div:last-child {
          margin-top: 5px;
          color: #AEAEAE;
        }
      }
      .articleDetail-info {
        p {
          margin: 16px 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
