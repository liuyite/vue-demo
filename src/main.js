import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
// 引入路由
import router from '@/router.js'
// 引入element.ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let tokenInfo = localStorage.getItem('login_info')
  if (tokenInfo || to.path === '/login') {
    next()
  } else {
    next({ name: 'login' })
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
