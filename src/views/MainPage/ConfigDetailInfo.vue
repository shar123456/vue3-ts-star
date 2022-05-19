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
     <div  id="tttt" class="content">
     
     <div   v-if="!(list && list.length)" style="width:100%;height:60vh;display: flex;align-items: center;justify-content: center;"> <a-empty description="暂无数据"  /></div>
    

 <line-111  style="width:100%;display: flex;align-items: center;justify-content: center;align-items:center"
      v-if="(list && list.length)"
      :list="list"
      :showfields="showFields"
    ></line-111>

</div>


          
    
  
    </div>
     </div>
</template>

<script lang="ts">
import line111 from '../../components/LeaderLine.vue'
import { reactive, toRefs,defineComponent,onMounted,ref } from 'vue'
import {
 getUserByName
} from "../../Request/userRequest";
import {useRouter, useRoute} from 'vue-router'
export default defineComponent({
   components:{
        line111,
    },
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



const list=ref([//datasource
                {
                    id: '1',
                    name: 'span1',
                      type: '用户',
                    serviceId: 'service1',
                    children: [
                        {
                            id: '1-1',
                            name: 'user',
                            serviceId: 'service-user',
                             type: '角色',
                              CreateTime: '2020-12-15',
                            children: [
                                {
                                    id: '1-1-1',
                                    name: 'shop',
                                    serviceId: '18',
                                    children: [
                                        {
                                            id: '1-1-1-1',
                                            name: 'common',
                                            serviceId: 'common-service',
                                        },
                                    ],
                                },
                                {
                                    id: '1-1-2',
                                    name: 'account1',
                                    serviceId: 'account-service',
                                },
                                {
                                    id: '1-1-3',
                                    name: 'account2',
                                    serviceId: 'account-service',

                                },
                                {
                                    id: '1-1-4',
                                    name: 'account3',
                                    serviceId: 'account-service',
                                },
                            ],
                        },
                        {
                            id: '1-2',
                            name: 'truck', type: '角色',
                            serviceId: 'truck-pay',
                            work: 'web',
                        },
                    ],
                },
            ])

            const showFields=ref([
                {
                    name: '名称：',
                    key: 'name',
                },
                {
                    name: '服务编号：',
                    key: 'serviceId',
                },
                
               
                {
                    name: '创建时间：',
                    key: 'CreateTime',
                },
            ])
        


  



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
      handleSearch,UserName, list,showFields
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
   width:100%;
    overflow: auto;
    height: calc(100vh - 300px);
   display: flex;align-items: center;justify-content: center;
   
}
</style>