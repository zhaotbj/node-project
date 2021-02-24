import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store';
import '@/assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
function rewirteLog() {
  console.log = (function (log) {
      return process.env.NODE_ENV == 'development'? log : function() {}
  }(console.log))
}
rewirteLog();
import mavonEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
Vue.use(mavonEditor)  //让Vue使用mavonEditor
Vue.config.productionTip = false;
const Bus = new Vue()
Vue.use(Bus)
Vue.prototype.$Bus = Bus

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
