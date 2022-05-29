
  interface IExaminationTaskInfo {
    examId: string;
    examNo: string;
    examName: string;
    examType: string;
    examStatus: string;
    emergencyLevel: string;
    stratTimeStr: string;
    endTimeStr: string;
    flowNo: string;
    initiator: string;
    noticeType:string;
     fileIds:string []
     taskDesc:string;
     remarkDesc:string;
    
    useStatus:string;
    createTimeStr: string;
    key: string;
  }

  interface IExaminationTaskQueryInfo {
   
    examNo:string; 
    examName: string ;
    useStatus: string ;
    noticeType:string;
    examStatus: string;
    emergencyLevel: string;
    flowNo: string;
    initiator: string;
}

const ExaminationTaskColumns = [
  { oldTitle: '审批编号', title: '审批编号',width:120, dataIndex: 'examNo', isUse: true,configOrder: 1  },
  {  oldTitle: '审批标题',title: '审批标题',width:180, dataIndex: 'examName', isUse: true,configOrder: 2 },
  {  oldTitle: '审批类型',title: '审批类型',width:100, dataIndex: 'examType', isUse: true,configOrder: 3 },
  {  oldTitle: '紧急程度',title: '紧急程度',width:100, dataIndex: 'emergencyLevel', isUse: true,configOrder: 4 },
  {  oldTitle: '审批状态',title: '审批状态',width:100, dataIndex: 'examStatus', isUse: true,configOrder: 4 },
  {  oldTitle: '状态',title: '状态',width:80, dataIndex: 'useStatus', slots: { customRender: 'useStatus' },isUse: true,configOrder: 5 },
  {  oldTitle: '流程编号',title: '流程编号',width:120, dataIndex: 'flowNo', isUse: true,configOrder: 6 },
  {  oldTitle: '发起人',title: '发起人',width:100, dataIndex: 'initiator', isUse: true,configOrder: 7},
  {  oldTitle: '通知类型',title: '通知类型',width:100, dataIndex: 'noticeType', isUse: true,configOrder: 8 },
  {  oldTitle: '创建时间',title: '创建时间',width:150, dataIndex: 'createTimeStr', isUse: true,configOrder: 9 },
  {  oldTitle: '开始时间',title: '开始时间',width:150, dataIndex: 'stratTimeStr', isUse: true,configOrder: 10 },
  {  oldTitle: '结束时间',title: '结束时间',width:150, dataIndex: 'endTimeStr', isUse: true,configOrder: 11 },
  {  oldTitle: '操作',title: '操作',dataIndex: 'examNo', key: 'operation',width:60, slots: { customRender: 'action' } ,isUse: true,configOrder: 12 },
];



const ExaminationTaskDatas=[
  {
    examId:"SP2205280001",
    examNo: "SP2205280001",
    examName: "系统用户登录权限审批",
    examType: "权限",
    examStatus: "进行中",
    emergencyLevel: "中",
    flowNo: "LC2205283369",
    initiator: "admin",
    noticeType: "邮件",
    stratTimeStr: "2022-05-28",
    endTimeStr: "2022-05-29",






    useStatus:"启用",
    createTimeStr:"2022-05-28",
    key: "0001",
  },
  {
    examId:"SP2205280002",
    examNo: "SP2205280002",
    examName: "Queen用户微信登录授权",
    examType: "权限",
    examStatus: "已取消",
    emergencyLevel: "中",
    flowNo: "LC2205283388",
    initiator: "Queen",
    noticeType: "公众号推送",
    stratTimeStr: "2022-05-28",
    endTimeStr: "2022-05-31",






    useStatus:"草稿",
    createTimeStr:"2022-05-28",
    key: "0002",
  },
    ]



class ExaminationTaskEntity{
  QueryConditionInfo:IExaminationTaskQueryInfo={
    examNo: "",
    examName: "",
      useStatus: "未选择",

      noticeType: "未选择",
      examStatus: "未选择",
      emergencyLevel: "未选择",
      flowNo: "",
      initiator: "",



    }
 
  DataList:Array<IExaminationTaskInfo>=[];
  
  ListColumns:any=[];
  ListGridColumns:any=[];
  selectedRowKeys:string[]= [];
  selectedRows:IExaminationTaskInfo[]= [];
  ExaminationTaskDatas:any=ExaminationTaskDatas;
}






interface IExaminationFlowInfo {
  flowId: string;
  flowNo: string;
  flowName: string;
  useStatus:string;
  createTimeStr: string;
  key: string;
}


  interface IExaminationFlowQueryInfo {
   
    flowName:string; 
    flowNo: string ;
    useStatus: string ;
}



  const ExaminationFlowColumns = [
    { oldTitle: '流程编号', title: '流程编号',width:100, dataIndex: 'flowNo', isUse: true,configOrder: 1  },
    {  oldTitle: '流程名称',title: '流程名称',width:100, dataIndex: 'flowName', isUse: true,configOrder: 2 },
    {  oldTitle: '状态',title: '状态',width:80, dataIndex: 'useStatus', slots: { customRender: 'useStatus' },isUse: true,configOrder: 3 },
    {  oldTitle: '创建时间',title: '创建时间',width:100, dataIndex: 'createTimeStr', isUse: true,configOrder: 4 },
    
    {  oldTitle: '操作',title: '操作',dataIndex: 'flowId', key: 'operation',width:60, slots: { customRender: 'action' } ,isUse: true,configOrder: 5 },
  ];
  const ExaminationFlowDatas=[
{
  flowId:"0001",
  flowNo: "LC2205283388",
  flowName: "用户权限审批流程",
  useStatus:"启用",
  createTimeStr:"2022-05-28",
  key: "0001",
},{
  flowId:"0002",
  flowNo: "LC2205283399",
  flowName: "请假审批流程",
  useStatus:"禁用",
  createTimeStr:"2022-05-29",
  key: "0002",
}

  ]
  class ExaminationFlowEntity{
    QueryConditionInfo:IExaminationFlowQueryInfo={
        flowNo: "",
        flowName: "",
        useStatus: "未选择",
      }
   
    DataList:Array<IExaminationFlowInfo>=[];
    
    ListColumns:any=[];
    ListGridColumns:any=[];
    selectedRowKeys:string[]= [];
    selectedRows:IExaminationFlowInfo[]= [];
    ExaminationFlowDatas:any=ExaminationFlowDatas;
  }



  export {IExaminationFlowInfo,ExaminationFlowColumns,ExaminationFlowEntity,
    IExaminationTaskInfo,ExaminationTaskColumns,ExaminationTaskEntity}