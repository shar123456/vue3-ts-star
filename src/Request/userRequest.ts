import instance from './request'

export function GetUserColumn():any {
    return instance({
        url: '/SysAccount/GetColumnsConfig',
        method: 'get',
        params:{}
    })
}
//http://172.16.170.33:8055/api/SysAccount/api/SysAccount/GetUsers
export function GetUsers(param:any):any {
    
    return instance({
        url: '/SysAccount/GetUsers',
        method: 'get',
        //data:param,
       
    })
}
export function GetUserDatas(param:any):any {
    
    return instance({
        url: '/SysAccount/SearchUsersByQuery',
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

export function UpdateUserDatas(param:any):any {
    
    return instance({
        url: '/SysAccount/UpdateUser_v1',
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



export function AddUserDatas(param:any):any {
    
    return instance({
        url: '/SysAccount/AddUser_v1',
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













export function DeleteUserById(param:any):any {
    
    return instance({
        url: '/SysAccount/DeleteUser',
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


export function BatchDeleteUser(param:any):any {
    
    return instance({
        url: '/SysAccount/BatchDeleteUser',
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






export function GetUserDemo():any {
    return instance({
        url: '/SysAccount/GetUsers',
        method: 'get',
     
    })
}
