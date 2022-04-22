<template>
  <UserListQueryHeader
    @SearchBtn="SearchBtn"
    @showCreateModal="showCreateModal"
    :UserData="UserDataEntityState"
    @batchDelete="batchDelete"
    @refreshBtn="refreshBtn"
  ></UserListQueryHeader>

  <div id="userList">
    <a-table
      bordered
      :rowClassName="(index:number) => (index % 2 == 1 ? 'table-striped' : null)"
      id="yy"
      :loading="loading"
      :columns="UserListColumns"
      :data-source="UserDataList"
      :scroll="{ x: 1000, y: 'calc(100vh - 310px)' }"
      :customRow="rowActionClick"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :pagination="false"
    >
      <template #action>
        <a
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 20px;
            font-weight: 800;
          "
           title="编辑"
          ><EditFilled mark="edit"
        /></a>
        <!-- <edit-two-tone
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 18px;
            font-weight: 800;
            cursor:pointer
          "
          mark="edit"
        /> -->
        <delete-two-tone
          style="
            color: red;
            font-size: 20px;
            font-weight: 800;
            margin-left: 9px;
            cursor: pointer;
          "
        />
        <!-- <a-popconfirm
          placement="leftTop"
          title="确要删除此项？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm"
          @cancel="cancel"
        >
          <a
            style="
              color: rgba(255, 81, 0, 0.733);
              font-size: 16px;
              font-weight: 800;
              margin-left: 9px;
            "
            href="#"
            >删除</a
          >
         <delete-two-tone
            style="
              color: rgba(255, 81, 0, 0.733);
              font-size: 16px;
              font-weight: 800;
              margin-left: 9px;
            "
          />
        </a-popconfirm> -->




  <a
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 20px;
            font-weight: 800; margin-left: 9px;
          "
           title="复制"
          ><CopyFilled mark="copy"
        /></a>

 <a
          style="
            color: rgba(18, 96, 214, 0.733);
            font-size: 20px;
            font-weight: 800; margin-left: 9px;
          "
          title="设置"
          
          ><SettingFilled mark="set"
        /></a>



      </template>

      <template #useStatus="{ text: useStatus }">
        <span>
          <a-tag :color="useStatus === '启用' ? 'blue' : 'red'">
            {{ useStatus }}
          </a-tag>
        </span>
      </template>

      <!-- <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.desc }}
      </p>
    </template> -->
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
      <span >{{ props.value }}条/页</span>
    
    </template>
      </a-pagination>
    </div>
  </div>

  <UserListModal
    :visiblea="visible"
    :modalTitles="modalTitle"
    :UserData="UserDataEntityState"
    @closeMoadl="closeMoadl"
    @UpdateInfoBtn="UpdateInfoBtn"
    @CreateInfoBtn="CreateInfoBtn"
  />
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
import {
  GetUserColumn,
  GetUserDatas,
  DeleteUserById,
  BatchDeleteUser,UpdateUserDatas,AddUserDatas,CopyUserDataById
} from "../../Request/userRequest";
import { message, Modal } from "ant-design-vue";
import UserListQueryHeader from "../../components/UserListQueryHeader.vue";
import UserListModal from "../../components/UserListModal.vue";
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
  FormOutlined,
  CopyFilled,
  EditFilled,
  HighlightFilled,CopyOutlined,SettingOutlined,SettingFilled
} from "@ant-design/icons-vue";
// import FileSaver from "file-saver";
/*eslint-disabled*/
// import * as XLSX from "xlsx";
//import { UserDataEntity, IUserInfo } from "../../TypeInterface/userInterface";
import { UserDataEntity, IUserInfo } from "../../TypeInterface/IUserInterface";

export default defineComponent({
  components: {
    // SearchOutlined,
    UserListQueryHeader,
    UserListModal,
    EditTwoTone,
    DeleteTwoTone,
    FormOutlined,
    CopyFilled,
    EditFilled,
    HighlightFilled,CopyOutlined,SettingOutlined,SettingFilled
  },
  setup() {
    const UserDataEntityState = reactive(new UserDataEntity());

    let visible = ref<boolean>(false);
    let loading = ref<boolean>(false);
const pageSizeOptions = ref<string[]>(['5', '10', '20', '30', '40', '50']);
    let modalTitle = ref<string>("");
    const deleteMark = ref<string>("");
      let refreshMark = ref<string>("");
    /***功能按钮****************/
    const SearchBtn = async (payload: any) => {
      //console.log(payload);
      loading.value = true;
      let UserDatasList1 = await GetUserDatas({
        current: 1,
        pageSize: pageSize.value,
        ...payload,
      });
      //console.log("UserDatasList1",UserDatasList1)
      loading.value = false;
      if (UserDatasList1.isSuccess) {
        UserDataEntityState.UserDataList = UserDatasList1.datas;
        totalCount.value = UserDatasList1.totalCount;
        current1.value = 1;
      }
      UserDataEntityState.QueryConditionInfo = payload;
    };

    const showCreateModal = () => {
      visible.value = true;
      modalTitle.value = "新增【用户信息】";
      UserDataEntityState.EditData.sysUserId = "";
      UserDataEntityState.EditData.name = "";

      UserDataEntityState.EditData.pwd = "";
      UserDataEntityState.EditData.gender = "未选择";

      UserDataEntityState.EditData.address = "";
      UserDataEntityState.EditData.phone = "";

      UserDataEntityState.EditData.email = "";
      UserDataEntityState.EditData.level = "";
      UserDataEntityState.EditData.userDesc = "";
      UserDataEntityState.EditData.useStatus = "未选择";
    };

    const closeMoadl = () => {
      visible.value = false;
    };
 const refreshBtn = () => {
      loading.value = true;
       UserDataEntityState.QueryConditionInfo={
      sysUserId: "",
      name: "",
      gender: "未选择",
      useStatus:"未选择",
      address: "",
      phone: "",
      email: "",
      level: "",
   
    }
      GetUserDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...UserDataEntityState.QueryConditionInfo,
      }).then((res: any) => {      
        loading.value = false;
        if (res.isSuccess) {
          console.log(res.datas)
          UserDataEntityState.UserDataList = res.datas;
             totalCount.value =  res.totalCount;
        }
      });
    };

 const UpdateInfoBtn = (payload: any) => {
       console.log(payload)


       UpdateUserDatas(payload).then((res:any)=>{
         console.log(res)
            if(res.isSuccessful)
            {
            visible.value = false;
            refreshMark.value=new Date().getTime().toString();
              message.success(res.message);
            }
            else
{
   message.error("更新失败.");
 
}

       })
      
    };

 const CreateInfoBtn = (payload: any) => {
       console.log(payload)


       AddUserDatas(payload).then((res:any)=>{
         console.log(res)
            if(res.isSuccessful)
            {
            visible.value = false;
            refreshMark.value=new Date().getTime().toString();
              message.success(res.message);
            }
            else
{
   message.error("添加失败.");
 
}

       })
      
    };







    const batchDelete = () => {
      console.log(UserDataEntityState.selectedRows);
      let ids: string[] = [];
      for (let i in UserDataEntityState.selectedRows) {
        ids[i] = UserDataEntityState.selectedRows[i].sysUserId;
      }
      let isDesibleOkBtn = false;
      if (ids.length == 0) {
        isDesibleOkBtn = true;
      }

      Modal.confirm({
        title: "您确定要执行批量删除操作吗?",
        icon: createVNode(ExclamationCircleOutlined),
        content: `共计：${ids.length} 条记录`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        okButtonProps: {
          disabled: isDesibleOkBtn,
        },
        onOk() {
          // const index = UserDataEntityState.UserDataList.findIndex(
          //     (i: IUserInfo) => i.sysUserId == Id);
          //     UserDataEntityState.UserDataList.splice(index, 1);

          console.log(ids);
          BatchDeleteUser({ Ids: ids }).then((res: any) => {
            if (res.isSuccess) {          
              refreshMark.value=new Date().getTime().toString();
              UserDataEntityState.selectedRowKeys = [];
              UserDataEntityState.selectedRows = [];
              message.success("删除成功.");
            }
          });
        },
        onCancel() {
          message.error("已取消.");
        },
      });
    };

    /***功能按钮****************/

    const confirm = (e: MouseEvent) => {
      console.log(e);

      const index = UserDataEntityState.UserDataList.findIndex(
        (i: IUserInfo) => i.sysUserId == deleteMark.value
      );

      //UserDataEntityState.UserDataList.splice(index, 1);
      //deleteMark.value = "";

      message.success("删除成功.");
    };

    const cancel = (e: MouseEvent) => {
      console.log(e);
      deleteMark.value = "";
      message.error("已取消操作.");
    };

    /***分页****************/
    const pageSize = ref(10);
    const current1 = ref(1);
    const totalCount = ref(0);

    const onShowSizeChange = (current: number, pageSize: number) => {
      loading.value = true;
      GetUserDatas({
        current: current,
        pageSize: pageSize,
        ...UserDataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        console.log(res);
        loading.value = false;
        if (res.isSuccess) {
          UserDataEntityState.UserDataList = res.datas;
        }
      });
    };
    watch(pageSize, () => {
      //console.log("pageSize", pageSize.value);
    });
    watch(current1, () => {
      loading.value = true;
      GetUserDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...UserDataEntityState.QueryConditionInfo,
      }).then((res: any) => {
        //console.log(res);
        loading.value = false;
        if (res.isSuccess) {
          UserDataEntityState.UserDataList = res.datas;
        }
      });
    });
  watch(refreshMark, () => {
     loading.value = true;
      GetUserDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...UserDataEntityState.QueryConditionInfo,
      }).then((res: any) => {      
        loading.value = false;
        if (res.isSuccess) {
          console.log(res.datas)
          UserDataEntityState.UserDataList = res.datas;
             totalCount.value =  res.totalCount;
        }
      });
    });

    
    /***分页****************/

    /***数据初始化****************/
    onMounted(async () => {
      //获取表格列及处理表格列
      let columnList = await GetUserColumn();
      for (var i in columnList) {
        console.log(columnList[i]["slots"]);
        if (columnList[i]["slots"] == null) {
          delete columnList[i]["slots"];
        }
      }
      UserDataEntityState.UserListColumns = columnList;

      //获用户数据
      loading.value = true;
      let UserDatasList = await GetUserDatas({
        current: 1,
        pageSize: pageSize.value,
      });
      loading.value = false;
      if (UserDatasList.isSuccess) {
        UserDataEntityState.UserDataList = UserDatasList.datas;
        totalCount.value = UserDatasList.totalCount;
        current1.value = 1;
      }
    });
    /***数据初始化****************/

    /***排序****************/
    const handleTableChange = (pag: any, filters: any, sorter: any) => {
      console.log({
        results: pag!.pageSize!,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };
    /***排序****************/
    /***勾选****************/
    const onSelectChange = (selectedRowKeys: [], selectedRows: []) => {
      console.log("selectedRows changed: ", selectedRows);
      UserDataEntityState.selectedRowKeys = selectedRowKeys;
      UserDataEntityState.selectedRows = selectedRows;
    };
    /***勾选****************/

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
                  



 CopyUserDataById({ Id: Id }).then((res: any) => {
   console.log(res)
            if (res.isSuccessful) {          
              refreshMark.value=new Date().getTime().toString();
              UserDataEntityState.selectedRowKeys = [];
              UserDataEntityState.selectedRows = [];
              message.success("复制成功.");
            }
          });


          }
          
          
          
          
          if (
            event.target.parentNode.getAttribute("data-icon") == "edit" ||
            event.target.parentNode.parentNode.getAttribute("aria-label") ==
              "edit"
          ) {
            const Id = record.sysUserId;
            const res: IUserInfo[] = UserDataEntityState.UserDataList.filter(
              (i: IUserInfo) => i.sysUserId == Id
            );
            console.log(res[0]);
            UserDataEntityState.EditData.sysUserId = res[0].sysUserId;
            UserDataEntityState.EditData.name = res[0].name;
            UserDataEntityState.EditData.pwd = res[0].pwd;
            UserDataEntityState.EditData.address = res[0].address;
            UserDataEntityState.EditData.phone = res[0].phone;
            UserDataEntityState.EditData.email = res[0].email;
            UserDataEntityState.EditData.level = res[0].level;
            UserDataEntityState.EditData.userDesc = res[0].userDesc;
            UserDataEntityState.EditData.useStatus = res[0].useStatus;
            UserDataEntityState.EditData.gender = res[0].gender;
            visible.value = true;
            modalTitle.value = "编辑【用户信息】";
          }
          if (
            event.target.parentNode.getAttribute("data-icon") == "delete" ||
            event.target.parentNode.parentNode.getAttribute("aria-label") ==
              "delete"
          ) {
            const Id = record.sysUserId;

            Modal.confirm({
              title: "您确定要删除这条记录吗?",
              icon: createVNode(ExclamationCircleOutlined),
              content: `用户名：${record.name}`,
              okText: "Yes",
              okType: "danger",
              cancelText: "No",
              onOk() {
                // const index = UserDataEntityState.UserDataList.findIndex(
                //     (i: IUserInfo) => i.sysUserId == Id);
                //     UserDataEntityState.UserDataList.splice(index, 1);

                loading.value = true;
                DeleteUserById({ UserId: Id }).then((res: any) => {
                  if (res.isSuccess) {
                     refreshMark.value=new Date().getTime().toString();
                    message.success("删除成功.");
                  }
                });
              },
              onCancel() {
                message.error("已取消.");
              },
            });
          }
        },
      };
    };
    /***rowActionClick****************/

    return {
      rowActionClick,

      onSelectChange,

      pageSize,
      current1,
      totalCount,
      onShowSizeChange,
      handleTableChange,
      SearchBtn,
      modalTitle,
      visible,
      confirm,
      cancel,
      closeMoadl,
      showCreateModal,
      batchDelete,
      ...toRefs(UserDataEntityState),
      UserDataEntityState,
      loading,refreshBtn,
      pageSizeOptions,UpdateInfoBtn,CreateInfoBtn
    };
  },
});
</script>

<style >
#userList {
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

#userList .ant-table-thead > tr > th,
#userList .ant-table-tbody > tr > td {
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