import Vue from 'vue'
import App from './layout/App.vue'
import './assets/scss/index.scss'
import './plugins/element.js'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
