import instance from './request'


export function GetMenuDatas(param:any):any {
    
  return instance({
      url: '/LoginRecord/SearchLoginRecordByQuery',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}
export function DeleteMenuById(param:any):any {
    
  return instance({
      url: '/LoginRecord/DeleteLoginRecord',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}
export function GetMenuColumn(param:any):any {
  return instance({
      url: '/LoginRecord/GetColumnsConfig',
      method: 'get',
      params:param
  })
}




