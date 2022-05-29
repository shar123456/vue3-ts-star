interface IWorkScheduleInfo {
    id: string;
    workScheduleNo: string;
    workScheduleName: string;
    workScheduleType: string;
    workScheduleStatus: string;
    initiator: string;
    workScheduleDesc:string;
    startTimeStr:string;
    
    remarkDesc:string;
    useStatus:string;
    createTimeStr: string;
    key: string;
  }

  interface IWorkScheduleQueryInfo {
    workScheduleNo: string;
    workScheduleName: string;
    workScheduleType: string;
    workScheduleStatus: string;
    useStatus:string;
}

const WorkScheduleColumns = [
  {  oldTitle: '类型',title: '类型',width:50, dataIndex: 'workScheduleType', isUse: true,configOrder: 1 }, 
    { oldTitle: '计划编号', title: '计划编号',width:90, dataIndex: 'workScheduleNo', isUse: true,configOrder: 2  },
    {  oldTitle: '标题',title: '标题',width:180, dataIndex: 'workScheduleName', isUse: true,configOrder: 3 },
   
   
    {  oldTitle: '计划状态',title: '计划状态',width:70, dataIndex: 'workScheduleStatus', isUse: true,configOrder: 4 },
    {  oldTitle: '发布人',title: '发布人',width:70, dataIndex: 'initiator', isUse: true,configOrder: 5},
    {  oldTitle: '状态',title: '状态',width:50, dataIndex: 'useStatus', slots: { customRender: 'useStatus' },isUse: true,configOrder: 6 },
    {  oldTitle: '工作内容',title: '工作内容',width:100, dataIndex: 'workScheduleDesc', isUse: false,configOrder: 7 },
    {  oldTitle: '备注',title: '备注',width:150, dataIndex: 'remarkDesc', isUse: false,configOrder: 8 },
    {  oldTitle: '开始时间',title: '开始时间',width:150, dataIndex: 'startTimeStr', isUse: true,configOrder: 9 },
    {  oldTitle: '创建时间',title: '创建时间',width:150, dataIndex: 'createTimeStr', isUse: true,configOrder: 10 },
    {  oldTitle: '操作',title: '操作',dataIndex: 'workScheduleNo', key: 'operation',width:160, slots: { customRender: 'action' } ,isUse: true,configOrder: 11 },
  ];
  
const WorkScheduleDatas=[
    {
        id:"WS2205280001",
        workScheduleNo: "WS2205280001",
      workScheduleName: "高层领导视频会议",
      workScheduleType: "公事",
      workScheduleStatus: "已取消",
   
      initiator: "admin",
      workScheduleDesc: "需要准备投标相关资料，并预定机票",
      remarkDesc: "准时参加，提前入场",
 
      startTimeStr:"2022-06-23",
      useStatus:"启用",
      createTimeStr:"2022-05-28",
      key: "0001",
    }]







    class WorkScheduleEntity{
        QueryConditionInfo:any={
            workScheduleNo: "",
            workScheduleName: "",
            workScheduleType: "未选择",
            useStatus:"未选择",
            workScheduleStatus: "未选择",
        
          }
          QueryConditionInfoConfig:any={
            workScheduleNo:{
              name:"计划编号",
              type:"text"
            },
            workScheduleName:{
              name:"标题",
              type:"text"
            },
            workScheduleType:{
              name:"类型",
              type:"select",
              optionValueArray:["未选择","公事","私事"]
            },
            useStatus:{
              name:"状态",
              type:"select",
              optionValueArray:["未选择","启用","禁用"]
            },
            workScheduleStatus:{
              name:"计划状态",
              type:"select",
              optionValueArray:["未选择","未开始","已取消","已完成","已过期","已开始"]
            }
          }




        DataList:Array<IWorkScheduleInfo>=[];
        
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
        selectedRows:IWorkScheduleInfo[]= [];
        WorkScheduleDatas:any=WorkScheduleDatas;
      }
      export {IWorkScheduleInfo,WorkScheduleColumns,WorkScheduleEntity,
    }