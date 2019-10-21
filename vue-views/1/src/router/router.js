import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Module1 from '@/views/module1/module1'
import Module2 from '@/views/module2/module2'
import Module3 from '@/views/module3/module3'
import Module4 from '@/views/module4/module4'
/* const Module1 = r => require.ensure([], () => r(require('@/views/module1/module1.vue')), 'module1')
const Module2 = r => require.ensure([], () => r(require('@/views/module2/module2.vue')), 'module2')
const Module3 = r => require.ensure([], () => r(require('@/views/module3/module3.vue')), 'module3')
const Module4 = r => require.ensure([], () => r(require('@/views/module4/module4.vue')), 'module4')
   */
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/module1',
          name: 'module1',
          component: Module1
        },
        {
          path: '/module2',
          name: 'module2',
          component: Module2
        },
        {
          path: '/module3',
          name: 'module3',
          component: Module3
        },
        {
          path: '/module4',
          name: 'module4',
          component: Module4
        }
      ]
    }
  ]
})
