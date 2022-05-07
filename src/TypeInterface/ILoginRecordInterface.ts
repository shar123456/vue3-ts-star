
import {dateFormat} from '../utility/commonFunc'

interface ILoginRecordInfo {
    loginRecordId: string;
    name: string;
    loginType:string;
    loginNum:number;
    loginLastTimeStr: string;
    loginEndTimeStr: string;
    key: string;
  }
  interface ILoginRecordQueryInfo {
   
    name:string; 
    loginStartTime: string ;
    loginEndTime: string ;
}


class LoginRecordDataEntity{
    
    QueryConditionInfo:ILoginRecordQueryInfo={
    
      name: "",
      loginStartTime:dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),-11),
      loginEndTime:dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
    }
    
    DataList:Array<ILoginRecordInfo>=[];
    
    ListColumns:any=[];
    ListGridColumns:any=[];
    selectedRowKeys:string[]= [];
    selectedRows:ILoginRecordInfo[]= [];
  }



  const LoginRecordColumns = [
    { title: '用户名',width:100, dataIndex: 'name', isUse: true,configOrder: 1 },
    { title: '终端设备类型',width:100, dataIndex: 'loginType', isUse: true,configOrder: 2 ,slots: { customRender: 'loginType' }},
    { title: '登录次数',width:100, dataIndex: 'loginNum', isUse: true,configOrder: 3 },
    { title: '上次登录时间',width:100, dataIndex: 'loginLastTimeStr', isUse: true,configOrder: 4 },
    { title: '最后一次登录时间',width:100, dataIndex: 'loginEndTimeStr', isUse: true,configOrder: 5 },
    
    { title: '操作', key: 'operation',width:60, slots: { customRender: 'action' },isUse: true,configOrder: 6  },
  ];
  


export {LoginRecordDataEntity,ILoginRecordInfo,LoginRecordColumns}



