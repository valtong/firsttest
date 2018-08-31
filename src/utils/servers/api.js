import service from './service.js'
export function getData (id) { // getData为接口名字，（）可传入参数
  return service({
    url: '/api/testVue',
    method: 'get',
    params: {
      'id': id
    }
  })
}
