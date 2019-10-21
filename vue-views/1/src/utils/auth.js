import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

export function getToken(tokenKey) {
  return Cookies.get(tokenKey)
}

export function setToken(tokenKey,token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(tokenKey) {
  return Cookies.remove(tokenKey)
}
export function getParams(Content) {
  let params = {}
  params.token = Cookies.get('token')
  params.AccountID = Cookies.get('AccountID')
  params.Content

  return params
}
