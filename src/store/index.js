import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/api/index'
import router from '@/router/index'
import { error } from '@/utils/index'

Vue.use(Vuex)
const server = service.service

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
      if (res.code === 1) {
        window.localStorage.setItem('token', res.data)
        router.push('/centerUser')
      } else {
        error(res.message)
      }
    },
    // 中心用户管理
    // 中心用户添加
    async addUser ({ commit }, data) {
      const res = await server.addUser(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取中心用户列表
    async userList ({ commit }, data) {
      const res = await server.userList(data)
      if (res.code === 1) {
        return res.data
      } else {
        error(res.message)
      }
    },
    // 中心用户编辑
    async editUser ({ commit }, data) {
      const res = await server.editUser(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除中心用户
    async delUser ({ commit }, url) {
      const res = await server.delUser(url)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 重置用户密码
    async resetUser ({ commit }, data) {
      const res = await server.resetUser(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 校区设置
    // 获取学校分页列表
    async schoolList ({ commit }, data) {
      const res = await server.schoolList(data)
      if (res.code === 1) {
        return res.data
      } else {
        error(res.message)
      }
    },
    // 新增
    async addSchool ({ commit }, data) {
      const res = await server.addSchool(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除学校
    async delSchool ({ commit }, url) {
      const res = await server.delSchool(url)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 修改学校
    async editSchool ({ commit }, data) {
      const res = await server.editSchool(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取学校校区列表
    async campusList ({ commit }, data) {
      const res = await server.campusList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 新增学校校区
    async addCampus ({ commit }, data) {
      const res = await server.addCampus(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除学校校区
    async delCampus ({ commit }, data) {
      const res = await server.delCampus(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 编辑学校校区
    async editCampus ({ commit }, data) {
      const res = await server.editCampus(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 新增学校校区
    async addGrade ({ commit }, data) {
      const res = await server.addGrade(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取年级列表
    async gradeList ({ commit }, data) {
      const res = await server.gradeList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除年级列表
    async delGrade ({ commit }, data) {
      const res = await server.delGrade(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取班级列表
    async classList ({ commit }, data) {
      const res = await server.classList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 新增学校班级
    async addClass ({ commit }, data) {
      const res = await server.addClass(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 新增学校班级
    async classBatchAdd ({ commit }, data) {
      const res = await server.classBatchAdd(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除班级列表
    async delClass ({ commit }, data) {
      const res = await server.delClass(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 修改班级列表
    async editClass ({ commit }, data) {
      const res = await server.editClass(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 文章管理
    // 添加文章
    async addArticle ({ commit }, data) {
      const res = await server.addArticle(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除上传文件
    async delUploadFile ({ commit }, data) {
      const res = await server.delUploadFile(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 栏目管理
    // 添加栏目
    async addChannel ({ commit }, data) {
      const res = await server.addChannel(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取栏目列表
    async channelList ({ commit }, data) {
      const res = await server.channelList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取栏目列表
    async editChannel ({ commit }, data) {
      const res = await server.editChannel(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除栏目列表
    async delChannel ({ commit }, data) {
      const res = await server.delChannel(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    }
  }
})
