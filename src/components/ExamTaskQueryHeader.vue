<template>
  <div id="userListPad">
    <div class="upPad">
      <div class="upPad-up">
       
        <div>
          <label>审批编号：</label>
          <div>
            <a-input
              v-model:value="QueryConditionInfo.examNo"
              placeholder="审批编号"
            />
          </div>     
        </div>
<div>
          <label>审批编号：</label>
          <div>
            <a-input
              v-model:value="QueryConditionInfo.examNo"
              placeholder="审批编号"
            />
          </div>     
        </div>
 <div>
          <label>审批标题：</label>
          <div>
             <a-input v-model:value="QueryConditionInfo.examName" placeholder="审批标题" />
          </div>     
        </div>
         <div>
          <label>发起人：</label>
          <div>
             <a-input v-model:value="QueryConditionInfo.initiator" placeholder="发起人" />
          </div>     
        </div>
       


      </div>


       <div class="upPad-down">  

<div>
         <label>状态：</label>
          <div>
            <a-select
              ref="select"
              v-model:value="QueryConditionInfo.useStatus"
              style="width: 150px"
            >
             
             <a-select-option value="未选择">未选择</a-select-option>
              <a-select-option value="启用">启用</a-select-option>
              <a-select-option value="草稿">草稿</a-select-option>
              <a-select-option value="禁用">禁用</a-select-option>
            </a-select>
          </div> 
        </div>

  


<div>
         <label>紧急程度：</label>
          <div>
            <a-select
              ref="select"
              v-model:value="QueryConditionInfo.emergencyLevel"
              style="width: 150px"
            >
             
             <a-select-option value="未选择">未选择</a-select-option>
              <a-select-option value="低">低</a-select-option>
              <a-select-option value="中">中</a-select-option>
             <a-select-option value="高">高</a-select-option>
            </a-select>
          </div> 
        </div>
<div>
         <label>审核状态：</label>
          <div>
            <a-select
              ref="select"
              v-model:value="QueryConditionInfo.examStatus"
              style="width: 150px"
            >
             
             <a-select-option value="未选择">未选择</a-select-option>
              <a-select-option value="进行中">进行中</a-select-option>
              <a-select-option value="已完成">已完成</a-select-option>
             <a-select-option value="已取消">已取消</a-select-option>
            
            </a-select>
          </div> 
        </div></div>
    </div>
    <div class="downPad">
      
      <a-button danger type="primary"   @click="batchDeleteBtn">   <template #icon><delete-outlined /></template>批量删除</a-button>&nbsp;
<a-button type="primary" @click="refreshBtn"> <template #icon><redo-outlined /></template>刷新</a-button>&nbsp;
<a-button type="primary" @click="ClearQueryBtn" style="background-color: goldenrod; border-color: goldenrod"><template #icon><clear-outlined /></template>清空筛选条件</a-button>&nbsp;
<a-button type="primary" @click="SearchBtn">
    <template #icon><SearchOutlined /></template> 搜索 </a-button>&nbsp;&nbsp;
</div>
</div>
</template>

<script lang="ts">
    import {
        reactive,
        toRefs,
        defineComponent
    } from "vue";
    import {
        ExaminationTaskEntity
    } from "../TypeInterface/IExaminationInterface";
    import {
        SearchOutlined,
        PlusOutlined,
        DeleteOutlined,
        BarChartOutlined,
        RedoOutlined,
        ClearOutlined,
        AppstoreAddOutlined,
        ToolOutlined,
        CloudUploadOutlined
    } from "@ant-design/icons-vue";
    import {
        dateFormat
    } from '../utility/commonFunc'
    export default defineComponent({
        components: {
            SearchOutlined,
            PlusOutlined,
            DeleteOutlined,
            BarChartOutlined,
            RedoOutlined,
            ClearOutlined,
            AppstoreAddOutlined,
            ToolOutlined,
            CloudUploadOutlined
        },
        props: {},
        setup(props, context) {
            const state = reactive(new ExaminationTaskEntity());
            const SearchBtn = () => {


                context.emit("SearchBtn", {...state.QueryConditionInfo
                });
            };

            const ClearQueryBtn = () => {

                state.QueryConditionInfo.examNo = "";

                state.QueryConditionInfo.examName = "";
                state.QueryConditionInfo.useStatus = "未选择";
  state.QueryConditionInfo.initiator = "";
    state.QueryConditionInfo.flowNo = "";
      state.QueryConditionInfo.noticeType = "未选择";
        state.QueryConditionInfo.examStatus = "未选择";
 state.QueryConditionInfo.emergencyLevel = "未选择";



            };

            const batchDeleteBtn = () => {
                context.emit("batchDelete");
            };
            const fileUploadBtn = () => {
                context.emit("fileUploadBtn");
            };


            const configGridBtn = () => {
                context.emit("showConfigGrid");
            };





            const refreshBtn = () => {
                ClearQueryBtn();
                context.emit("refreshBtn");
            };


            const exportExcel = () => {

                context.emit("exportExcel");

            };




            const importExcel = () => {

                context.emit("importExcel");
            }


            return {
                ...toRefs(state),
                SearchBtn,

                ClearQueryBtn,
                exportExcel,
                batchDeleteBtn,
                refreshBtn,
                importExcel,
                configGridBtn,
                fileUploadBtn
            };
        },
    });
</script>

<style scoped>
    #userListPad {
        height: 130px;
        box-sizing: border-box;
        border: 0px solid red;
        box-sizing: border-box;
        margin-bottom: 0px;
        overflow: auto;
    }
    
    .upPad {
        height: 88px;
        border: 0px solid red;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-width: 1000px;
        padding-top: 5px
    }
    
    .upPad-up {
        border: 0px solid red;
        height: 50%;
        display: flex;
    }
    
    .upPad-up div {
        display: flex;
        align-items: center;
        width: 23%;
        display: flex;
        justify-content: flex-start;
    }
    
    .upPad-up div label {
        border: 0px solid red;
        margin-left: 10px;
    }
    
    .upPad-up div div {
        width: 60%;
        border: 0px solid red;
    }
    
    .upPad-down {
        border: 0px solid red;
        height: 50%;
        display: flex;
        width: 100%;
    }
    
    .upPad-down div {
        display: flex;
        align-items: center;
        width: 23%;
        display: flex;
        justify-content: flex-start;
    }
    
    .upPad-down div label {
        border: 0px solid red;
        width: 21%;
        margin-left: 10px;
    }
    
    .upPad-down div div {
        border: 0px solid red;
        width: 79%;
    }
    
    .downPad {
        height: 40px;
        border: 0px solid red;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 1000px;
    }
</style>