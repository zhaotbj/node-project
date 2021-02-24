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
      children: [
        {
          path:"/",
          name:"list",
          component: ()=> import("../views/blog/bloglist.vue")
        },
        {
          path: '/archives',
          name:"archives",
          component: () => import("../views/blog/archives.vue")
        },
        {
          path: "/about",
          name:"about",
          component: () => import("../views/blog/about.vue")
        }
      ]
    },
    {
      path:"/write",
      name:"write",
      component: () => import("../views/blog/write.vue")
    },
    {
      path:"/_id/:id",
      name:"detail",
      component: () => import("../views/blog/detail.vue")
    },
    {
      path:"/login",
      name:"login",
      component: () => import("../views/login/login.vue")
    },
    {
      path:"/register",
      name:"register",
      component: () => import("../views/login/register.vue")
    }
  ]
});

export default router;