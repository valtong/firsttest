import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import index from '@/page/index'
import login from '@/page/login'
// import store from '@/store'
import TTable2 from '@/components/t-infotable2.vue'
import TTable1 from '@/components/t-infotable1.vue'
import TTable3 from '@/components/t-infotable3.vue'
import TTable4 from '@/components/infotable4.vue'
import TTable5 from '@/components/infotable5.vue'
// import login from '@/page/login'
// 注册 VueRouter 组件
Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      redirect: {path: '/index/first/t1'} // 写法一
      // redirect: '/index/first/t1' // 写法二
      // 错误写法：redirect: {name: 't1'}，此时内容正确，地址不对

    },
    {
      path: '/index/:id',
      name: 'index',
      component: index,
      redirect: {name: 't1'}, // 唯一写法，redirect之后的地址为/index/:id/t1，写成path则会使id固定，重定向错误
      children: [
        {
          path: 't1',
          name: 't1',
          component: TTable1,
          meta: {
            requireAuth: true // 进入此路由需要登录
          }
        },
        {
          path: 't2',
          name: 't2',
          component: TTable2,
          meta: {
            requireAuth: true // 添加meta字段,值为true表示进入此路由需要登录
          }
        },
        {
          path: 't3',
          name: 't3',
          component: TTable3
        },
        {
          path: 't4',
          name: 't4',
          component: TTable4
        },
        {
          path: 't5',
          name: 't5',
          component: TTable5
        }
      ]
    }
  ]
})
export default router
// 判断路由
router.beforeEach((to, from, next) => {
  console.log('路由跳转', from.fullPath, to.fullPath)
  // if (to.path === '/login') {
  //   next()
  // } else {
  if (!to.meta.requireAuth) {
    next() // 不需要登录，直接进入（包括login页面）
  } else {
    if (window.localStorage.getItem('isLogin') === 'true') {
      next() // 已登录，直接进入
    } else {
      next({
        path: '/login', // 未登录，跳转到登录页面
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由（要解码）
      })
    }
  }
  // }
})
