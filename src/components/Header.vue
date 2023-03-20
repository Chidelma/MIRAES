<script lang="ts">
    import { defineComponent, ref, computed } from '@vue/composition-api';
    import { allCategories } from '../scripts/Shares'
    import GoldBtn from './GoldBtn.vue';
    import Break from './Break.vue';
    import Login from './Login.vue';
    import Register from './Register.vue';
    import Input from './Input.vue';
    import Account from './Account.vue';
    import { auth } from '../scripts/Init';
    import { get } from 'svelte/store';

    export default defineComponent({
        components: {
            GoldBtn,
            Break,
            Login,
            Register,
            Input,
            Account
        },
        setup() {

            const group = ref(null);
            const leftDrawer = ref(false);
            const rightDrawer = ref(false);
            const showLogin = ref(false);
            const showRegister = ref(false);

            const width = computed(() => (screen.width));

            const isAuth = ref(get(auth).isAuth());

            auth.subscribe(value => {
                isAuth.value = value.isAuth();
            });

            function toggleLogin() {
                showRegister.value = false;
                showLogin.value = !showLogin.value;
            }

            function toggleRegister() {
                showLogin.value = false;
                showRegister.value = !showRegister.value;
            }

            return { 
                isAuth,
                width,
                leftDrawer, 
                group, 
                allCategories, 
                rightDrawer, 
                showLogin, 
                showRegister,
                toggleLogin,
                toggleRegister
            }
        }
    })
</script>

<template>
    <div>
        <v-navigation-drawer v-model="leftDrawer" absolute temporary>
            <Input label="Search" icon="mdi-magnify" />
            <v-list nav dense>
                <v-list-item-group v-model="group">
                    <v-list-item v-for="cate in allCategories" :key="cate">
                        <v-list-item-title class="gold--text">{{ cate }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app>
            <v-row>
                <v-col lg="1">
                    <GoldBtn size="x-large" @click.native="leftDrawer = !leftDrawer">
                        <v-icon>mdi-menu</v-icon>
                    </GoldBtn>
                </v-col>
                <v-col lg="10" class="d-flex flex-column align-center">
                    <v-img src="../assets/logo200.png" max-height="80" max-width="200"></v-img>
                </v-col>
                <v-col lg="1">
                    <GoldBtn size="x-large" @click.native="rightDrawer = !rightDrawer">
                        <v-icon>mdi-cart</v-icon>
                    </GoldBtn>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-navigation-drawer v-model="rightDrawer" absolute temporary right>
            <Break :rows="10"/>
            <Account v-if="isAuth" />
            <v-row v-if="!isAuth">
                <v-col class="d-flex flex-column align-center">
                    <GoldBtn @click.native="toggleLogin()">Sign In</GoldBtn>
                </v-col>
                <v-col>
                    <GoldBtn @click.native="toggleRegister()">Register</GoldBtn>
                </v-col>
            </v-row>
            <p v-if="isAuth"></p>
            <Break :rows="10"/>
            <Login v-if="showLogin && !isAuth" />
            <Register v-if="showRegister && !isAuth" />
            <v-list nav dense>
                <v-list-item-group v-model="group">
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>