<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
    props: {
        width: {
            type: String,
            default: '100%'
        },
        label: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        icon: {
            type: String,
            default: ''
        },
        dense: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const inputProps = computed(() => {
            return { dense: props.dense }
        })

        return {
            inputProps
        }
    }
})
</script>

<template>
    <v-text-field filled :prepend-inner-icon="icon" v-bind="inputProps" :label="label" color="gold" :style="[`width: ${width}`]" :type="type" v-on:input="$emit('input', $event)"></v-text-field>
</template>