import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import request from '@/utils/request'

Vue.prototype.$request = request

Vue.use(ElementUI);

Vue.config.productionTip = false
console.log(process.env.VUE_APP_URL,'环境变量')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
