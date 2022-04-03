<template>
  <loading :can-cancel="true" :is-full-page="fullPage" v-model:active="isLoading" />
</template>

<script setup>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { useStore } from 'vuex';

const store = useStore();
const canCancel = ref(false);
const fullPage = ref(true);
const isLoading = ref(computed(() => store.state.loading));
</script>
