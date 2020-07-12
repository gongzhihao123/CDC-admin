import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// 基本数据管理
const Login = () => import('@/views/login.vue')

// 用户管理
const Home = () => import('@/views/Home.vue')

// 学段
const centerUser = () => import('@/views/userManage/centerUser.vue')

// 班级管理
const studentUser = () => import('@/views/userManage/studentUser.vue')

// 内容管理
// 文章管理
const articleManage = () => import('@/views/articleManage/index.vue')

// 文章发布
const articleRelease = () => import('@/views/articleManage/articleRelease.vue')

// 栏目设置
const column = () => import('@/views/articleManage/column.vue')

// 活动设置
const activity = () => import('@/views/activity')

// 活动发布
const activityRelease = () => import('@/views/activity/activityRelease')

// 活动详情
const activityDetail = () => import('@/views/activity/activityDetail')

// 分享管理
const shareManage = () => import('@/views/shareManage')

// 举报管理
const reportManage = () => import('@/views/reportManage')

const routes = [
  // 基础数据管理
  {
    path: '/',
    redirect: '/centerUser',
    name: 'home',
    component: Home,
    meta: { isNav: true, title: '用户管理' },
    children: [
      // {
      //   path: '/home/schoolManage',
      //   name: 'schoolManage',
      //   component: schoolManage,
      //   meta: { hidden: true, title: '学校管理' }
      // },
      {
        path: '/centerUser',
        name: 'centerUser',
        component: centerUser,
        meta: { hidden: true, title: '中心用户' }
      },
      {
        path: '/studentUser',
        name: 'studentUser',
        component: studentUser,
        meta: { hidden: true, title: '学生用户' }
      }
      // {
      //   path: '/home/termManage',
      //   name: 'termManage',
      //   component: termManage,
      //   meta: { hidden: true, title: '学期管理' }
      // },
      // {
      //   path: '/home/gradeManage',
      //   name: 'gradeManage',
      //   component: gradeManage,
      //   meta: { hidden: true, title: '年级管理' }
      // },
      // {
      //   path: '/home/classManage',
      //   name: 'classManage',
      //   component: classManage,
      //   meta: { hidden: true, title: '班级管理' }
      // },
      // {
      //   path: '/home/stationManage',
      //   name: 'stationManage',
      //   component: stationManage,
      //   meta: { hidden: true, title: '岗位管理' }
      // }
    ]
  },
  // 内容管理
  {
    path: '/articleManagess',
    component: Home,
    meta: { isNav: true, title: '文章管理' },
    children: [
      {
        path: '/articleManage',
        name: 'articleManage',
        component: articleManage,
        meta: { hidden: true, title: '文章列表' }
      },
      {
        path: '/articleRelease',
        name: 'articleRelease',
        component: articleRelease,
        meta: { hidden: false, title: '文章发布' }
      },
      {
        path: '/column',
        name: 'column',
        component: column,
        meta: { hidden: true, title: '栏目设置' }
      }
    ]
  },
  // 活动设置
  {
    path: '/activity',
    component: Home,
    meta: { isNav: false, title: '活动设置' },
    children: [
      {
        path: '/activity',
        name: 'activity',
        component: activity,
        meta: { hidden: true, title: '活动设置' }
      },
      {
        path: '/activityRelease',
        name: 'activityRelease',
        component: activityRelease,
        meta: { hidden: false, title: '活动发布' }
      },
      {
        path: '/activityDetail',
        name: 'activityDetail',
        component: activityDetail,
        meta: { hidden: false, title: '活动详情' }
      }
    ]
  },
  // 分享管理
  {
    path: '/shareManages',
    component: Home,
    meta: { isNav: false, title: '分享管理' },
    children: [
      {
        path: '/shareManage',
        name: 'shareManage',
        component: shareManage,
        meta: { hidden: true, title: '分享管理' }
      }
    ]
  },
  // 举报管理
  {
    path: '/reportManage',
    component: Home,
    meta: { isNav: false, title: '举报管理' },
    children: [
      {
        path: '/reportManage',
        name: 'reportManage',
        component: reportManage,
        meta: { hidden: true, title: '举报管理' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录' }
  }
]

const router = new Router({
  routes
})
router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach((transition) => {
  NProgress.done()
})

export default router
