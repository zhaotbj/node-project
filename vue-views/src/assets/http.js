import axios from 'axios'
import router from '@/router/index'


export const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const httpPlugin = {}

httpPlugin.install = function (Vue, options) {

  Vue.prototype.$http = http
}
export default httpPlugin