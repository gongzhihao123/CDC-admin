<template>
  <div class="login">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item, index) in imgData" :key="index">
        <img :src= item.imgUrl alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="login-main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgData: [
        { imgUrl: require('@/assets/images/login1.jpg') },
        { imgUrl: require('@/assets/images/login2.jpg') },
        { imgUrl: require('@/assets/images/login3.jpg') },
        { imgUrl: require('@/assets/images/login4.jpg') },
        { imgUrl: require('@/assets/images/login5.jpg') },
        { imgUrl: require('@/assets/images/login6.jpg') },
        { imgUrl: require('@/assets/images/login7.jpg') }],
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss">
.login {
  position: relative;
  .el-carousel__item img {
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__container {
    height: 100vh;
  }
  .el-carousel__indicators--outside {
    display: none;
  }
  .login-main {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-30%);
    width: 700px;
    height: 700px;
    background: #d3dce6;
    opacity: 0.7;
    z-index: 99;
  }
}
</style>
