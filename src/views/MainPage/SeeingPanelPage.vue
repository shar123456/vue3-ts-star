<template>
    <div>
eee
    </div>
</template>

<script lang="ts">
import { reactive, toRefs,defineComponent } from 'vue'

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