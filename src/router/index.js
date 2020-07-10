import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

// 基本数据管理
const Login = () => import('@/views/login.vue')

// 基本数据管理
const Home = () => import('@/views/Home.vue')

// 学校管理
const schoolManage = () => import('@/views/dataManage/schoolManage.vue')

// 学段管理
const periodManage = () => import('@/views/dataManage/periodManage.vue')

// 学期管理
const termManage = () => import('@/views/dataManage/termManage.vue')

// 年级管理
const gradeManage = () => import('@/views/dataManage/gradeManage.vue')

// 班级管理
const classManage = () => import('@/views/dataManage/classManage.vue')

// 班级管理
const studentManage = () => import('@/views/dataManage/studentManage.vue')

// 班级管理
const stationManage = () => import('@/views/dataManage/stationManage.vue')

// 内容管理
// 文章管理
const articleManage = () => import('@/views/articleManage/index.vue')

// 文章审核
const articleExamine = () => import('@/views/articleManage/articleExamine.vue')

// 组织架构
const structure = () => import('@/views/structure')

// 应用管理
const applyManage = () => import('@/views/applyManage')

const routes = [
  // 基础数据管理
  {
    path: '/',
    redirect: '/home/schoolManage',
    name: 'home',
    component: Home,
    meta: { isNav: true, title: '基础数据管理' },
    children: [
      {
        path: '/home/schoolManage',
        name: 'schoolManage',
        component: schoolManage,
        meta: { hidden: true, title: '学校管理' }
      },
      {
        path: '/home/periodManage',
        name: 'periodManage',
        component: periodManage,
        meta: { hidden: true, title: '学段管理' }
      },
      {
        path: '/home/termManage',
        name: 'termManage',
        component: termManage,
        meta: { hidden: true, title: '学期管理' }
      },
      {
        path: '/home/gradeManage',
        name: 'gradeManage',
        component: gradeManage,
        meta: { hidden: true, title: '年级管理' }
      },
      {
        path: '/home/classManage',
        name: 'classManage',
        component: classManage,
        meta: { hidden: true, title: '班级管理' }
      },
      {
        path: '/home/studentManage',
        name: 'studentManage',
        component: studentManage,
        meta: { hidden: true, title: '学生管理' }
      },
      {
        path: '/home/stationManage',
        name: 'stationManage',
        component: stationManage,
        meta: { hidden: true, title: '岗位管理' }
      }
    ]
  },

  // 组织架构
  {
    path: '/structure',
    component: Home,
    meta: { isNav: false, title: '组织架构' },
    children: [
      {
        path: '/structure',
        name: 'structure',
        component: structure,
        meta: { hidden: true, title: '组织架构' }
      }
    ]
  },
  // 内容管理
  {
    path: '/home/articleManagess',
    component: Home,
    meta: { isNav: true, title: '内容管理' },
    children: [
      {
        path: '/home/articleManage',
        name: 'articleManage',
        component: articleManage,
        meta: { hidden: true, title: '文章管理' }
      },
      {
        path: '/home/articleExamine',
        name: 'articleExamine',
        component: articleExamine,
        meta: { hidden: true, title: '文章审核' }
      }
    ]
  },
  // 应用管理
  {
    path: '/applyManage',
    component: Home,
    meta: { isNav: false, title: '应用管理' },
    children: [
      {
        path: '/applyManage',
        name: 'applyManage',
        component: applyManage,
        meta: { hidden: true, title: '应用管理' }
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
