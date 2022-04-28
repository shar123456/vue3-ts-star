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
        <label>菜单Id：</label>
        <div><a-input v-model:value="EditData.menuId" placeholder="菜单Id"
        disabled="true" /></div>
      </div>
      <div class="modalEditCol">
        <label>名称：</label>
        <div>
          <a-input v-model:value="EditData.menuTitle" placeholder="名称" />
        </div>
      </div>
    </div>
    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>Url</label>
        <div>
          <a-input v-model:value="EditData.menuUrl" placeholder="Url" />
        </div>
      </div>
      <div class="modalEditCol">
        <label>序号</label>
        <div>
          <a-input v-model:value="EditData.menuorder" placeholder="序号" />
        </div>
      </div>
    </div>

    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>等级：</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.menuLevel"
            style="width: 150px"   disabled="true"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="1">一级</a-select-option>

            <a-select-option value="2">二级</a-select-option>
            <a-select-option value="3">三级</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="modalEditCol">
        <label>Icon</label>
        <div>
          <a-select
            ref="select"
            v-model:value="EditData.menuIcon"
            style="width: 150px"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="AppstoreOutlined">AppstoreOutlined</a-select-option>
            <a-select-option value="AppstoreOutlined">AppstoreOutlined</a-select-option>
              <a-select-option value="AppstoreOutlined">AppstoreOutlined</a-select-option>
                 <a-select-option value="AppstoreOutlined">AppstoreOutlined</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="modalEditRow">
      <div class="modalEditCol">
        <label>是否有子菜单{{EditData.hasSub}}</label>
       <div>
          <a-select
            ref="select"
            v-model:value="EditData.hasSub"
            style="width: 150px"   disabled="true"
          >
            <a-select-option value="未选择">未选择</a-select-option>
            <a-select-option value="是">是</a-select-option>
            <a-select-option value="否">否</a-select-option>
         
          </a-select>
        </div>
      </div>
      <div class="modalEditCol">
        <label>菜单父级Id：</label>
        <div>
          <a-input  disabled="true"  v-model:value="EditData.menuParentId" placeholder="菜单父级Id" />
        </div>
      </div>
    </div>

   
  </a-modal>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs,ref,onMounted,watch } from 'vue'
import { MenuDataEntity,IMenuInfo } from "../TypeInterface/IMenuInterface";
export default defineComponent({
      props: { MenuData: MenuDataEntity,
       visibleMenu:Boolean,modalTitlesMenu: String,},
    setup (props,context) {
        const state = reactive({
            count: 0,
        })
          let visible = ref<boolean>(props.visibleMenu);
          let modalTitlee = ref<string|undefined>(props.modalTitlesMenu);
           const EditData:IMenuInfo=props.MenuData?.EditData as IMenuInfo;
          

 const handleOk = (e: MouseEvent) => {
     
    context.emit("UpdateMenuInfoBtn",{ ...EditData });
      
  
    
    
    
    };
    const onCancel = (e: MouseEvent) => {
      //console.log(e);
   context.emit("closeMenuMoadl");
    
    
    };
    watch(
      () => props.visibleMenu,
      (newValue) => {
           
         console.log("visibleMenu",newValue)
          
            visible.value=newValue;
      }
    );
     watch(
      () => props.modalTitlesMenu,
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