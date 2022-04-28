<template>
    
  <template >
     <!-- <a-menu-item key="/Home/HomePage"> -->
          <AppstoreOutlined />
          <!-- <span
            ><router-link
              to="/Home/HomePage"
              style="color: rgba(255, 255, 255, 0.65)"
              >首页</router-link
            ></span
          >
        </a-menu-item> -->

    </template>

</template>

<script lang="ts">
import { reactive, toRefs ,defineComponent} from 'vue'

export default defineComponent({
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="scss" scoped>

</style>