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
            default: false,
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
    <v-btn depressed class="gold--text" v-bind="btnProps">
        <slot></slot>
    </v-btn>
</template>