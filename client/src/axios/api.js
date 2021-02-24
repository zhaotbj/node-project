import axios from 'axios'
import qs from 'qs'
const service = axios.create({
  baseURL: 'http://192.168.0.103:3002/',
  // baseURL: 'http://39.100.82.50:3002/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// / http request 拦截器
service.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头 
    // 中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态 
    // 码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // console.log("config",config)
    const contentType = config.headers["Content-Type"];
    if(config.method === 'post') {
      if (!contentType.includes("multipart")) {
        config.data = qs.stringify(config.data);
      }
    } else {
      config.data = JSON.stringify(config.data);
    }
    const token = 'store.state.token';
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error)
)


// http response 拦截器
service.interceptors.response.use(
  response => {
    console.log('response',response)
    //拦截响应，做统一处理 
    if (response.data.code) {
      // switch (response.data.code) {
      //   case 1002:
      //     store.state.isLogin = false
      //     router.replace({
      //       path: 'login',
      //       query: {
      //         redirect: router.currentRoute.fullPath
      //       }
      //     })
      // }
    }
    return response.data;
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    console.log(error)
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })

// export function get(url, params) {
//   return new Promise((resolve, reject) => {
//     instance.get(url, {
//       params: params
//     }).then(res => {
//       resolve(res.data);
//     }).catch(err => {
//       reject(err.data)
//     })
//   });
// }

// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//     instance.post(url, qs.stringify(params))
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   });
// }
export default service