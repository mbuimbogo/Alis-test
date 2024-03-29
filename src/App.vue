<script lang="ts" setup>
  // Vue & Store Imports
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  // Component Imports
  import AppNavigationDrawerComponent from './components/App/AppNavigationDrawerComponent.vue';
  import AppSnackbarComponent from './components/App/AppSnackbarComponent.vue';
  import AppBarComponent from './components/App/AppBarComponent.vue';

  // Define Router
  const router = useRouter();

  // Computed

  // Only show the app bar when the it is not a resource view
  const showAppBar = computed(() => {
    return Object.entries(router.currentRoute.value.params).length === 0;
  });
</script>

<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <AppNavigationDrawerComponent></AppNavigationDrawerComponent>
      <AppBarComponent v-if="showAppBar"></AppBarComponent>

      <v-main class="d-flex h-screen overflow-auto align-center justify-center">
        <router-view></router-view>
        <AppSnackbarComponent></AppSnackbarComponent>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
  /* Inline code overrides 
      allows to use eg. <code> console.log('Hello World') </code>
      with nice styling
  */
  :not(pre) > code {
    border-radius: 4px;
    padding: 3px 6px;
    color: #476582;
    background-color: #f6f6f7;
  }
</style>
