<template>
  <div class="termManage">
    <!-- 搜索表头 -->
    <el-row>
      <el-col>
        <el-button type="primary">编辑</el-button>
      </el-col>
    </el-row>
    <div class="term-main">
      <el-card class="box-card">
        <dl>
          <dt>当前学年：</dt>
          <dd>2019 - 2020</dd>
        </dl>
        <dl>
          <dt>当前学期：</dt>
          <dd>第一学期</dd>
        </dl>
        <dl>
          <dt>学期开始时间：</dt>
          <dd>2019-09-15</dd>
        </dl>
        <dl>
          <dt>学期周数：</dt>
          <dd>34周</dd>
        </dl>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.termManage {
  margin-left: 230px;
  padding: 30px 20px;
  .el-row {
    .el-col {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button {
        padding: 9px 20px;
      }
    }
  }
  .term-main {
    margin-top: 20px;
    .text {
      font-size: 14px;
    }
    .item {
      padding: 14px 0;
    }
    .box-card {
      width: 480px;
      dl {
        margin: 16px 0;
        dt {
          display: inline-block;
        }
        dt::before {
          content: '*';
          display:inline-block;
          width: 10px;
          height: 14px;
          vertical-align: middle;
          color: #f00;
        }
        dd {
          display: inline-block;
        }
      }
    }
  }
}
</style>
