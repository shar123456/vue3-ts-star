<template>
    <div class="CfgDetailInfoContent">

   
    <div class="CfgDetailInfo">
<a-row >
   
    <a-col :span="24" class="title">系统用户权限配置信息总览</a-col>
  
  </a-row>
 <a-row  >
   
    <a-col  :xs="{ span: 4 }" :sm="{ span: 8 }"  :lg="{ span: 4 }"   class="titleSub">
   
<a-auto-complete
    v-model:value="UserName"
    style="width: 100%"
    placeholder="请输入用户名"
    @search="handleSearch"
  >
    <template #dataSource>
      <a-select-option v-for="temp in result" :key="temp">
        {{ temp }}
      </a-select-option>
    </template>
  </a-auto-complete>


    </a-col>
  <a-col  :xs="{ span: 14 }" :sm="{ span: 15 }" :lg="{ span: 3 }" class="titleSub">
 
     <a-button type="primary" @click="searchBtn">搜索</a-button>&nbsp;&nbsp;
      <a-button v-if="QueryId!=''&&QueryId!=undefined" type="primary" @click="returnBtn">返回</a-button>
    </a-col>
   
  </a-row>
   <a-row>
   
    <a-col :span="24" class="content">
     
     <div style="width:100%;height:60vh;display: flex;align-items: center;justify-content: center;"> <a-empty description="暂无数据"  /></div>
    

          
    
    </a-col>
  
  </a-row>
    </div>
     </div>
</template>

<script lang="ts">
import { reactive, toRefs,defineComponent,onMounted,ref } from 'vue'
import {
 getUserByName
} from "../../Request/userRequest";
import {useRouter, useRoute} from 'vue-router'
export default defineComponent({
    setup () {
        const state = reactive({
            count: 0,
        })
    const route = useRoute();
  const router=useRouter();
      let QueryId=ref<any>("");
 let UserName=ref<string>("");
  const result = ref<string[]>([]);
    const handleSearch = (val: string) => {
      let res: string[];
      
 getUserByName({ Name: val }).then((res1: any) => {
                 
                  if (res1.isSuccess) {
                  result.value = res1.datas;
                  }
                

    })
    }










onMounted(() => {
    QueryId.value=route.query.Id;
       console.log("获取到的参数", route.query.Id);

 console.log(localStorage.getItem("UserName"));

   });
  const returnBtn=()=>{
         router.push({path: '/Home/UserListPage', query: {}});
  }
  const searchBtn=()=>{
        //
  }

  
        return {
            ...toRefs(state),returnBtn,QueryId,searchBtn
            ,   result,
      handleSearch,UserName
        }
    }
})
</script>

<style  scoped>
.CfgDetailInfoContent
{
box-sizing: border-box;
    border:1px solid rgba(204, 204, 204, 0.644);
    background-color: rgba(223, 223, 223, 0);
    width: 100%;
   
     height: calc(100vh - 92px);
}
.CfgDetailInfo{
   
    overflow:auto;
     height: 100%;
}


.CfgDetailInfo .title
{
    text-align: center;
    line-break: 40px;
    font-size:25px;
    font-weight: 600;
    color: rgba(51, 108, 161, 0.774);
}
.CfgDetailInfo .content{
   border: 0px solid red;
    
}
</style>