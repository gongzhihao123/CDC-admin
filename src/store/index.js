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
    // 公共
    // 读取文件
    async readFile ({ commit }, data) {
      const res = await server.readFile(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 登录
    async login ({ commit }, data) {
      const res = await server.login(data)
      if (res.code === 1) {
        window.localStorage.setItem('token', res.data)
        router.push('/centerUser')
        return res
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
      const res = await server.gradeList(data.campusId, data.section)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 编辑学校班级
    async editGrade ({ commit }, data) {
      const res = await server.editGrade(data.url, data.data)
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
    // 获取文章列表
    async articleList ({ commit }, data) {
      const res = await server.articleList(data.pageNo, data.pageSize, data.data)
      if (res.code === 1) {
        return res.data
      } else {
        error(res.message)
      }
    },
    // 获取文章详情
    async articleDetail ({ commit }, data) {
      const res = await server.articleDetail(data)
      if (res.code === 1) {
        return res.data
      } else {
        error(res.message)
      }
    },
    // 删除文章
    async delArticle ({ commit }, data) {
      const res = await server.delArticle(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 修改文章列表
    async editArticle ({ commit }, data) {
      const res = await server.editArticle(data.url, data.data)
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
    // 获取栏目文章
    async channelArticleList ({ commit }, data) {
      const res = await server.channelArticleList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 添加栏目文章
    async addChannelArticle ({ commit }, data) {
      const res = await server.addChannelArticle(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 添加栏目文章
    async delChannelArticle ({ commit }, data) {
      const res = await server.delChannelArticle(data)
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
    // 修改栏目列表
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
    },
    // 活动管理
    // 添加活动
    async addActivity ({ commit }, data) {
      const res = await server.addActivity(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取活动列表
    async activityList ({ commit }, data) {
      const res = await server.activityList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 修改活动状态
    async editActivityState ({ commit }, data) {
      const res = await server.editActivityState(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除活动列表
    async delActivity ({ commit }, data) {
      const res = await server.delActivity(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 统计管理
    // 获取活动学校列表（统计）
    async actvitySchoolList ({ commit }, data) {
      const res = await server.actvitySchoolList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取统计校区列表
    async totalCampusList ({ commit }, data) {
      const res = await server.totalCampusList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取统计年级列表
    async totalGradeList ({ commit }, data) {
      const res = await server.totalGradeList(data.campusId, data.section)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取统计班级列表
    async totalClassList ({ commit }, data) {
      const res = await server.totalClassList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取活动参与情况统计列表
    async totalActivitySitua ({ commit }, data) {
      const res = await server.totalActivitySitua(data)
      if (res.code === 1) {
        return res.data
      } else {
        error(res.message)
      }
    },
    // 分享管理
    // 获取进行中活动列表
    async shareActivityList ({ commit }, data) {
      const res = await server.shareActivityList(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取活动列表
    async sharePage ({ commit }, data) {
      const res = await server.sharePage(data.page, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 下架
    async offline ({ commit }, data) {
      const res = await server.offline(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 取消下架
    async unoffline ({ commit }, data) {
      const res = await server.unoffline(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 置顶
    async shareTop ({ commit }, data) {
      const res = await server.shareTop(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 取消置顶
    async unShareTop ({ commit }, data) {
      const res = await server.unShareTop(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 删除分享
    async delShare ({ commit }, data) {
      const res = await server.delShare(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 举报管理
    // 处理
    async reportDeal ({ commit }, data) {
      const res = await server.reportDeal(data.url, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取举报列表
    async reportPage ({ commit }, data) {
      const res = await server.reportPage(data.page, data.data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    },
    // 获取分享
    async reportShare ({ commit }, data) {
      const res = await server.reportShare(data)
      if (res.code === 1) {
        return res
      } else {
        error(res.message)
      }
    }
  }
})
