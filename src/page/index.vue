<template>
  <div>
    <T-header></T-header>
    <div class="main">
      <t-leftside @cal="calculate"></t-leftside>
      <div class="main-right" id="p-list">
        <div class="section1">
          <h3>通过路由实现页面组件更换</h3>
          <p>{{message}}{{$route.params.id}}</p>
          <router-view></router-view>
        </div>
        <div class="btnlist section2">
          <h3>通过子组件emit触发父组件函数更改父组件数据</h3>
          <p>{{count2}}</p>
        </div>
        <div class="btnlist section3">
          <h3>通过在子组件引入store更改父组件数据</h3>
          <p>{{count3}}</p>
        </div>
        <div class="btnlist section4">
          <h3>通过在父组件引入store更改父组件数据</h3>
          <p>通过mapActions的方法触发action改变值:{{text}}</p>
          <p>通过store的方法触发action改变值:{{text2}}</p>
          <p>通过mapGetters改变值：getIncrement的值为{{getIncrement}}</p>
          <p>通过watch监听改变值：{{count1}}</p>
          <button @click="addValue">inc1</button>
          <button @click="subValue">dec1</button>
          <button @click="changeText1">changeText</button>
        </div>
        <div class="btnlist section5">
          <h3>父组件通过props给子组件传递数据来更改子组件数据</h3>
          <button @click="changeData">change</button>
          <T-table3 v-bind="datas"></T-table3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import THeader from '@/components/t-header.vue'
import TLeftside from '@/components/t-leftside.vue'
import TTable3 from '@/components/t-table3.vue'
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      message: '动态路由',
      count1: 0,
      count2: 10,
      msg: '',
      datas: {
        day1: 11,
        day2: 12,
        day3: 13
      }
    }
  },
  created: function () {
    this.count1 = this.getIncrement
  },
  watch: {
    getIncrement (newVal, oldVal) {
      this.count1 = newVal
    },
    getDecrement (newVal, oldVal) {
      this.count1 = newVal
    }
  },
  computed: {
    // mapState，mapGetters中的变量可以作为计算属性直接绑定到 dom 中
    ...mapState({
      text: 'text',
      text2: 'text2',
      count3: 'count3'
    }),
    // mapGetters辅助函数将store中的getter映射到局部计算属性
    // 使用对象展开运算符（...）将getter混入computed对象中
    // 若想将一个getter属性另取名字，需使用对象形式
    // 把 `this.add` 映射为 `this.$store.getters.getIncrement`
    // mapGetters({
    //  add:'getIncrement'
    // })
    ...mapGetters(['getIncrement', 'getDecrement'])
  },
  methods: {
    // 使用 mapMutations 辅助函数将 methods 映射为 store.commit 调用
    // 将 `this.setIncrement()` 映射为 `this.$store.commit('setIncrement')`
    ...mapActions(['setIncrement', 'setDecrement', 'changeText']),
    addValue () {
      this.setIncrement()
    },
    subValue () {
      this.setDecrement()
    },
    changeText1 () {
      this.changeText()
      this.$store.commit('changeText2')
    },
    changeData () {
      this.datas.day1 = this.datas.day1 + 1
      this.datas.day2 = this.datas.day2 + 1
      this.datas.day3 = this.datas.day3 + 1
    },
    calculate (msg) {
      console.log(msg)
      if (msg) {
        this.count2 = this.count2 + 1
      } else {
        this.count2 = this.count2 - 1
      }
      console.log(this.count2)
    }
  },
  components: {
    THeader,
    TLeftside,
    TTable3
  },
  mounted: function () {
    // if (!window.localStorage) {
    //   console.log('浏览器不支持localstorage')
    // } else {
    //   var storage = window.localStorage
    //   this.isLogin = storage.getItem('isLogin')
    //   console.log(storage.getItem('isLogin'))
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height:900px;
  width: 100%;
  padding-top: 100px;
}
.main-right{
  padding: 10px;
  float: left;
  width: 80%;
  overflow: auto;
  height: 100%;
  box-sizing: border-box
}
.section1{
  color: red;
  border: 1px solid red;
  padding: 20px;
}
.btnlist{
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 10px;
}
.section2{
  color:green;
}
.section3{
  color:blue;
}
.section4{
  color:orange;
}
button{
  width: 100px;
  height:40px;
  margin:10px;
}
</style>
