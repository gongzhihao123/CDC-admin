<template>
  <div class="Home">
    <Menu></Menu>
    <router-view></router-view>
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
  }
}
</script>
