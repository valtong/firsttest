import axios from 'axios'

export default function service (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-token': 'statictoken'
      },
      timeout: 60 * 1000, // 影响请求成功与否
      validateStatus: function (status) {
        return status >= 200 && status < 400
      }
    })
    instance(options).then(response => {
      resolve(response) // 把请求到的数据发到引用请求的地方
    }).catch(error => {
      console.log('请求异常信息：' + error)
      reject(error)
    })
  })
}
