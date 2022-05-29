<template>
    <div class="MyCalendarPage">
         <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }">
     <a-calendar v-model:value="value" :fullscreen="true" :locale="locale"   @select="onSelect" @panelChange="onPanelChange"  >   
    <template #dateCellRender="{  current: value  }">
      <ul class="events">
        <li v-for="item in getListData(value)" :key="item.content" >
          <a-badge style="color:blue;" :status="item.type" :text="item.content"/>
        </li>
      </ul>
    </template>
    <template #monthCellRender="{ current: value }">
      <div v-if="getMonthData(value)" class="notes-month">
        <section>{{ getMonthData(value) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
     </div> 
   </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useRouter, useRoute } from "vue-router";
 import 'moment/locale/zh-cn';
export default defineComponent({
    setup () {
           const route = useRoute();
    const router = useRouter();
   const value = ref<any>();
 let listData:any[]|undefined=undefined;
    const getListData = (value: any) => {
        console.log("getListData",value.month())
 listData=[];
   let date=new Date();
            
             if(value.month()== date.getMonth())
             {

            
      switch (value.date()) {
           case 3:{
           
          listData = [
            { type: 'success', content: '总部视频会议，主要讨论第三季生产部产能消耗问题.' },
            //{ type: 'success', content: 'This is usual event.' },
          ];
          break;}
           case 19:
          listData = [
            { type: 'success', content: '拟定排产初步方案.' },
            //{ type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 8:
          listData = [
            { type: 'success', content: '提交采购合同，并对相关附件信息进行审核，签字确认.' },
            //{ type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { type: 'warning', content: '生产会议，针对第三产线生产设备优化等相关问题.' },
          //  { type: 'success', content: 'This is usual event.' },
            //{ type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { type: 'warning', content: '预定酒店' },
          //  { type: 'success', content: 'This is very long usual event。。....' },
          //  { type: 'error', content: 'This is error event 1.' },
           // { type: 'error', content: 'This is error event 2.' },
           // { type: 'error', content: 'This is error event 3.' },
           // { type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }     
       }    
 return listData || [];
    }

const getMonthData = (value: any) => {
      if (value.month() === 8) {
        return "约见重要客人";
      }
    };
 const onSelect = (value: any) => {
     console.log(value)
    };
    const onPanelChange = (value: any) => {
     value
    };

        return {getListData,
      getMonthData,locale: {
          lang: {
            month: '月',
            year: '年',
          },
        }, onSelect,
      onPanelChange,value}
    }
})
</script>

<style >
.MyCalendarPage {
  height: calc(100vh - 93px);
  border: 0px solid red;
  box-sizing: border-box;
  padding: 5px;
   padding-left: 10px;
   overflow:auto;
}

.configCol{
  border:2px solid #f0f0f0;height:40px;text-align:center;line-height:40px;color:black;
    font-size:14px
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  /* overflow: hidden;
  white-space: nowrap; */
  width: 100%;
  /* text-overflow: ellipsis; */
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
.ant-fullcalendar-value{
    font-size: 19px;
    font-weight: 500;
}
</style>