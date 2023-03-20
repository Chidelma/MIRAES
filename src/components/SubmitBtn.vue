<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
    props: {
        size: {
            type: String,
            default: 'normal'
        },
        block: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {

        const btnProps = computed(() => {
            return { [props.size]: true, block: props.block }
        })

        return {
            btnProps
        }
    }
})
</script>

<template>
    <v-btn v-if="!loading" text color="gold" v-bind="btnProps">
        <slot></slot>
    </v-btn>
    <div v-else class="text-center">
        <v-progress-circular indeterminate color="gold"></v-progress-circular>
    </div>
</template>