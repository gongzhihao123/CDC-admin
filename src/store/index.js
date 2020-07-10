import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/api/index'
// import { error } from '@/utils/index'

Vue.use(Vuex)
const server = service.serverManage

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    // 登录
    async login ({ commit }, data) {
      const res = await server.login(data)
      return res
    },
    async ces ({ commit }, data) {
      const res = await server.ces(data)
      return res
    }
  }
})
