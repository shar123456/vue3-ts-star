<template>
   <template v-if="iconMark=='<AppstoreOutlined/>'">
       <AppstoreOutlined/>
   </template>
 <template v-if="iconMark=='SettingOutlined'">
       <SettingOutlined />
   </template>
 <template v-if="iconMark=='FileWordOutlined'">
       <FileWordOutlined />
   </template>
 <template v-if="iconMark=='FileMarkdownOutlined'">
       <FileMarkdownOutlined />
   </template>



 <template v-if="iconMark=='SnippetsOutlined'">
       <SnippetsOutlined />
   </template>

 <template v-if="iconMark=='TrademarkCircleOutlined'">
       <TrademarkCircleOutlined />
   </template>

 <template v-if="iconMark=='TrademarkOutlined'">
       <TrademarkOutlined />
   </template>

 <template v-if="iconMark=='UserOutlined'">
       <UserOutlined />
   </template>
 <template v-if="iconMark==''||iconMark==undefined||iconMark=='默认'">
       <AppstoreOutlined />
   </template>

   
</template>

<script   lang="ts">
import { reactive, toRefs,defineComponent,ref } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  FullscreenOutlined,
  BellOutlined,
  SearchOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TrademarkCircleOutlined,SnippetsOutlined,TrademarkOutlined,FileWordOutlined,FileMarkdownOutlined
} from "@ant-design/icons-vue";
export default defineComponent({
    props: { IconStr:String,
       },
      components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    FullscreenOutlined,
    BellOutlined,
    SearchOutlined,
    AppstoreOutlined,
    SettingOutlined,
    TrademarkCircleOutlined,SnippetsOutlined,TrademarkOutlined,FileWordOutlined,FileMarkdownOutlined
  },
    setup (props) {
        const state = reactive({
            count: 0,
            iconMark : props.IconStr
        })
    
        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="scss" scoped>

</style>