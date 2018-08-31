# vueproject

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 项目总结
## 命名
  * components命名不能与HTML标签相同
## 组件注册
  ### 原始写法

    ```
      # 冒号:前为模板中引用的组件名，可用中横线命名法,冒号:后为import组件时的变量名，不可用中横线命名法
      components: {
          'Hsection': Tsection
        }
    ```

  ### 简写
  ```
      components: {
        Tsection   //与import组件时的变量名一致，即模板中引用的组件名
      }
  ```
  ### 当组件为驼峰命名时，模板中引用的组件名可用-代替驼峰
  ```
    eg:components: {
        tSection;   //模板中引用的组件名可为<t-section></t-section>或者<tSection></tSection>
        TSection ;  //模板中引用的组件名可为<t-section></t-section>或者<T-section></T-section>或者<TSection></TSection>
      }
  ```

## vuex的引用
  1. 安装 

  ```
    $ npm install --save-dev vuex
  ```

  2. 在main.js 中注册 store 选项，引入store文件和vuex

  ```
      # 引入顺序:先引入插件、依赖（vuex），后引入文件（store）
      import Vuex from 'vuex'
      import store from '../store'
      Vue.use(Vuex)
      # 注册
      new Vue({
        el: '#app',
        router,
        store,
        ...
      })
  ```

  3. 新建store文件夹(store 存储应用所需的数据,所有组件都从 store 中读取数据)

  ```
  # 小型项目文件夹结构（注：内部js文件取名为index.js时import store from '../store'可直接找到index.js，若js文件为其他名字则需写成import store from '../store/xx'）
    store
        |__ index.js
  
      ## index.js
        import Vue from 'vue'
        import Vuex from 'vuex'
        
        // 使用 vuex
        Vue.use(Vuex)

        // 创建一个对象来保存应用启动时的初始状态,可以理解为 Vue 实例中的 data 对象
        const state = {
          count:0       //放置初始状态
        }
        // store 的计算属性,存储 state 中状态的返回值(取得组件需要的数据)
        const getters = {
          getIncrement: state => state.count,
        }
        // 创建一个对象存储一系列接下来要写的 mutation 函数,类似于事件,都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数即为实际进行状态更改的地方，并且它会接受 state 作为第一个参数，通过 store.commit 触发事件
        const mutations = {
          setIncrement: state => state.count++,  //放置状态变更函数
        }
        // 提交 mutation，触发状态变更
        const actions = {
          setIncrement ({commit}) {
            commit('setIncrement')
          }
        }
        export default new Vuex.Store({
          state,
          getters,
          mutations,
          actions
        })
  # store针对大项目进行结构划分2种常用文件夹结构
    * store
          |__ index.js
          |__ states.js
          |__ getters.js
          |__ mutations.js
          |__ action.js

      ## index.js
          import Vue from 'vue'
          import Vuex from 'vuex'
          import states from './state.js'
          import mutatons from './mutations.js'
          import actions from './actions.js'
          import getters from './getters'
          
          Vue.use(Vuex)
          
          export default new Vuex.Store({
            state, mutations
          })

      ## states.js
          export default {
            count:0
          }

      ## getters.js
          // 在 ES6 里可以这样写 
          // export const getCount = state => state.count
          export function getCount (state) {
              return state.count
          }
      ## mutations.js
          export const setCount = state => state.count++

      ## actions.js
          // action 会收到 store 作为它的第一个参数
          export const increment = function ({ commit, state }) {
            commit('increment', 1) 
          }

    * store
          |__ modules
            |__ module1
              |__ index.js
            |__ module2
              |__ index.js
            |__ actions.js
            |__ getters.js
            |__ index.js
            |__ mutations.js

      ## module1 index.js
        export default {
          state:{},
          mutatons:{},
          actions:{},
          getters:{}
        }

      ## module2 index.js
        export default {
          state:{},
          mutatons:{},
          actions:{},
          getters:{}
        }

      ## modules index.js
        import vue from 'vue'
        import vuex from 'vuex'
        import mod1 from './mod1.js'
        import mod2 from './mod2.js'
        vue.use(vuex);
        export default new vuex.Store({
                                              modules:{
                                                          mod1:module1,
                                                          mod2:module2
                                            }
                          });
  ```
  
  4. 组件内使用方法

  ```
  # 引入
  import {mapActions, mapGetters} from 'vuex'
  # 在computed使用getters
    computed:{
      //  mapGetters 方法用于将 store 中的状态批量映射为 Vue 的数据
      ...mapGetters(['getIncrement'])
    }
  # 在methods使用actions
    methods: {
        // 使用 mapMutations 辅助函数将 methods 映射为 store.commit 调用
        // 将 `this.setIncrement()` 映射为 `this.$store.commit('setIncrement')`
        ...mapActions(['setIncrement', 'setDecrement']),
        // addValue为定义在组件中的函数，注意组件中定义的函数名与调用的Mutation的函数不能同名，否则同名函数会一直调用，出现栈溢出的错误
        addValue () {
          this.setIncrement()
        }
    }
  # watch监听
    // 动态路由中组件实例被复用，则组件的生命周期钩子不会再被调用，想对路由参数的变化作出响应的话，需要用 watch 监测 $route 对象
    
    watch: {
    // count为定义在组件中的变量
    // 利用watch监控getIncrement的变化，将其变化后的值赋给组件中的变量
       getIncrement (newVal, oldVal) {
         this.count = newVal
       }

    }
  ```

## proxyTable配置
  ```
  ### 三种写法：
    *  proxyTable: {
        '/api': {
          target: 'https://easy-mock.com',  // 接口的域名
          changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
          // secure: false,  // 如果是https接口，需要配置这个参数
          pathRewrite: {
            '^/api': '/mock/5b729b4bb99a824f63da9c1b/api'  // 接口路径地址
          }
        }
      },
    *  proxyTable: {
        '/api': {
          target: 'https://easy-mock.com/mock/5b729b4bb99a824f63da9c1b/api', 
          changeOrigin: true,  
          pathRewrite: {
            '^/api': ''   
          }
        }
      },
    *  proxyTable: {
        '/api': {
          target: 'https://easy-mock.com/mock/5b729b4bb99a824f63da9c1b', 
          changeOrigin: true,            
        }
      },  
  ### pathRewrite的作用：    
    '/api': {},表示接口只有是'/api'开头的才用代理.所以接口写成 /api/xx/xx. 最后代理的路径就是 http://xxx.xx.com/api/xx/xx.（target+接口）

    如果正确的接口路径里面没有/api. 所以就需要 pathRewrite,用''^/api'':'', 把'/api'去掉, 这样既能有正确标识, 又能在请求接口的时候去掉api.  
  ### 不使用代理的时候，接口写为完整的路径 http://xxx.xx.com/api/xx/xx
  ```
## axios使用
  1. 安装
  ```
    $ npm install axios
  ```
  2. main.js中引入
  ```
    import axios from 'axios' 
    Vue.prototype.$http = axios // 给Vue添加一个原型属性$http 指向Axios，则在vue实例或组件中不用再去重复引用Axios，直接用this.$http就能执行axios 方法了
  ```
  3. 执行get请求
  ```
    axios.get('/api/testVue')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  ```
