import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import home from '@/views/home.vue'
import index from '@/views/index.vue'
import users from '@/views/users.vue'
import roles from '@/views/roles.vue'
import rights from '@/views/rights.vue'
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
        }
      ]
    }
  ]
})
