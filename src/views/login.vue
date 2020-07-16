<template>
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item, index) in imgData" :key="index">
        <img :src= item.imgUrl alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="login-main">
    </div> -->
  <div class="login">
    <div class="logo"></div>
    <div class="form-item">
        <input class="username" v-model="userName" type="text" autocomplete="off" placeholder="账号">
        <p class="tip" v-if="userFlag">请输入正确的账号</p>
    </div>
    <div class="form-item">
        <input class="password" v-model="password" type="password" autocomplete="off" placeholder="登录密码">
        <p class="tip" v-if="passwordFlag">账号或密码不正确</p>
    </div>
    <div class="form-item"><button @click="submit">登 录</button></div>
    <div class="reg-bar">
        <a class="reg" href="" target="_blank">立即注册</a>
        <a class="forget" href="" target="_blank">忘记密码</a>
    </div>
  </div>
</template>
<script>
// import { login } from '@/api/service'
export default {
  data () {
    return {
      userName: '',
      userFlag: false,
      password: '',
      passwordFlag: false
    }
  },
  methods: {
    checkBox () {
      if (!this.userName) {
        this.userFlag = true
        return false
      } else {
        this.userFlag = false
      }
      if (!this.password) {
        this.passwordFlag = true
        return false
      } else {
        this.passwordFlag = false
      }
      return true
    },
    submit () {
      if (this.checkBox()) {
        this.$store.dispatch('login', {
          account: this.userName,
          password: this.password
        })
        // let data = {
        //   account: this.userName,
        //   password: this.password
        // }
        // login(data).then(res => console.log(res)).catch(err => console.log(err))
      }
    }
  }
}
</script>
<style lang="scss">
.login {
}
</style>
<style lang='css'>
html { height: 100%; width: 100%; }
body { height: 100%; background: #fff url(../assets/images/backgroud.png) 50% 50% no-repeat; background-size: cover;}
.login { position: absolute; left: 50%; top: 50%; width: 430px; height: 550px; margin: -300px 0 0 -215px; border: 1px solid #fff; border-radius: 20px; overflow: hidden;}
.logo { width: 104px; height: 104px; margin: 50px auto 80px; background: url(../assets/images/login.png) 0 0 no-repeat; }
.login .form-item { position: relative; width: 360px; margin: 0 auto; padding-bottom: 30px;}
.login .form-item input { width: 288px; height: 48px; padding-left: 70px; border: 1px solid #fff; border-radius: 25px; font-size: 18px; color: #fff; background-color: transparent; outline: none;}
.login .form-item button { width: 360px; height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: #1f6f4a; outline: none; cursor: pointer; background-color: #fff; }
.login .username { background: url(../assets/images/emil.png) 20px 14px no-repeat; }
.login .password { background: url(../assets/images/password.png) 23px 11px no-repeat; }
.login .tip { position: absolute; left: 20px; top: 52px; font-size: 14px; color: #f50; }
.login .reg-bar { width: 360px; margin: 20px auto 0; font-size: 14px; overflow: hidden;}
.login .reg-bar a { color: #fff; text-decoration: none; }
.login .reg-bar a:hover { text-decoration: underline; }
.login .reg-bar .reg { float: left; }
.login .reg-bar .forget { float: right; }
.login ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.login :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.login ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.login :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

@media screen and (max-width: 500px) {
    * { box-sizing: border-box; }
    .login { position: static; width: auto; height: auto; margin: 0 30px; border: 0; border-radius: 0; }
    .logo { margin: 50px auto; }
    .login .form-item { width: auto; }
    .login .form-item input, .login .form-item button, .login .reg-bar { width: 100%; }
}
</style>
