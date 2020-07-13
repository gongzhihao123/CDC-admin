<template>
  <div class="schoolAdd">
    <div class="containerTitle">
      学校设置
    </div>
    <div class="schoolAddLabel">
      <ul>
        <li @click="changeLabel">
          <span>1</span>
          <p>学校/校区设置</p>
        </li>
        <li @click="changeLabel">
          <span>2</span>
          <p>年级设置</p>
        </li>
        <li @click="changeLabel">
          <span>3</span>
          <p>班级设置</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss">
.schoolAdd {
  padding: 30px 20px;
  .containerTitle {
    border-left: 4px solid rgb(9, 98, 201);
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .schoolAddLabel {
    display: flex;
    justify-content: center;
    height: 64px;
    background: #fff;
    ul {
      width: 600px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          color: #fff;
          background: rgb(209, 206, 206);
          font-size: 18px;
        }
        p {
          margin-left: 5px;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
