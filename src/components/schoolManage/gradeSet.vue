<template>
  <div class="gradeSet">
    <div class="gradeBox">
      <div class="schoolZone">
        <span>
          <h3>怀柔二中</h3>
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
      </div>
      <div class="campusZone">
        <div class="campusBox">
          <span>
            <h3>怀柔二中</h3>
            <el-button type="primary" size="small">添加年级</el-button>
          </span>
          <div>
            <b>小学：</b>
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
        </div>
        <div class="campusBox">
          <span>
            <h3>怀柔二中</h3>
            <el-button type="primary" size="small">添加年级</el-button>
          </span>
          <div>
            <b>小学：</b>
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
        <li v-if="isAdd * 1 === 1">
          <span>所属学段：</span>
          <el-select v-model="period" clearable placeholder="请选择">
            <el-option
              v-for="item in periodList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gradeSetDialog = false">取 消</el-button>
        <el-button type="primary" @click="gradeSetDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      gradeSetDialog: false,
      periodList: [],
      period: '',
      gradeName: '',
      isAdd: 1
    }
  },
  methods: {
    handleGrade (e) {
      this.gradeSetDialog = true
      this.isAdd = e
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
