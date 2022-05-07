interface IDataItem {
    key: string;
    name: string;
    age: number;
    address: string;
  }
   interface IUserInfo {
    name: string;
   sysUserId: string;
    pwd: string;
    key: string;

    userDesc: string;
    phone: string;
    address: string;
    useStatus: string;
    email: string;
    level: string;
    createTimeStr: string;
   gender: string;
   pcLoginStatus: string;
   weChatLoginStatus: string;
   appLoginStatus: string;


  


  }
    interface IUserQueryInfo {
   
      sysUserId: string;
      name: string; 
      gender: string;
      useStatus: string;
      address: string;
      phone: string;
      email: string;
      level: string;
  
    
  }

  class UserDataEntity{
    
    QueryConditionInfo:IUserQueryInfo={
      sysUserId: "",
      name: "",
      gender: "未选择",
      useStatus:"未选择",
      address: "",
      phone: "",
      email: "",
      level: "未选择",
    

    }
    
    UserDataList:Array<IUserInfo>=[];
    
    EditData:IUserInfo={
        key: "",
        name: "",
        sysUserId: "",
        pwd: "",
    
    
        userDesc: "",
        phone: "",
        address:"",
        useStatus:"",
        email: "",
        level:"",
        createTimeStr: "",
        gender:"",
        pcLoginStatus: "",
        weChatLoginStatus: "",
        appLoginStatus: "",
  }
    UserListColumns:any=[];
    selectedRowKeys:string[]= [];
    selectedRows:IUserInfo[]= [];
  }
export {UserDataEntity,IUserInfo}
