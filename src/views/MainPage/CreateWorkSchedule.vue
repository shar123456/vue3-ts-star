<template>
    <div class="mainWSContent">

   <div style="padding:5px">

<a-row >
   
    <a-col :span="24" class="title">新建工作计划</a-col>
  
  </a-row>
<a-row  style="height:23px"></a-row>

  <a-row type="flex" justify="center">
    <a-col class="col" :span="11" ><span>计划编号</span><a-input  placeholder="请输入计划编号" /></a-col>
    <a-col class="col" :span="1" ></a-col>
      <a-col class="col" :span="11" ><span>标题</span><a-input  placeholder="请输入标题" /></a-col>
  </a-row>


  <a-row type="flex" justify="center">

      <a-col class="col" :span="11"> <span>类型</span>
      
      <a-select   style="width:100%"  placeholder="请选择类型">
        <a-select-option value="未选择">未选择</a-select-option>
        <a-select-option value="公事">公事</a-select-option>
           <a-select-option value="私事">私事</a-select-option>
      </a-select>
      
      </a-col>
    <a-col class="col" :span="1" ></a-col>
    <a-col class="col" :span="11"> <span>计划状态</span>
     <a-select   style="width:100%"  placeholder="请选择计划状态">
        <a-select-option value="未选择">未选择</a-select-option>
        <a-select-option value="未开始">未开始</a-select-option>
           <a-select-option value="已取消">已取消</a-select-option>
   <a-select-option value="已完成">已完成</a-select-option>
      <a-select-option value="已过期">已过期</a-select-option>
         <a-select-option value="已开始">已开始</a-select-option>
        

      </a-select></a-col>
  </a-row>




<a-row  style="height:5px"></a-row>


 <a-row type="flex" justify="center">
    <a-col class="col" :span="11" ><span>状态</span>  
    
     <a-select   style="width:100%"   placeholder="请选择状态">
       <a-select-option value="未选择">未选择</a-select-option>
        <a-select-option value="启用">启用</a-select-option>
        <a-select-option value="禁用">禁用</a-select-option>
      </a-select>
    </a-col>
    <a-col class="col" :span="1" ></a-col>

  <a-col class="col" :span="11"><span>发布人</span>
    
    <a-input  placeholder="请输入发布人" />
    
    
    
    
    
    
    
    
    
    
    </a-col>


   
  </a-row>
<a-row  style="height:5px"></a-row>
 <a-row type="flex" justify="center">

  <a-col class="col" :span="11" ><span>开始时间</span>  <a-date-picker  style="width:100%" /></a-col>
    <a-col class="col" :span="1" ></a-col>
    <a-col class="col" :span="11"><span>通知类型</span>  <a-checkbox-group   style="width:100%">
   
       

 <a-checkbox value="A" style="color:rgba(0, 0, 0, 0.5);font-size:16px;font-weight:600">邮件</a-checkbox>
    
        <a-checkbox value="B" style="color:rgba(0, 0, 0, 0.5);font-size:16px;font-weight:600">公众号推送</a-checkbox>
      
  </a-checkbox-group> </a-col>
  </a-row>

<a-row  style="height:5px"></a-row>
 <a-row type="flex" justify="center">

  <a-col class="col" :span="11" ><span>工作内容</span>  <a-textarea placeholder="请输入工作内容" :rows="4" /></a-col>
    <a-col class="col" :span="1" ></a-col>
    <a-col class="col" :span="11"><span>备注</span>  <a-textarea placeholder="请输入备注" :rows="4" /> </a-col>
  </a-row>









<a-row  style="height:75px"></a-row>
 <a-row type="flex" justify="center">
   
   
    <a-col class="col" :span="24" style="text-align:center">
     <a-button type="primary">提交计划</a-button>&nbsp;
     
       <a-button  @click="goBackBtn">返回计划列表</a-button></a-col>
  </a-row>



   </div>
  
    </div>
  
</template>

<script lang="ts">
import { reactive, toRefs,defineComponent,onMounted,ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import {useRouter, useRoute} from 'vue-router'
export default defineComponent({
    components:{UploadOutlined},
    setup () {
        const state = reactive({
            count: 0,
        })
    const route = useRoute();
  const router=useRouter();
   


const goBackBtn=()=>{
   router.push({ path: "/Home/WorkSchedulePage", query: {} });
}


onMounted(() => {
   

 console.log(localStorage.getItem("UserName"));

   });
  
  
        return {
            ...toRefs(state),goBackBtn
        }
    }
})
</script>

<style  scoped>
.mainWSContent
{
box-sizing: border-box;
    border:1px solid rgba(204, 204, 204, 0.644);
    background-color: rgba(223, 223, 223, 0);
    width: 100%;
    height: calc(100vh - 92px);
     overflow:auto;
}

.mainWSContent .col{
    line-height: 30px;
}
.mainWSContent .col span{
    color:rgba(0, 0, 0, 0.5);
    font-weight: 600;
    font-size: 16px;
    
}

.mainWSContent .title
{
    text-align: center;
    line-break: 40px;
    font-size:22px;
    font-weight: 600;
    color: rgba(51, 108, 161, 0.774);
}
</style>