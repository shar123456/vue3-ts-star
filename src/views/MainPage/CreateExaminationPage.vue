<template>
    <div class="mainSpContent">

   <div style="padding:5px">

<a-row >
   
    <a-col :span="24" class="title">新建审批任务</a-col>
  
  </a-row>
<a-row  style="height:23px"></a-row>

  <a-row type="flex" justify="center">
    <a-col class="col" :span="11" ><span>审批编号</span><a-input  placeholder="请输入审批编号" /></a-col>
    <a-col class="col" :span="1" ></a-col>
      <a-col class="col" :span="11" ><span>审批名称</span><a-input  placeholder="请输入审批名称" /></a-col>
  </a-row>


  <a-row type="flex" justify="center">

      <a-col class="col" :span="11"> <span>审批类型</span><a-input  placeholder="请输入审批类型" /></a-col>
    <a-col class="col" :span="1" ></a-col>
    <a-col class="col" :span="11"> <span>紧急程度</span><a-input  placeholder="请输入紧急程度" /></a-col>
  </a-row>

<a-row  style="height:5px"></a-row>


 <a-row type="flex" justify="center">
    <a-col class="col" :span="11" ><span>开始时间</span> <a-date-picker  style="width:100%" /></a-col>
    <a-col class="col" :span="1" ></a-col>
    <a-col class="col" :span="11"> <span>结束时间</span> <a-date-picker  style="width:100%" /></a-col>
  </a-row>


<a-row  style="height:5px"></a-row>


 <a-row type="flex" justify="center">
    <a-col class="col" :span="11" ><span>审批流程</span>  
    
     <a-select   style="width:100%"  placeholder="请选择审批流程">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-col>
    <a-col class="col" :span="1" ></a-col>

  <a-col class="col" :span="11"><span>发起人</span>
    
    <a-input  placeholder="请输入发起人" />
    
    
    
    
    
    
    
    
    
    
    </a-col>


   
  </a-row>

<a-row  style="height:5px"></a-row>
 <a-row type="flex" justify="center">
     
<a-col class="col" :span="11" ><span>通知类型</span> 
<a-checkbox-group   style="width:100%">
   
       

 <a-checkbox value="A" style="color:rgba(0, 0, 0, 0.4);font-size:16px;font-weight:600">邮件</a-checkbox>
    
        <a-checkbox value="B" style="color:rgba(0, 0, 0, 0.4);font-size:16px;font-weight:600">公众号推送</a-checkbox>
      
  </a-checkbox-group></a-col>













   
  
     <a-col class="col" :span="1" ></a-col>
 
 <a-col class="col" :span="11"> 
    <span>上传文件</span>
    <div   style="width:100%" >
 <a-upload

 
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  
  >
    <a-button  type="primary">
      <upload-outlined  style="color:white"></upload-outlined>
      点击选择文件
    </a-button>
  </a-upload>
    </div>
   
    </a-col>
    
  </a-row>
<a-row  style="height:5px"></a-row>
 <a-row type="flex" justify="center">

  <a-col class="col" :span="11" ><span>备注</span>  <a-textarea placeholder="请输入备注" :rows="4" /></a-col>
    <a-col class="col" :span="1" ></a-col>
    <a-col class="col" :span="11"> </a-col>
  </a-row>









<a-row  style="height:75px"></a-row>
 <a-row type="flex" justify="center">
   
   
    <a-col class="col" :span="24" style="text-align:center">
     <a-button type="primary">提交审核</a-button>&nbsp;
      <a-button type="primary">保存草稿</a-button>&nbsp;
       <a-button >取消</a-button></a-col>
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
   





onMounted(() => {
   

 console.log(localStorage.getItem("UserName"));

   });
  
  
        return {
            ...toRefs(state),
        }
    }
})
</script>

<style  scoped>
.mainSpContent
{
box-sizing: border-box;
    border:1px solid rgba(204, 204, 204, 0.644);
    background-color: rgba(223, 223, 223, 0);
    width: 100%;
    height: calc(100vh - 92px);
     overflow:auto;
}

.mainSpContent .col{
    line-height: 30px;
}
.mainSpContent .col span{
    color:rgba(0, 0, 0, 0.4);
    font-weight: 600;
    font-size: 16px;
    
}

.mainSpContent .title
{
    text-align: center;
    line-break: 40px;
    font-size:22px;
    font-weight: 600;
    color: rgba(51, 108, 161, 0.574);
}
</style>