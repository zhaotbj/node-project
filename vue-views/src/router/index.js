import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Archives from '@/components/archives'
import Categories from '@/components/categories'
import About from '@/components/about'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'archives',
          name: 'Archives',
          component: Archives
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: 'about',
          name: 'About',
          component: About
        }
      ]
    }
  ]
})
