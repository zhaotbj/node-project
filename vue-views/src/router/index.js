import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Archives from '@/components/archives'
import Categories from '@/components/categories'
import About from '@/components/about'
import upload from '@/components/upload'
import article from  '@/components/article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'upload',
          name: 'upload',
          component: upload
        },
        {
          path: '/article/:id',
          name: 'article',
          component: article,
          props: false
        },
        
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
