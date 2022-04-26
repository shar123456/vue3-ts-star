<template>
    <div>
 <a-modal
    cancelText="关闭"
     okText="确认"
    wrapClassName="ExportExcel"
    v-model:visible="visibleConfigGrid"
    width="1000px"
    :title="titleConfigGrid"
     :ok-button-props="{ style:{display:''} }"
    @Cancel="onCancel"
      @ok="handleOk"
  >

<a-row style="border:0px solid red;background-color:#f7f7f7;">
   <a-col :span="2" class="configCol">序号</a-col>
    <a-col :span="6" class="configCol">列名</a-col>
    <a-col :span="3" class="configCol">显示开关</a-col>
    <a-col :span="3" class="configCol">列宽</a-col>
    <a-col :span="3" class="configCol">排列位置</a-col>
  </a-row>
<a-row  v-for="(item,index) in LColumns" :key="index">
 <a-col :span="2" style="text-align:center;border:1px solid #f0f0f0;">{{index}}</a-col>
    <a-col :span="6"><a-input  v-model:value="item.title" :placeholder="item.title" /></a-col>
    <a-col :span="3" style="text-align:center;border:1px solid #f0f0f0;"><a-switch checked-children="开" un-checked-children="关" v-model:checked="item.isUse" /></a-col>
    <a-col :span="3" style="text-align:center;border:0px solid #f0f0f0;"><a-input-number  v-model:value="item.width" :min="10" :max="2000" /></a-col>
    <a-col :span="3" style="text-align:center;border:0px solid #f0f0f0;"> <a-input-number  v-model:value="item.configOrder" :min="1" :max="100" /></a-col>
  </a-row>

    
    
  
  </a-modal>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs,ref,onMounted,watch } from 'vue'
import { UserDataEntity,IUserInfo } from "../TypeInterface/IUserInterface";
import { message} from "ant-design-vue";
import {
SetLoginRecordGrid
 
} from "../Request/userRequest";

import { InboxOutlined } from '@ant-design/icons-vue';


interface Itest {
    colsForeignKeyId: string;
    
  }

export default defineComponent({
      props: { ListColumns:Object,
       visibleModelConfigGrid:Boolean,modalTitleConfigGrid: String,},
       components: {
    InboxOutlined,
  },
    setup (props,context) {
        const state = reactive({
            count: 0,
        })
          let visibleConfigGrid = ref<boolean>(props.visibleModelConfigGrid);
          let titleConfigGrid = ref<string|undefined>(props.modalTitleConfigGrid);
           let LColumns=ref<any>(props.ListColumns);
        

const handleOk = (e: MouseEvent) => {


 SetLoginRecordGrid(props.ListColumns).then((res: any) => {
            if (res.isSuccess) {
              
            context.emit("refreshBtn");

            context.emit("CloseConfigGridMoadl");
            message.success("配置成功.");
            }
         });
  };

 
 
    const onCancel = (e: MouseEvent) => {
   context.emit("CloseConfigGridMoadl");
    };
    watch(
      () => props.visibleModelConfigGrid,
      (newValue) => {
           
        
          
            visibleConfigGrid.value=newValue;
      }
    );
     watch(
      () => props.modalTitleConfigGrid,
      (newValue) => {
           
      
          
            titleConfigGrid.value=newValue;
      }
    );
     watch(
      () => props.ListColumns,
      (newValue) => {
           
      
          
            LColumns.value=newValue;
      }
    );
        return {
            ...toRefs(state),visibleConfigGrid,titleConfigGrid,onCancel,handleOk,LColumns
     
   
        }
    }
})
</script>

<style  >
.modalEditRow {
  border: 0px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 45px;
}
.modalEditCol {
  display: flex;
  width: 45%;
  align-items: center;
}
.modalEditCol label {
  width: 120px;
  text-align: left;
}
.modalEditCol div {
  flex-grow: 1;
}
.ExportExcel .ant-modal-title {
  font-size: 16px;
  color: #1890ff !important;
  font-weight: 400;
}
.configCol{
  border:2px solid #f0f0f0;height:40px;text-align:center;line-height:40px;color:black;
    font-size:14px
}
</style>