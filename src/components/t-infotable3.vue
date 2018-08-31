<template>
  <div class="table">
    <button @click="getData2">通过原生ajax同步获取信息1</button>
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
// import axios from 'axios'
export default {
  data () {
    return {
      infos: []
    }
  },
  methods: {
    myHttp () {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        return new ActiveXObject('Microsoft.XMLHTTP') /* global ActiveXObject */
      }
    },
    getData2 () {
      var that = this
      var request = this.myHttp()
      request.open('get', 'api/testVue', false)
      request.send()
      if (request.status === 200) {
        console.log(request.responseText)
        var json = JSON.parse(request.responseText)
        console.log(json.data.info)
        that.infos = json.data.info
        console.log(that.infos)
      } else {
        console.log(request.status, request.statusText, '111')
      }
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
