import request from '@/utils/request'

export function login(formdata) {
  return request({
    url: 'http://192.168.100.126:8040/saasAdmin/admin',
    method: 'post',
    data: formdata
  })
}

export function getInfo(token) {
  return request({
    url: 'http://192.168.100.126:8040/saasAdmin/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
