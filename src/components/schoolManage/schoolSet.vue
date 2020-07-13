<template>
  <div class="schoolSet">
    <ul class="schoolHandle">
      <li><span>学校名称：</span><el-input placeholder="请输入学校名称" v-model="input" clearable></el-input></li>
      <li><span>是否有分校区：</span><el-radio v-model="isCampus" label="1">是</el-radio><el-radio v-model="isCampus" label="2">否</el-radio></li>
      <li>
        <span>学段设置：</span>
        <el-checkbox-group v-model="checkPeriod">
          <el-checkbox label="1">小学</el-checkbox>
          <el-checkbox label="2">初中</el-checkbox>
          <el-checkbox label="3">高中</el-checkbox>
        </el-checkbox-group>
      </li>
      <li class="campusTitle" v-if="isCampus * 1 === 1">
        <span>校区设置：</span>
        <el-button size="small" type="primary" @click="addCampus">添加校区</el-button>
      </li>
      <div v-if="isCampus * 1 === 1">
        <li class="campus" v-for="(item, index) in itemArr" :key="index">
          <div>
            <span>校区名称：</span>
            <el-input placeholder="请输入学校名称" v-model="item.name" clearable></el-input>
            <el-button type="text" @click="delCampus(index)">删除</el-button>
          </div>
          <p>
            <span>所属学段：</span>
            <el-checkbox-group v-model="item.checkPeriod">
              <el-checkbox label="1">小学</el-checkbox>
              <el-checkbox label="2">初中</el-checkbox>
              <el-checkbox label="3">高中</el-checkbox>
            </el-checkbox-group>
          </p>
        </li>
      </div>
      <p>
        <el-button type="primary">保存</el-button>
        <el-button>返回</el-button>
      </p>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      isCampus: 1,
      checkPeriod: [],
      itemArr: [{ name: '1', checkPeriod: [] }, { name: '2', checkPeriod: [] }],
      ele: { name: '', checkPeriod: [] }
    }
  },
  methods: {
    addCampus () {
      this.itemArr.push(this.ele)
    },
    delCampus (index) {
      this.itemArr.splice(index, 1)
    }
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
      // align-items: center;
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
    .campusTitle {
      padding-top: 10px;
      border-top: 1px solid #ccc;
    }
    .campus {
      display: flex;
      flex-direction: column;
      div {
        .el-button {
          margin-left: 10px;
        }
        > span {
          display: inline-block;
          width: 110px;
          text-align: right;
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
    > p {
      margin: 40px 0 0 30px;
    }
  }
}
</style>
