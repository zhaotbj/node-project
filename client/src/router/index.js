import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/**
 * keepAlive 需要缓存的页面
 */
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import("../views/index.vue"),
      redirect:"/list",
      children: [
        {
          path:"/list",
          component: ()=> import("../views/bloglist.vue")
        },
        {
          path: '/archives',
          name:"归档",
          component: () => import("../views/index/archives.vue")
        },
        {
          path: "/about",
          name:"关于",
          component: () => import("../views/index/about.vue")
        },
        {
          path:"/write",
          name:"写文章",
          component: () => import("../views/write.vue")
        },
        {
          path:"/_id/:id",
          name:"detail",
          component: () => import("../views/index/detail.vue")
        },
        {
          path:"/login",
          name:"登录",
          component: () => import("../views/index/login.vue")
        },
        {
          path:"/register",
          name:"注册",
          component: () => import("../views/index/register.vue")
        }
      ]
    }

  ]
});

export default router;