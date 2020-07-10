<template>
  <div class="Home">
    <Menu></Menu>
    <div class="home-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/adminManage/menu.vue'
export default {
  data () {
    return {}
  },
  components: {
    Menu
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.Home {
  padding-left: 230px;
  .home-container {
    background: #F2F2F2;
    height: 100vh;
  }
}
</style>
