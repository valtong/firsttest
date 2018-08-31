<template>
  <div class="table">
    <p>存储并获取localstorage中的信息</p>
    <form id="user-info">
      <input type="text" name="name" value="" v-model="info.name">
      <input type="text" name="age" value="" v-model="info.sex">
      <input type="submit" value="submit form" @click="postData">
      <button @click="saveData">存数据</button>
    </form>
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
export default {
  data () {
    return {
      info: {},
      formData: {}
    }
  },
  methods: {
    // 创建XMLHttpRequest对象
    myHttp () {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        return new ActiveXObject('Microsoft.XMLHTTP') /* global ActiveXObject */
      }
    },
    // 保存数据到localstorage
    saveData () {
      if (!window.localStorage) {
        console.log('浏览器不支持localstorage')
      } else {
        var storage = window.localStorage
        storage.setItem('info', JSON.stringify(this.info)) // localstorage只能存储字符串，如果存储对象，需先用JSON.stringify()转化为字符串
        console.log('存数据')
      }
    },
    // 从localstorage取出数据（取出的也是字符串！！！）
    getData () {
      if (!window.localStorage) {
        console.log('浏览器不支持localstorage')
      } else {
        var storage = window.localStorage
        this.formData = JSON.parse(storage.getItem('info')) // 取出对象的时候用JSON.parse()转化为对象
        console.log('取数据' + this.formData)
      }
    },
    // 原生ajax发送post请求
    postData () {
      var request = this.myHttp()
      var that = this
      request.open('post', 'api/testVue2')
      request.send(JSON.stringify(this.info))
      request.onreadystatechange = display
      function display () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            that.saveData()
            console.log('成功了' + request.responseText)
          } else {
            console.log('失败了' + request.status)
          }
        }
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
