import axios from 'axios'
import locStor from '@/utils/localStorage'
// 创建axios实例

const service = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 100000 // 请求超时时间
  })

export default service