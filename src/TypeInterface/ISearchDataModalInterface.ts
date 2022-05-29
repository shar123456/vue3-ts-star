const SearchUserColumns = [
    {title: '名字',width:100, dataIndex: 'name',},
 
    { title: '性别',width:100, dataIndex: 'gender', },
    { title: '手机号',width:100, dataIndex: 'phone',  },
  
    { title: '操作', dataIndex: 'sysUserId', key: 'operation',width:60, slots: { customRender: 'action' } },
  ];
  export {SearchUserColumns}