// import http from './http'
import axios from './axios'

// 登录
export function login (data) {
  return axios.post('/login/webLogin', data).then((res) => res.data)
}

// 中心用户管理
// 新增中心用户
export function addUser (data) {
  return axios.post('/userManage/user', data).then((res) => res.data)
}

// 获取中心用户列表
export function userList (data) {
  return axios.get('/userManage/userPage/' + data.pageNo + '/' + data.pageSize).then((res) => res.data)
}

// 编辑中心用户
export function editUser (url, data) {
  return axios.post('/userManage/user/' + url, data).then((res) => res.data)
}

// 删除中心用户
export function delUser (url) {
  return axios.delete('/userManage/user/' + url).then((res) => res.data)
}

// 重置用户
export function resetUser (url, data) {
  return axios.post('/userManage/resetPassword/' + url, data).then((res) => res.data)
}

// 学校设置
// 获取校区列表
export function schoolList (data) {
  return axios.get('/schoolManage/schoolPage/' + data.pageNo + '/' + data.pageSize).then((res) => res.data)
}
// 新增学校
export function addSchool (data) {
  return axios.post('/schoolManage/school', data).then((res) => res.data)
}
// 删除学校
export function delSchool (url) {
  return axios.delete('/schoolManage/school/' + url).then((res) => res.data)
}

// 编辑学校
export function editSchool (url, data) {
  return axios.post('/schoolManage/school/' + url, data).then((res) => res.data)
}

// 获取校区列表
export function campusList (data) {
  return axios.get('/campusManage/campusList/' + data).then((res) => res.data)
}

// 新增学校校区
export function addCampus (data) {
  return axios.post('/campusManage/campus', data).then((res) => res.data)
}

// 删除校区
export function delCampus (url) {
  return axios.delete('/campusManage/campus/' + url).then((res) => res.data)
}

// 编辑学校校区
export function editCampus (url, data) {
  return axios.post('/campusManage/campus/' + url, data).then((res) => res.data)
}

// 新增年级
export function addGrade (data) {
  return axios.post('/gradeManage/grade', data).then((res) => res.data)
}

// 获取年级列表
export function gradeList (data) {
  return axios.get('/gradeManage/gradeList/' + data).then((res) => res.data)
}

// 删除年级
export function delGrade (url) {
  return axios.delete('/gradeManage/grade/' + url).then((res) => res.data)
}

// 获取班级列表
export function classList (data) {
  return axios.get('/classManage/classList/' + data).then((res) => res.data)
}

// 新增班级
export function addClass (data) {
  return axios.post('/classManage/class', data).then((res) => res.data)
}

// 新增班级
export function classBatchAdd (data) {
  return axios.post('/classManage/classBatchAdd/' + data.gradeId + '/' + data.classNumber).then((res) => res.data)
}

// 删除班级
export function delClass (url) {
  return axios.delete('/classManage/class/' + url).then((res) => res.data)
}

// 编辑班级
export function editClass (url, data) {
  return axios.post('/classManage/class/' + url, data).then((res) => res.data)
}

// 文章管理
// 文章发布
export function addArticle (data) {
  return axios.post('/articleManage/article', data).then((res) => res.data)
}

// 删除上传文件
export function delUploadFile (url) {
  return axios.delete('/common/attachment', { params: url }).then((res) => res.data)
}
