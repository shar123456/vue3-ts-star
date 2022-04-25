
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
      loginStartTime:dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),-10),
      loginEndTime:dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
    }
    
    DataList:Array<ILoginRecordInfo>=[];
    
    ListColumns:any=[];
    ListGridColumns:any=[];
    selectedRowKeys:string[]= [];
    selectedRows:ILoginRecordInfo[]= [];
  }
export {LoginRecordDataEntity,ILoginRecordInfo}



