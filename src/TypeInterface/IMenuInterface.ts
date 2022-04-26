interface  IMenuInfo {
    key: number;
    menuId: string;
    menuTitle: string;
    menuUrl: string;
    menuorder: number;
    menuLevel: number;
    hasSub: boolean;
      menuParentId: string;
      menuIcon:string;
      children?: IMenuInfo[];
  }
  interface IMenuQueryInfo {
   
    menuTitle:string; 
 
}
class MenuDataEntity{
    
    QueryConditionInfo:IMenuQueryInfo={
    
        menuTitle: "",
    
    }
    
    DataList:Array<IMenuInfo>=[];
    
    ListColumns:any=[];
    ListGridColumns:any=[];
    selectedRowKeys:string[]= [];
    selectedRows:IMenuInfo[]= [];
  }
export {MenuDataEntity,IMenuQueryInfo,IMenuInfo}

