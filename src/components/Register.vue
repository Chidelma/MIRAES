<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import Input from './Input.vue';
    import SubmitBtn from './SubmitBtn.vue';
    import { _cart } from '../scripts/Models';
    import { auth, store } from '../scripts/Init';
    import { get } from 'svelte/store';

    export default defineComponent({
        components: { Input, SubmitBtn },
        setup() {

            const firstName = ref('');
            const lastName = ref('');
            const email = ref('');
            const password = ref('');
            const conPassword = ref('');
            const loading = ref(false);

            const verify = ref(false);

            async function addToStore() {

                let allAdded = false;

                if(get(auth).isAuth()) {
    
                    if(await store.addData("USERS", get(auth).getUser().getUserPrim())) {
        
                        const storeCart: _cart = {
                            id: get(auth).getUser().getId(),
                            items: [] 
                        }
        
                        if(await store.addData("CARTS", storeCart)) {
        
                            if(await store.addData("ROLES", get(auth).getUser().getRole().getRolePrime()))
                                allAdded = true;
                        }
                    }
                }

                return allAdded;
            }
            

            async function userRegister() {

                if(firstName.value !== "" && lastName.value !== "" && email.value !== "" && password.value !== "" && conPassword.value !== "") {
    
                    if(password === conPassword) {

                        loading.value = true;
        
                        if(await get(auth).signUp(email.value, password.value)) {
        
                            const changed = await get(auth).updateProfile(firstName + ' ' + lastName, "https://api.hello-avatar.com/adorables/" + email);
        
                            if(changed) {
        
                                if(await addToStore()) {
        
                                    if(await get(auth).sendEmailVerification()) {

                                        firstName.value = '';
                                        lastName.value = '';
                                        email.value = '';
                                        password.value = '';
                                        conPassword.value = '';

                                        verify.value = true;
                                    }
                                }
                            }
                        }

                        loading.value = false;
                    }
                }
            }

            async function resendVerification() {
                await get(auth).sendEmailVerification();
            }

            return {
                firstName,
                lastName,
                email,
                password,
                conPassword,
                userRegister,
                addToStore,
                verify,
                resendVerification,
                loading
            }
        }
    })
</script>

<template>
    <div v-if="verify" class="register">
        <p align="center">Please Check Your Email For Verification</p>
        <SubmitBtn @click.native="resendVerification()">Resend</SubmitBtn>
    </div>
    <div v-else class="register">
        <Input label="First Name" v-model="firstName" />
        <Input label="Last Name" v-model="lastName" />
        <Input label="Email" v-model="email" />
        <Input label="Password" type="password" v-model="password" />
        <Input label="Confirm Password" type="password" v-model="conPassword" />
        <SubmitBtn @click.native="userRegister()" :loading="loading">Register</SubmitBtn>
    </div>
</template>

<style scoped>
    .register {
        padding: 10px;
    }
</style>