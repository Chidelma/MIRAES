<script lang="ts">
    import { defineComponent } from '@vue/composition-api';

    export default defineComponent({
        props: {
            rows: {
                type: Number,
                default: 1
            }
        }
    })
</script>

<template>
    <div>
        <v-divider v-for="i in rows" :key="i" :style="rows > 1 ? 'opacity: 0' : ''"></v-divider>
    </div>
</template>