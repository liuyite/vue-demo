import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import home from '@/views/home.vue'
import index from '@/views/index.vue'
import users from '@/views/users.vue'
import roles from '@/views/roles.vue'
import rights from '@/views/rights.vue'
import goods from '@/views/goods.vue'
import orders from '@/views/orders.vue'
import reports from '@/views/reports.vue'
import goodlist from '@/views/goodlist.vue'
import addgood from '@/views/addgood.vue'
import categories from '@/views/categories.vue'
import params from '@/views/params.vue'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'home',
      path: '/home',
      component: home,
      redirect: { name: 'index' },
      children: [
        {
          name: 'index',
          path: 'index',
          component: index
        },
        {
          name: 'users',
          path: 'users',
          component: users
        },
        {
          name: 'roles',
          path: 'roles',
          component: roles
        },
        {
          name: 'rights',
          path: 'rights',
          component: rights
        },
        {
          name: 'goods',
          path: 'goods',
          component: goods,
          redirect: { name: 'goodlist' },
          children: [
            {
              name: 'goodlist',
              path: 'goodlist',
              component: goodlist
            },
            {
              name: 'addgood',
              path: 'addgood/:id?',
              component: addgood
            }
          ]
        },
        {
          name: 'orders',
          path: 'orders',
          component: orders
        },
        {
          name: 'reports',
          path: 'reports',
          component: reports
        },
        {
          name: 'categories',
          path: 'categories',
          component: categories
        },
        {
          name: 'params',
          path: 'params',
          component: params
        }
      ]
    }
  ]
})
