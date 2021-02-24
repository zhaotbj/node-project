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
      component: () => import(/* webpackChunkName: "list" */ "../views/index.vue"),
      children: [
        {
          path:"/",
          name:"list",
          component: ()=> import(/* webpackChunkName: "list" */ "../views/blog/bloglist.vue")
        },
        {
          path: '/archives',
          name:"archives",
          component: () => import(/* webpackChunkName: "archives" */ "../views/blog/archives.vue")
        },
        {
          path: "/about",
          name:"about",
          component: () => import(/* webpackChunkName: "about" */ "../views/blog/about.vue")
        }
      ]
    },
    {
      path:"/write",
      name:"write",
      component: () => import(/* webpackChunkName: "write" */ "../views/blog/write.vue")
    },
    {
      path:"/_id/:id",
      name:"detail",
      component: () => import(/* webpackChunkName: "detail" */ "../views/blog/detail.vue")
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