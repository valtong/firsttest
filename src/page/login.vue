<template>
    <div class="login-wrap">
        <h3>登录</h3>
        <!-- <form action="./#/login" method="GET" class="login"> -->
        <div class="login">
          <div class="login-box user">
              <span>账号</span>
              <input type="text" name="username" id="username" v-model = "username" placeholder="请输入用户名">
              <p>{{userMsg}}</p>
          </div>
          <div class="login-box pass">
              <span>密码</span>
              <input type="password" name="password" id="password" v-model = "password" placeholder="请输入密码">
              <p>{{passMsg}}</p>
          </div>
          <div class="login-box">
              <button @click = "login($event)">登录</button>
          </div>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: '',
      passMsg: '',
      userMsg: '',
      redirect: ''
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations(['login']),
    check () {
      if (!this.username) {
        this.userMsg = '*请输入用户名'
        return false
      } else if (!this.password) {
        this.passMsg = '*请输入密码'
        return false
      } else {
        return true
      }
    },
    savetoLocalstorage (a, b) {
      if (!window.localStorage) {
        console.log('浏览器不支持localstorage')
      } else {
        let storage = window.localStorage
        storage.setItem(a, b)
      }
    },
    login ($event) {
      let check = this.check()
      // $event.preventDefault() // 阻止form默认提交表单（form有自动提交表单功能，使用Button和input type=‘submit’都能提交，并且会刷新页面）
      if (check) {
        let data = {
          username: this.username,
          password: this.password
        }
        this.$http.post('/api/testVue3', data)
          .then((res) => {
            console.log(res.data.status)
            if (+res.data.status === 1) {
              this.redirect = decodeURIComponent(this.$route.query.redirect || '/') // 获取登录成功后要跳转的路由
              this.savetoLocalstorage('isLogin', true)
              // setTimeout(function () { window.location.href = document.referrer }, 5000) // document.referrer为上一个页面url
              this.$router.push(this.redirect)
              // this.$store.commit('login')
            }
            // else {
            //   window.location.reload() // ajax刷新页面
            // }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // 不能访问组件实例 `this`
    console.log('beforeRouteEnter::to.fullPath', from.fullPath, to.fullPath)
    next(vm => {
      // 通过 `vm` 访问组件实例，保存要进入的url
      vm.redirect = from.fullPath
    })
    next()
  }
}
</script>
<style scoped>

.login-wrap{
  height: 100%;
  margin-top: 20%;
}
h3 {
  font-weight: normal;
}
.login-box{
  margin: 20px;
}
.login-box input{
  padding: 5px;
}
.login-box span{
  margin-right: 10px;
}
.login-box p{
  margin: 5px auto;
  color: red;
  font-size: 12px;
}
.login-box button{
  width: 10%;
  padding: 5px;
  margin-top: 10px;
}
</style>
