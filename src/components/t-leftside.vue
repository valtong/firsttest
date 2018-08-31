<template>
  <div class="leftside">
    <div class="link-list">
      <h3>通过路由实现页面组件更换</h3>
       <!-- 第一种写法 -->
      <router-link :to="{path:'t1'}" class="link">二级路由一</router-link>
      <router-link :to="{path:'t2'}" class="link">二级路由二</router-link>
      <router-link :to="{path:'t3'}" class="link">二级路由三</router-link>
      <router-link :to="{path:'t4'}" class="link">二级路由四</router-link>
      <router-link :to="{path:'t5'}" class="link">二级路由五</router-link>
      <!-- 第二种写法 -->
      <!-- <router-link to="pre" class="link">二级路由一</router-link>
      <router-link to="next" class="link">二级路由二</router-link> -->
    </div>
    <div class="btnlist btnlist1">
      <h3>通过子组件emit触发父组件函数更改父组件数据</h3>
      <button class="left-btn" @click="increment2">inc2</button>
      <button class="left-btn" @click="decrement2">dec2</button>
    </div>
    <div class="btnlist btnlist2">
      <h3>通过在子组件引入store更改父组件数据</h3>
      <button class="left-btn" @click="increment3">inc3</button>
      <button class="left-btn" @click="decrement3">dec3</button>
    </div>
  </div>
</template>

<script>
// import {mapActions} from 'vuex' // 方法二引入
export default {
  data () {
    return {}
  },
  methods: {
    // 利用子组件改变父组件的数据
    // 方法一：emit触发父组件上的方法，true为向父组件传递的数据
    increment2 () {
      // this.data.count += this.data.count
      this.$emit('cal', true)
    },
    decrement2 () {
      // this.data.count -= this.data.count
      this.$emit('cal', false)
    },
    // 方法二：利用vuex的store存储全局变量的特性
    // ...mapActions(['setIncrement3', 'setDecrement3']),
    increment3 () {
      // this.setIncrement3()
      this.$store.commit('setIncrement3')
    },
    decrement3 () {
      // this.setDecrement3()
      this.$store.commit('setDecrement3')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftside{
  float: left;
  width: 20%;
  height:100%;
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px;
  box-sizing: border-box
}
 button{
  width: 60px;
  height:30px;
  margin:10px;
}
.link-list,.btnlist{
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 10px;
}
.link-list{
  color:red;
}
.btnlist1{
  color:green;
}
.btnlist2{
  color:blue;
}
</style>
