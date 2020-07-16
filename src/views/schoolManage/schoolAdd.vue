<template>
  <div class="schoolAdd">
    <div class="containerTitle">
      学校设置
    </div>
    <div class="schoolAddLabel">
      <ul>
        <li @click="changeLabel(1)" :class="activeNum === 1 ? 'labelActive' : ''">
          <span>1</span>
          <p>学校/校区设置</p>
        </li>
        <li @click="changeLabel(2)" :class="activeNum === 2 ? 'labelActive' : ''">
          <span>2</span>
          <p>年级设置</p>
        </li>
        <li @click="changeLabel(3)" :class="activeNum === 3 ? 'labelActive' : ''">
          <span>3</span>
          <p>班级设置</p>
        </li>
      </ul>
    </div>
    <div class="schoolAdd-container">
      <schoolSet v-if="activeNum === 1"></schoolSet>
      <gradeSet v-if="activeNum === 2"></gradeSet>
      <classSet v-if="activeNum === 3"></classSet>
    </div>
  </div>
</template>
<script>
import schoolSet from './../../components/schoolManage/schoolSet'
import gradeSet from './../../components/schoolManage/gradeSet'
import classSet from './../../components/schoolManage/classSet'
export default {
  data () {
    return {
      activeNum: 1
    }
  },
  components: {
    schoolSet,
    gradeSet,
    classSet
  },
  methods: {
    changeLabel (res) {
      this.activeNum = res
    }
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
      .labelActive {
        span {
          background: cornflowerblue;
        }
      }
    }
  }
  .schoolAdd-container {
    margin-top: 20px;
    background: #fff;
    padding: 30px 0;
  }
}
</style>
