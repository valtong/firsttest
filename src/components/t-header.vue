<template>
  <div class="nav">
    <div class="link-list">
      <router-link to="/index/first" class="link">动态路由一</router-link>
      <router-link to="/index/second" class="link">动态路由二</router-link>
    </div>
    <div id="myInfo">
      <router-link :to="{path:'/login'}" class="link" v-show="isLogin === 'false'">登录</router-link>
      <div v-show="isLogin ==='true'"  @mouseover="dropdownDisplay($event)" @mouseout="dropdownDisplay($event)">
        <a><img src="../assets/user.png"></a>
        <span>绿萝</span>
        <div id="dropdownmenu" :class="{'display-none':isDisplay}">
          <ul>
            <li><router-link to="">个人中心</router-link></li>
            <li @click="logout">退出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: 'false',
      isDisplay: true // 控制下拉菜单显示与否，true不显示，false显示
    }
  },
  mounted: function () {
    if (!window.localStorage) {
      console.log('浏览器不支持localstorage')
    } else {
      var storage = window.localStorage
      this.isLogin = storage.getItem('isLogin')
    }
  },
  methods: {
    // 传入事件需用 $event（为什么event不行?）
    dropdownDisplay ($event) {
      switch ($event.type) {
        // 移入显示，移出不显示
        case 'mouseover':
          this.isDisplay = false
          break
        case 'mouseout':
          this.isDisplay = true
          break
      }
    },
    logout () {
      console.log(2222)
      if (!window.localStorage) {
        console.log('浏览器不支持localstorage')
      } else {
        console.log(11)
        var storage = window.localStorage
        storage.setItem('isLogin', false)
        this.isLogin = storage.getItem('isLogin')
        console.log(this.isLogin) // 'false'
        console.log(this.isLogin === 'false') // true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  text-decoration: none;
  color: black;
}
a:hover{
  color: red;
}
.nav{
  position: fixed;
  top: 0;
  left: 0;
  height:100px;
  width: 100%;
  line-height:100px;
  background-color: #ccc;
}
.link-list {
  padding: 0;
  margin: 0;
  display: inline-block;
}
.link {
  display: inline-block;
  margin: 0 10px;
}
#myInfo{
  display: inline-block;
  position: absolute;
  right: 5%;
}
#myInfo img{
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
#dropdownmenu{
  position: absolute;
  left: -45px;
  top: 65%;
  /* border: 1px solid #ccc; */
}
#dropdownmenu li{
  line-height: normal;
  list-style: none;
}
.display-none{
  display: none;
}
</style>
