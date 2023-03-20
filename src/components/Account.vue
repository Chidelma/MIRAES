<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import Break from './Break.vue';
    import GoldBtn from './GoldBtn.vue';
    import SubmitBtn from './SubmitBtn.vue';
    import { get } from 'svelte/store';
    import { auth } from '../scripts/Init';

    export default defineComponent({
        components: { Break, GoldBtn, SubmitBtn },
        setup() {

            const firstName = ref(get(auth).getUser().getName());

            const userRole = ref(get(auth).getUser().getRole());

            const canViewItems = ref(userRole.value.canViewItems());
            const canViewOrders = ref(userRole.value.canViewOrders());
            const canViewUsers = ref(userRole.value.canViewUsers());

            async function signOut() {
                await get(auth).signOut();
                auth.set(get(auth));
            }

            return {
                firstName,
                userRole,
                canViewItems,
                canViewOrders,
                canViewUsers,
                signOut
            }
        }
    })
</script>

<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header>
                Hi {{ firstName }}!
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <GoldBtn block>Profile</GoldBtn>
                <Break :rows="5" />
                <GoldBtn block>My Orders</GoldBtn>
                <Break :rows="10" />
                <GoldBtn v-if="canViewItems" block>View Products</GoldBtn>
                <Break :rows="5" />
                <GoldBtn v-if="canViewOrders" block>View Orders</GoldBtn>
                <Break :rows="5" />
                <GoldBtn v-if="canViewUsers" block>View Users</GoldBtn>
                <Break :rows="10" />
                <SubmitBtn @click.native="signOut()" block>Sign Out</SubmitBtn>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
