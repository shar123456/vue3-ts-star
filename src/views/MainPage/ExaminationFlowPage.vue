<template>
  <div class="mainSpFlowContent">
    <div style="padding: 5px">
      <a-row>
        <a-col :span="24" class="title">创建审批流程</a-col>
      </a-row>
      <a-row style="height: 25px"></a-row>
      <a-row
        type="flex"
        justify="center"
        align="middle"
        style="
          border: 1px dotted #71a6e7;
          height: 150px;
          background-color: #fdfdfd;
        "
      >
        <div>
          <a-button
            @click="addPersonBtn"
            style="color: #639ee5; font-weight: 400; font-size: 16px"
            type="dashed"
            block
          >
            <template #icon><PlusCircleTwoTone /></template>

            添加审批成员</a-button
          >
        </div>

      

       
      </a-row>
     <a-row style="height: 15px"></a-row>
<a-row>
        <a-col :span="24" class="title">流程预览</a-col>
      </a-row>
     

 <a-row style="height: 20px"></a-row>
      <a-row
        type="flex"
        justify="center"
        align="middle"
        style="
          border: 1px dotted #71a6e7;
          height: 180px;
          background-color: white;overflow: auto;
        "
      >
        <!-- <div v-if="steps == undefined || steps.length <= 0">
          <a-button
            @click="addPersonBtn"
            style="color: #639ee5; font-weight: 400; font-size: 16px"
            type="dashed"
            block
          >
            <template #icon><PlusCircleTwoTone /></template>

            添加审批成员</a-button
          >
        </div> -->
<div v-if="steps == undefined || steps.length <= 0">
<a-empty description="暂无预览信息"  /></div>
        <a-steps  :direction="direction"  
          v-if="!(steps == undefined || steps.length <= 0)"
          :current="current"
        >
          <a-step
            status="process"
            v-for="item in steps"
            :key="item.title"
            :title="item.title"
          >
            <template #description>
              <span>{{item.content}}.</span>
            </template>
            <!-- <template v-if="item.isLast" #icon
              ><PlusCircleTwoTone @click="addPersonBtn"
            /></template> -->
          </a-step>
        </a-steps>

        <!-- <a-steps :current="1">
    <a-step>
     
      <template #title>Finished</template>
      <template #description>
        <span>This is a description.</span>
      </template>
    </a-step>
    <a-step  title="In Progress" sub-title="Left 00:00:08" description="This is a description." >

 <template #icon><PlusCircleTwoTone /></template>
  </a-step>

    <a-step title="Waiting" description="This is a description." />
     <a-step title="Waiting" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
       <a-step title="Waiting" description="This is a description." />
  </a-steps> -->
      </a-row>
  <a-row style="height: 75px"></a-row>
      <a-row>
        <a-col :span="24" style="text-align:center">
          <a-button type="primary">保存</a-button>&nbsp;
          <a-button danger type="primary" @click="clearPersonBtn">清空</a-button
          >&nbsp;</a-col
        >
      </a-row>
    </div>
  </div>


 <SearchDataModal
    :visibleModelConfigGrid="visibleSearchModal"
    :modalTitleConfigGrid="modalTitleSearchModal"
  
    configType="SysUser"
    @CloseConfigGridMoadl="CloseConfigSearchModal"
    :ListColumns="UserColumns"
  :ListDatas="UserDatas"
  @addStepsFunc="addStepsFunc"
  />


</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, ref,
 
  watch,
  createVNode, } from "vue";


import SearchDataModal from "../../components/SearchDataModal.vue";







import { PlusCircleTwoTone } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { message, Modal } from "ant-design-vue";
import { deepClone } from "../../utility/commonFunc";
import {
  SearchUserColumns
} from "../../TypeInterface/ISearchDataModalInterface";
import {
  GetLoginRecordColumn,
  GetLoginRecordDatas,
  DeleteLoginRecordById,
  BatchDeleteLoginRecord,
} from "../../Request/userRequest";
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
  GetUsers
} from "../../Request/userRequest";


export default defineComponent({
  components: { PlusCircleTwoTone,SearchDataModal },
  setup() {
    const state = reactive({
      count: 0,
    });
    const route = useRoute();
    const router = useRouter();


let visibleSearchModal = ref<boolean>(false);
    let modalTitleSearchModal = ref<string>("");

 const CloseConfigSearchModal = () => {
      visibleSearchModal.value = false;
         modalTitleSearchModal.value= "";
    };

   let direction = ref<string>("horizontal");

  let UserColumns = ref<any[]>([]);
  let UserDatas = ref<any[]>([]);

 UserColumns.value = SearchUserColumns;

// UserDatas.value = [...Array(100)].map((_, i) => ({
//   key: i,
//   name: `Edward King ${i}`,
//   gender: '男',
//   phone: `1598583065${i}`,
// }));

 const current = ref<number>(0);
    let steps = ref<any[]>([]);
let  addStepsFunc=(item:any)=>{
  CloseConfigSearchModal();
item.forEach((i:any)=>{
  steps.value.push({
    title:i.name,
    content:i.phone
  })
  if(steps.value.length>10){
direction.value="vertical"
  }
  else
  {
    direction.value="horizontal"
  }
})
}


   
    // (steps.value = [
    //   {
    //     title: "First",
    //     content: "First-content",
    //     isLast: false,
    //   },
    //   {
    //     title: "Second",
    //     content: "Second-content",
    //     isLast: false,
    //   },

    //   {
    //     title: "2",
    //     content: "Second-content",
    //     isLast: false,
    //   },
    //   {
    //     title: "添加",
    //     content: "",
    //     isLast: true,
    //   },
    // ]),
    //   (current.value = steps.value.length - 2);

    onMounted(async() => {
     

 let UserDatasList = await GetUsers();

 UserDatas.value.push(...UserDatasList);
 console.log(" UserDatas.value=", UserDatas.value);
    })

    let addPersonBtn = () => {
      visibleSearchModal.value = true;
         modalTitleSearchModal.value= "【信息搜索】";
    };
    let clearPersonBtn = () => {
      steps.value = [];
      current.value = 0;
    };



    






















    return {
      ...toRefs(state),

      current,
      steps,
      addPersonBtn,
      clearPersonBtn,direction,


visibleSearchModal ,
   modalTitleSearchModal,

CloseConfigSearchModal

,UserColumns,UserDatas,addStepsFunc









    };
  },
});
</script>

<style  scoped>
.mainSpFlowContent {
  box-sizing: border-box;
  border: 1px solid rgba(204, 204, 204, 0.644);
  background-color: rgba(223, 223, 223, 0);
  width: 100%;
  height: calc(100vh - 92px);
  overflow: auto;
}
.mainSpFlowContent .title {
  text-align: center;
  line-break: 40px;
  font-size: 22px;
  font-weight: 600;
  color: rgba(51, 108, 161, 0.574);
}
</style>