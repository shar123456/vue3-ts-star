<template>
    <div>
 <a-modal
    cancelText="取消"
    okText="确定"
    wrapClassName="UserList"
    v-model:visible="visible"
    width="1000px"
    :title="modalTitlee"
    @Cancel="onCancel"
      @ok="handleOk"
  >
    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>用户Id：</label>
        <div><a-input v-model:value="EditData.sysUserId" placeholder="用户Id"
        disabled="true" /></div>
      </div>
      <div class="modalEditCol">
        <label>用户名：</label>
        <div>
          <a-input v-model:value="EditData.name" placeholder="用户名" />
        </div>
      </div>
    </div>
    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>密码：</label>
        <div>
          <a-input   :disabled="modalTitlee=='新增【用户信息】'?false:true" v-model:value="EditData.pwd" placeholder="密码" />
        </div>
      </div>
      <div class="modalEditCol">
       <label>Level：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.level"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="一级">一级</a-select-option>

            <a-select-option value="二级">二级</a-select-option>
              <a-select-option value="三级">三级</a-select-option>
                <a-select-option value="四级">四级</a-select-option>
          </a-select>
        </div>
      </div>
    </div>

    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>姓别：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.gender"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="男">男</a-select-option>

            <a-select-option value="女">女</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="modalEditCol">
        <label>状态：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.useStatus"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="启用">启用</a-select-option>

            <a-select-option value="禁用">禁用</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>手机号：</label>
        <div>
          <a-input v-model:value="EditData.phone" placeholder="手机号" />
        </div>
      </div>
      <div class="modalEditCol">
        <label>E-mail：</label>
        <div>
          <a-input v-model:value="EditData.email" placeholder="E-mail" />
        </div>
      </div>
    </div>







    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>地址：</label>
        <div>
          <a-input v-model:value="EditData.address" placeholder="地址" />
        </div>
      </div>

      <div class="modalEditCol">
        <label>备注：</label>
        <div><a-input v-model:value="EditData.userDesc" placeholder="备注" /></div>
      </div>
    </div>



 <div class="modalEditRow">
      <div class="modalEditCol">
        <label>PC端登录：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.pcLoginStatus"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="允许">允许</a-select-option>

            <a-select-option value="禁止">禁止</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="modalEditCol">
        <label>微信端登录：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.weChatLoginStatus"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="允许">允许</a-select-option>

            <a-select-option value="禁止">禁止</a-select-option>
          </a-select>
        </div>
      </div>
    </div>

<div class="modalEditRow">
      <div class="modalEditCol">
        <label>App端登录：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.appLoginStatus"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="允许">允许</a-select-option>

            <a-select-option value="禁止">禁止</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="modalEditCol">
       
      </div>
    </div>











  </a-modal>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs,ref,onMounted,watch } from 'vue'
import { UserDataEntity,IUserInfo } from "../TypeInterface/IUserInterface";
export default defineComponent({
      props: { UserData: UserDataEntity,
       visiblea:Boolean,modalTitles: String,},
    setup (props,context) {
        const state = reactive({
            count: 0,
        })
          let visible = ref<boolean>(props.visiblea);
          let modalTitlee = ref<string|undefined>(props.modalTitles);
           const EditData:IUserInfo=props.UserData?.EditData as IUserInfo;
          

 const handleOk = (e: MouseEvent) => {
      //console.log(e);
      if(modalTitlee.value=="新增【用户信息】")
      {
    context.emit("CreateInfoBtn",{ ...EditData });
      }else
      {
    context.emit("UpdateInfoBtn",{ ...EditData });
      }
  
    
    
    
    };
    const onCancel = (e: MouseEvent) => {
      //console.log(e);
   context.emit("closeMoadl");
    
    
    };
    watch(
      () => props.visiblea,
      (newValue) => {
           
         console.log(newValue)
          
            visible.value=newValue;
      }
    );
     watch(
      () => props.modalTitles,
      (newValue) => {
           
         console.log(newValue)
          
            modalTitlee.value=newValue;
      }
    );
        return {
            ...toRefs(state),visible,modalTitlee,handleOk,EditData,onCancel
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
.UserList .ant-modal-title {
  font-size: 16px;
  color: #1890ff !important;
  font-weight: 400;
}
</style>