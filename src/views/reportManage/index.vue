<template>
  <div class="reportManage">
    <div class="containerTitle">
      举报处理
    </div>
    <div class="reportManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
           <el-radio-group v-model="handleState">
            <el-radio :label="1">未处理</el-radio>
            <el-radio :label="2">已处理</el-radio>
          </el-radio-group>
          <!-- 举报原因筛选 -->
          <el-select v-model="value" clearable placeholder="所有举报原因">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
  <!-- 表格主体 -->

      <div class="content">
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="学段代码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="学段名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="入学年龄">
            </el-table-column>
            <el-table-column
              prop="address"
              label="学制">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template>
                 <!-- slot-scope="scope" -->
                <el-button size="small" type="primary" @click="reportDialog = true">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-dialog
        title="举报内容"
        :visible.sync="reportDialog"
        width="30%">
        <span class="reportBox">
          <div class="report-content">
            <img src="./../../assets/images/timg.jpg" alt="">
            <div class="report-info">
              <h2>炫彩猫咪</h2>
              <p>哈爱爱斯路口卡美多拉开哈爱爱斯达克是那么的拉是那么的拉开门路口卡美多拉开</p>
              <img src="./../../assets/images/timg.jpg" alt="">
              <dl>
                <dt>2020-06-11 13:55:50</dt>
                <dd>
                  10
                  <img src="./../../assets/img/praise.png" alt="">
                </dd>
              </dl>
            </div>
          </div>
          <ul class="report-info">
            <li>举报原因：色情低俗</li>
            <li>举报人：马卫国</li>
            <li v-if="handleState * 1 === 2">处理结果：删除投诉内容</li>
            <li v-if="handleState * 1 === 2">处理时间：2020-06-26 18:39</li>
          </ul>
        </span>
        <span slot="footer" v-if="handleState * 1 === 1" class="dialog-footer">
          <el-button @click="reportDialog = false">忽略此投诉</el-button>
          <el-button type="primary" @click="reportDialog = false">删除投诉内容</el-button>
        </span>
        <span slot="footer" v-if="handleState * 1 === 2" class="dialog-footer">
          <el-button @click="reportDialog = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      handleState: 1,
      // 主体
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' }],
      // 分页
      currentPage: 5,
      reportDialog: false,
      options: [],
      value: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleClick (item) {
      console.log(item)
      this.reportDialogVisible = true
    },
    delPlan () {}
  }
}
</script>
<style lang="scss">
.reportManage {
  padding: 30px 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .reportManage-container {
    padding: 12px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-radio-group {
          .el-radio {
            .el-radio__input {
              display: none;
            }
          }
        }
      }
    }
    .content {
      margin: 20px 0;
      .el-table {
        max-height: 740px;
        overflow: auto;
        .el-table__header {
          th {
            background-color: #e0e0e0;
            .cell {
              text-align: report;
            }
          }
        }
        td {
          text-align: report;
          .el-popover__reference {
            margin-left: 10px;
          }
        }
      }
    }
    .el-pagination {
      text-align: report;
    }
    .el-dialog__wrapper {
      .el-dialog__body {
        .reportBox {
          .report-content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-bottom: 10px;
            border-bottom: 1px solid #F3F3F3;
            > img {
              display: inline-block;
              width: 60px;
              height: 60px;
              margin-right: 10px;
              border-radius: 60px;
            }
            .report-info {
              display: flex;
              flex-direction: column;
              h2 {
                font-size: 16px;
              }
              p {
                margin: 8px 0;
                width: 350px;
                overflow: hidden;
                line-height: 1.5;
                text-overflow: ellipsis;
                display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示。*/
                -webkit-line-clamp: 3; /*设置需要显示的行数*/
                -webkit-box-orient: vertical; /*设置伸缩盒子的子元素排列方式(从上到下垂直排列)*/
              }
              > img {
                max-width: 300px;
                margin-bottom: 5px;
              }
              dl {
                display: flex;
                justify-content: space-between;
                align-items: center;
                dd {
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  > img {
                    width: 18px;
                    margin-left: 3px;
                  }
                }
              }
            }
          }
          .report-info {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            li {
              display: flex;
              margin: 3px 70px;
            }
          }
        }
      }
    }
  }
}
</style>
