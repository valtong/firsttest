import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  count: 0,
  count3: 1,
  text: '我是mapState方式导入初值',
  text2: '我是mapState方式导入初值',
  info: {},
  isLogin: false
}
const getters = {
  getIncrement: state => state.count,
  getDecrement: state => state.count,
  getIncrement3: state => state.count3,
  getDecrement3: state => state.count3,
  getInfo: state => state.info
}
const mutations = {
  setIncrement: state => state.count++,
  setDecrement: state => state.count--,
  setIncrement3: state => state.count3++,
  setDecrement3: state => state.count3--,
  changeText: state => { state.text = '通过mutations更改状态' },
  changeText2: state => { state.text2 = '通过store的方法 触发action, 更改状态' },
  setInfo: state => {
    if (!window.localStorage) {
      console.log('浏览器不支持localstorage')
    } else {
      var storage = window.localStorage
      state.info = JSON.parse(storage.getItem('info')) // 取出对象的时候用JSON.parse()转化为对象
    }
  },
  login: state => {
    if (!window.localStorage) {
      console.log('浏览器不支持localstorage')
    } else {
      var storage = window.localStorage
      state.isLogin = JSON.parse(storage.getItem('isLogin'))
    }
  },
  logout: state => { state.isLogin = false }
}
const actions = {
  setIncrement ({commit}) {
    commit('setIncrement')
  },
  setDecrement ({commit}) {
    commit('setDecrement')
  },
  setIncrement3 ({commit}) {
    commit('setIncrement3')
  },
  setDecrement3 ({commit}) {
    commit('setDecrement3')
  },
  changeText ({commit}) {
    commit('changeText')
  },
  setInfo ({commit}) {
    commit('setInfo')
  }
  // changeText3 ({commit}) {
  //   commit('changeText2')
  // }
}
// 将四个对象挂载到 vuex的Store下
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
// export default new Vuex.Store({
//   state: {
//     count: {
//       a: 0,
//       b: 'me'
//     }
//   },
//   getters: {
//     getIncrement: state => state.count
//   },
//   mutations: {
//     setIncrement (state, payload) {
//       state.count.a = payload.count
//       state.count.b = payload.str
//     }
//   },
//   actions: {
//     setIncrement ({commit}, payload) {
//       commit('setIncrement', payload)
//     }
//   }
// })
