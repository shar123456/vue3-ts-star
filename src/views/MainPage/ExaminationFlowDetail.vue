<template>
    <div class="ExaminationFlowDetail">
 <a-row style="border-bottom: 1px solid #f4f4f4;line-height: 45px;padding-left:5px">
    <a-col :span="2" style="font-weight:700;font-size: 18px;">流程编号</a-col>
    <a-col :span="22" style="font-weight:400;font-size: 17px;">LC2205283399</a-col>
  </a-row>

<a-row style="border-bottom: 1px solid #f4f4f4;line-height: 45px;padding-left:5px">
    <a-col :span="2" style="font-weight:700;font-size: 18px;">流程名称</a-col>
    <a-col :span="22" style="font-weight:400;font-size: 17px;">用户权限审批流程</a-col>
  </a-row>
<a-row style="border-bottom: 1px solid #f4f4f4;line-height: 45px;padding-left:5px">
    <a-col :span="2" style="font-weight:700;font-size: 18px;">状态</a-col>
    <a-col :span="22" style="font-weight:400;font-size: 17px;">启用</a-col>
  </a-row>
  <a-row style="border-bottom: 1px solid #f4f4f4;line-height: 45px;padding-left:5px">
    <a-col :span="2" style="font-weight:700;font-size: 18px;">创建时间</a-col>
    <a-col :span="22" style="font-weight:400;font-size: 17px;">2022-05-28</a-col>
  </a-row>
  <a-row style="border-bottom: 1px solid #f4f4f4;line-height: 45px;padding-left:5px">
    <a-col :span="2" style="font-weight:700;font-size: 18px;">审批人</a-col>
    <a-col :span="22" style="font-weight:400;font-size: 17px;"><text style="color:#1890ff">admin;&nbsp;Queen;&nbsp;Jack;</text></a-col>
  </a-row>
  <a-row style="border-bottom: 1px solid #f4f4f4;line-height: 45px;padding-left:5px"
  
  
  >
    <a-col :span="2" style="font-weight:700;font-size: 18px;">流程图</a-col>
    <a-col :span="22" style="font-weight:400;font-size: 17px;border:0px dotted #71a6e7;height: 180px; background-color: white;overflow: auto;
    display:flex;align-items: center;justify-content: center;">
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
              <span style="color:darkgrey;">手机号：{{item.content}}.</span><br/>
                 <span style="color:darkgrey;">审批状态：{{"未审批"}}.</span><br/>
                    <span style="color:darkgrey;">审批时间：{{"暂无"}}.</span>
            </template>
            <!-- <template v-if="item.isLast" #icon
              ><PlusCircleTwoTone @click="addPersonBtn"
            /></template> -->
          </a-step>
        </a-steps>
    
    
    </a-col>
  </a-row>



<a-row  style="height:75px"></a-row>
 <a-row type="flex" justify="center">
   
   
    <a-col class="col" :span="24" style="text-align:center">
     <a-button @click="returnBtn" type="primary">返回</a-button>&nbsp;
      </a-col>
  </a-row>

    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
    setup () {
           const route = useRoute();
    const router = useRouter();
  let direction = ref<string>("horizontal");
 const current = ref<number>(0);
    let steps = ref<any[]>([]);

steps.value.push({
    id:"001",
    title:"admin",
    content:"13898695585",
  })
  steps.value.push({
    id:"002",
    title:"Queen",
    content:"15536969963",
  })
  steps.value.push({
    id:"002",
    title:"Jack",
    content:"15999883322",
  })
  if(steps.value.length>8){
direction.value="vertical"
  }
  else
  {
    direction.value="horizontal"
  }


  const returnBtn = () => {
      router.push({ path: "/Home/ExaminationFlowListPage", query: {} });
    };
        return {returnBtn, current,direction,
      steps,}
    }
})
</script>

<style scoped>
.ExaminationFlowDetail {
  height: calc(100vh - 93px);
  border: 0px solid red;
  box-sizing: border-box;
  padding: 5px;
   padding-left: 10px;
}
</style>