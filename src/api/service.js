import axios from './axios'

// 质量监测统计
export function qualityStatus () {
  return axios.get('/qualityMonitor/qualityStatus').then((res) => res.data)
}
