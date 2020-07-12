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
    </div>
  </div>
</template>
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
        height: 200px;
      }
    }
  }
}
</style>
