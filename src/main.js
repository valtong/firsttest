// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from './store' // import store文件
Vue.use(Vuex)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
// axios.post('signToken', {
//   'NickName': 'xxxx',
//   'Password': 'xxxx',
//   'RequestSign': 'B858C5EEE7FD4D37C635FB55841ACA59' }).then(res => {
//   axios.defaults.headers.common['Authorization'] = res.headers.authorization
// })

new Vue({
  el: '#app',
  router,
  store, // 在 vue 中注册 store 选项,让它的子组件和 store 连接
  components: { App },
  template: '<App/>'
})
