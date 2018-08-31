<template>
  <div class="table">
    <p>存储并获取localstorage中的信息</p>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{formData.name}}</td>
          <td>{{formData.sex}}</td>
        </tr>
      </tbody>
    </table>
    <button @click="getData">获取数据</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['getInfo'])
  },
  methods: {
    ...mapActions(['setInfo']),
    getData () {
      // 1.直接从localStorage获取数据
      // if (!window.localStorage) {
      //   console.log('浏览器不支持localstorage')
      // } else {
      //   var storage = window.localStorage
      //   this.formData = JSON.parse(storage.getItem('info')) // 取出对象的时候用JSON.parse()转化为对象
      //   console.log('取数据' + this.formData)
      // }

      // 2.通过store从localStorage获取数据
      this.setInfo()
      this.formData = this.getInfo
      console.log(this.getInfo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
  width: 120px;
  height:40px;
  margin:10px;
}
table{
  border: 1px solid #ccc;
  border-collapse: collapse;
  color: #000;
}
tbody{
  text-align: center;
}
th,td{
  width: 100px;
  height: 40px;
  border: 1px solid #ccc;
}
</style>
