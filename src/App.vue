<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Header from '@/components/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
    Header,
  },

  data: () => ({
    //
  }),
});
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>
