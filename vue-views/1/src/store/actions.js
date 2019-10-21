import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'

export default {
  // 登录
  Login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        // console.log(response.data)
        // const data = response.data
        const data = { "code": 20000, "data": { "roles": ["admin"], "name": "admin", "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" } }
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  LogOut({ commit }, params) {
    return new Promise((resolve, reject) => {
      request.post('/main/logout.zm').then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}