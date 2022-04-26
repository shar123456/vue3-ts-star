<template>

 <MenuHeader
   @SearchBtn="SearchBtn"
   
    @refreshBtn="refreshBtn"
   
  >
  </MenuHeader>

<!-- 
  <a-table :columns="columns" :data-source="data"   :customRow="rowActionClick" >
<template #action>
        <a
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 20px;
            font-weight: 800;
          "
          title="删除"
          ><delete-two-tone mark="delete"
        /></a>
      </template>




 <template #name="{ text: menuLevel }">
        <span>
          <a-tag :color="menuLevel === 1 ? 'blue' : 'red'">
            {{ menuLevel }}
          </a-tag>
        </span>
      </template>
 <template #name2="{ text: hasSub }">
        <span>
          <a-tag :color="hasSub ==true ? 'blue' : 'red'">
            {{ hasSub }}
          </a-tag>
        </span>
      </template>
    </a-table> -->






  <div id="DataList">
    <a-table
      bordered
      :rowClassName="(index:number) => (index % 2 == 1 ? 'table-striped' : null)"
      id="yy"
      :loading="loading"
      :columns="ListGridColumns"
      :data-source="DataList"
      :scroll="{ x: 1000, y: 'calc(100vh - 310px)' }"
      :customRow="rowActionClick"
      
      :pagination="false"
    >
      <template #action>
        <a
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 20px;
            font-weight: 800;
          "
          title="删除"
          ><delete-two-tone mark="delete"
        /></a>
      </template>

      <template #loginType="{ text: loginType }">
        <span>
          <a-tag :color="loginType === '微信小程序' ? 'blue' : 'red'">
            {{ loginType }}
          </a-tag>
        </span>
      </template>
    </a-table>

    <div class="userPagination">
      <a-pagination
        show-size-changer
        show-quick-jumper
        v-model:current="current1"
        v-model:pageSize="pageSize"
        :total="totalCount"
        :show-total="(totalCount:number) => `共计 ${totalCount} 条记录`"
        @showSizeChange="onShowSizeChange"
        :page-size-options="pageSizeOptions"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
  </div>




















</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  watch,
  createVNode,
} from "vue";

import MenuHeader from "../../components/MenuHeader.vue";
import { deepClone } from "../../utility/commonFunc";

import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
  FormOutlined,
  CopyFilled,
  EditFilled,
  HighlightFilled,
  CopyOutlined,
  SettingOutlined,
  SettingFilled,
} from "@ant-design/icons-vue";
import {
  MenuDataEntity,IMenuInfo
} from "../../TypeInterface/IMenuInterface";

import {
  GetMenuColumn,
  GetMenuDatas,
  DeleteMenuById,

} from "../../Request/menuRequest";


const columns = [
  { title: '菜单Id', dataIndex: 'menuId',width:300, key: 'name' },
  { title: '名称', name:"menuTitle", dataIndex: 'menuTitle', key: 'platform', },
  { title: 'Url', dataIndex: 'menuUrl', key: 'version' },
  { title: '序号', dataIndex: 'menuorder', key: 'upgradeNum' },
  { title: '等级', dataIndex: 'menuLevel', key: 'creator', slots: { customRender: 'name' } },
  { title: 'Icon', dataIndex: 'menuIcon', key: 'createdAt' },
    { title: '是否有子菜单', dataIndex: 'hasSub', key: 'createdAt1',slots: { customRender: 'name2' } },
      { title: '菜单父级Id', dataIndex: 'menuParentId', key: 'createdAt2' },
  { title: '操作', key: 'operation', slots: { customRender: 'action' } },
];







const data: IMenuInfo[] = [
  {
    key: 1,
    menuId: '0001',
    menuTitle: '系统设置',
    menuUrl: '10.3.4.5654',
    menuorder: 1,
    menuLevel: 1,
    hasSub: true,
    menuIcon:"menuIcon",
    menuParentId: '0',
    children: [
      {
        key: 11,
    menuId: '2',
    menuTitle: '用户列表',
    menuUrl: '10.3.4.5654',
    menuorder: 1,
    menuLevel: 2,
    hasSub: false,
    menuIcon:"menuIcon",
    menuParentId: '0001',
      },
     {
        key: 12,
    menuId: '3',
    menuTitle: '登录记录',
    menuUrl: '10.3.4.5654',
    menuorder: 2,
    menuLevel: 2,
    hasSub: false,
    menuIcon:"menuIcon",
    menuParentId: '0001',
      },
       {
        key: 13,
    menuId: '4',
    menuTitle: '菜单列表',
    menuUrl: '10.3.4.5654',
    menuorder: 2,
    menuLevel: 2,
    hasSub: false,
    menuIcon:"menuIcon",
    menuParentId: '0001',
      },
    ],
  },
 
];


export default defineComponent({
    components: {
    MenuHeader,
    DeleteTwoTone,
   
  },
  setup() {
 const DataEntityState = reactive(new MenuDataEntity());

 
/***分页****************/
    const pageSize = ref(10);
    const current1 = ref(1);
    const totalCount = ref(0);
    let refreshMark = ref<string>("");
    const pageSizeOptions = ref<string[]>(["5", "10", "20", "30", "40", "50"]);
    let loading = ref<boolean>(false);
    const onShowSizeChange = (current: number, pageSize: number) => {
      loading.value = true;
      GetMenuDatas({
        current: current,
        pageSize: pageSize,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        console.log(res);
        loading.value = false;
        if (res.isSuccess) {
          DataEntityState.DataList = res.datas;
        }
      });
    };
    watch(pageSize, () => {
      //console.log("pageSize", pageSize.value);
    });
    watch(current1, () => {
      loading.value = true;
      GetMenuDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        //console.log(res);
        loading.value = false;
        if (res.isSuccess) {
          DataEntityState.DataList = res.datas;
        }
      });
    });
    watch(refreshMark, () => {
      loading.value = true;
      GetMenuDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        loading.value = false;
        if (res.isSuccess) {
          console.log(res.datas);
          DataEntityState.DataList = res.datas;
       
          totalCount.value = res.totalCount;
        }
      });
    });

    /***分页****************/

/***数据初始化****************/
    onMounted(async () => {
      //获取表格列及处理表格列
      let columnList = await GetMenuColumn({ pageName: "LoginRecord" });
columnList=columns

      DataEntityState.ListColumns = deepClone(columnList);

      var len = columnList.length - 1;
      //start from the top
      for (var j = len; j >= 0; j--) {
        console.log(j + "=" + columnList[j]);
        if (columnList[j]["isUse"] == false) {
          columnList.splice(j, 1);
        }
      }

      DataEntityState.ListGridColumns = columnList;

      for (var i in DataEntityState.ListGridColumns) {
        if (DataEntityState.ListGridColumns[i]["slots"] == null) {
          delete DataEntityState.ListGridColumns[i]["slots"];
        }
      }

      for (var z in DataEntityState.ListColumns) {
        if (DataEntityState.ListColumns[z]["slots"] == null) {
          delete DataEntityState.ListColumns[z]["slots"];
        }
      }

      //获用户数据
      loading.value = true;
      let UserDatasList = await GetMenuDatas({
        current: 1,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      });
      loading.value = false;

      console.log("amount", UserDatasList);
      if (UserDatasList.isSuccess) {
        //DataEntityState.DataList = UserDatasList.datas;
           DataEntityState.DataList=data;
        
        totalCount.value = UserDatasList.totalCount;
        current1.value = 1;
      }
    });
    /***数据初始化****************/


/***rowActionClick****************/
    const rowActionClick = (record: any) => {
      return {
        onClick: (event: any) => {
          console.log(
            event.target.parentNode.parentNode.getAttribute("aria-label")
          );
          console.log(event.target.parentNode.getAttribute("data-icon"));
          console.log("id", record);

          if (
            event.target.parentNode.getAttribute("data-icon") == "copy" ||
            event.target.parentNode.parentNode.getAttribute("aria-label") ==
              "copy"
          ) {
            const Id = record.sysUserId;
          }

          if (
            event.target.parentNode.getAttribute("data-icon") == "edit" ||
            event.target.parentNode.parentNode.getAttribute("aria-label") ==
              "edit"
          ) {
            const Id = record.sysUserId;
          }
          if (
            event.target.parentNode.getAttribute("data-icon") == "delete" ||
            event.target.parentNode.parentNode.getAttribute("aria-label") ==
              "delete"
          ) {
            const Id = record.loginRecordId;

          
          }
        },
      };
    };
    /***rowActionClick****************/



  const SearchBtn = async (payload: any) => {
      loading.value = true;

      let UserDatasList1 = await GetMenuDatas({
        current: 1,
        pageSize: pageSize.value,
        ...payload,
      });
      //console.log("UserDatasList1",UserDatasList1)
      loading.value = false;
      if (UserDatasList1.isSuccess) {
        DataEntityState.DataList = UserDatasList1.datas;
        totalCount.value = UserDatasList1.totalCount;
        current1.value = 1;
      }
      DataEntityState.QueryConditionInfo = payload;
    };

    const UpdateConfigGrid = async () => {
      //获取表格列及处理表格列
      let columnList = await GetMenuColumn({ pageName: "Menu" });
    
      DataEntityState.ListColumns = deepClone(columnList);

      var len = columnList.length - 1;
      //start from the top
      for (var j = len; j >= 0; j--) {
        console.log(j + "=" + columnList[j]);
        if (columnList[j]["isUse"] == false) {
          columnList.splice(j, 1);
        }
      }

      DataEntityState.ListGridColumns = columnList;

      for (var i in DataEntityState.ListGridColumns) {
        if (DataEntityState.ListGridColumns[i]["slots"] == null) {
          delete DataEntityState.ListGridColumns[i]["slots"];
        }
      }

      for (var z in DataEntityState.ListColumns) {
        if (DataEntityState.ListColumns[z]["slots"] == null) {
          delete DataEntityState.ListColumns[z]["slots"];
        }
      }
    };

    const refreshBtn = async (payload: any) => {
     UpdateConfigGrid();

      loading.value = true;
      DataEntityState.QueryConditionInfo = {
        menuTitle: "",
     
      };
      GetMenuDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        loading.value = false;
        if (res.isSuccess) {
          console.log(res.datas);
          DataEntityState.DataList = res.datas;
          totalCount.value = res.totalCount;
        }
      });
    };



    return {
        ...toRefs(DataEntityState),
      DataEntityState,
 pageSize,
      current1,
      totalCount,
      onShowSizeChange,
      loading,
      pageSizeOptions,


SearchBtn,
     
     
      refreshBtn,



      data,
      columns,
      rowActionClick,
    };
  },
});
</script>


<style >
#DataList {
  height: calc(100vh - 245px);
  border: 0px solid red;
  box-sizing: border-box;
}
.userPagination {
  border: 0px solid red;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}

#DataList .ant-table-thead > tr > th,
#DataList .ant-table-tbody > tr > td {
  padding: 9px 9px;
}
.table-striped td {
}
.TableMyHeaderRow {
  background-color: red;
}

.ant-table-tbody .ant-table-row:nth-child(odd) {
  /* background-color: red;; */
}
.ant-table-tbody .ant-table-row:nth-child(even) {
  background-color: #fafafa;
}

.ant-table-thead > tr > th {
  padding-left: px;
  font-size: 14px;
  color: black;
  background: rgba(143, 178, 207, 0.405) !important;
}
</style>