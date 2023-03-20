<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import Input from './Input.vue';
    import SubmitBtn from './SubmitBtn.vue'
    import { get } from 'svelte/store';
    import { auth, setAllUsers } from '../scripts/Init';

    export default defineComponent({
        components: { Input, SubmitBtn },
        setup() {

            const email = ref('');
            const password = ref('');
            const loading = ref(false);

            async function loginUser() {

                if(email.value !== "" && password.value !== "") {

                    loading.value = true;
                    
                    if(await get(auth).signIn(email.value, password.value)) {

                        if(get(auth).getUser().getRole().canViewUsers())
                            await setAllUsers();

                        auth.set(get(auth));

                        email.value = '';
                        password.value = '';
                    }

                    loading.value = false
                }
            }

            return { loginUser, email, password, loading }
        }
    })
</script>

<template>
    <div class="login">
        <Input label="Email" v-model="email" />
        <Input label="Password" type="password" v-model="password" />
        <SubmitBtn @click.native="loginUser()" block :loading="loading">Login</SubmitBtn>
        <p align="center">Forgot Password?</p>
    </div>
</template>

<style scoped>
    .login {
        padding: 10px;
    }
</style>