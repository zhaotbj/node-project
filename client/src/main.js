import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
function rewirteLog() {
  console.log = (function (log) {
      return process.env.NODE_ENV == 'development'? log : function() {}
  }(console.log))
}
rewirteLog();
import mavonEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
Vue.use(mavonEditor)  //让Vue使用mavonEditor
Vue.use(ElementUI);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
