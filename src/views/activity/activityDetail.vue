<template>
  <div class="activityDetail">
    <div class="containerTitle">
      <span @click="backActivityManage">活动设置</span> >> 活动详情
    </div>
    <div class="activityRelease-container">
      <div class="activityRelease-info">
        <h1>暑期防近视活动</h1>
        <ul>
          <li>
            <p>创建时间：</p>
            <span>2020-06-26 18:39</span>
          </li>
          <li>
            <p>状态：</p>
            <span>进行中</span>
          </li>
          <li>
            <p>创建人：</p>
            <span>徐娟</span>
          </li>
        </ul>
        <img src="" alt="">
      </div>
      <div class="activityRelease-content">
        <dl>
          <dt>起止时间：</dt>
          <dd>2020-06-26 到 2020-08-20 </dd>
        </dl>
        <SCREEN @getSchool="getSchool"></SCREEN>
        <ul>
          <li>参与人数：<span>203</span></li>
          <li>打卡总数：<span>203</span></li>
          <li>分享总数：<span>203</span></li>
        </ul>
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
        </el-table>
        <el-pagination
          v-if="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import SCREEN from './../../components/common/screen'
export default {
  data () {
    return {
      // 主体
      tableData: [],
      // 分页
      currentPage: 5,
      total: ''
    }
  },
  components: {
    SCREEN
  },
  methods: {
    // 筛选
    getSchool (data) {
      console.log('ss', data)
    }
  }
}
</script>
<style lang="scss">
.activityDetail {
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
    .activityRelease-info {
      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      > ul {
        display: flex;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          margin:10px 30px 10px 0;
          p {
            color: #ACACAC;
          }
        }
        li:nth-child(2) {
          span {
            color: #51D47D;
          }
        }
      }
      > img {
        display: block;
        width: 200px;
        height: 150px;
        background: aqua;
      }
    }
    .activityRelease-content {
      > dl {
        display: flex;
        margin: 10px 0;
      }
      > ul {
        display: flex;
        margin: 10px 0;
        li {
          margin-left: 20px;
          font-size: 16px;
          span {
            color: #13D071;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
