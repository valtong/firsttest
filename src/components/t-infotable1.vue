<template>
  <div class="table table1">
    <button @click="getDatatenth">通过axios获取信息</button>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>籍贯</th>
          <th>性别</th>
          <th>爱好</th>
        </tr>
      </thead>
      <tbody v-for="(info,index) in infos" v-bind:key="index">
        <tr>
          <td>{{info.name}}</td>
          <td>{{info.nativePlace}}</td>
          <td>{{info.sex}}</td>
          <td>{{info.hobby}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getData} from '../utils/servers/api' // 引进api.js，要用的接口放进{}中
export default {
  data () {
    return {
      infos: []
    }
  },
  methods: {
    // axios未封装
    // getData1 () {
    //   this.$http.get('/api/testVue').then((res) => {
    //     this.fetchData(res)
    //     console.log(res)
    //     console.log(this.infos)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    //   getData().then(res => {
    //     console.log(res, '请求成功')
    //     this.fetchData(res)
    //   }).catch(err => {
    //     console.log(err, '请求失败')
    //   })
    // },
    fetchData (res) {
      this.infos = res.data.data.info
    },
    getDataByone (id) {
      return new Promise((resolve, reject) => {
        getData(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          console.log(err, '请求失败')
        })
      })
    },
    async getAllData (testArr) {
      let res = await Promise.all(
        testArr.map(em => this.getDataByone(em))
      ).then(res => {
        this.infos = res[0].data.info
      })
      return res
    },
    getDatatenth () {
      let arr = ['1', '2']
      this.getAllData(arr)
    }
  }
  // 封装axios的用法
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
