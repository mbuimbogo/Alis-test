<script setup lang="ts">
  // Vue & store imports
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  // Import Components
  import AppNotificationsComponent from './AppNotificationsComponent.vue';

  // Define store and router
  const router = useRouter();

  // Computed
  const appTitle = computed(() => {
    switch (router.currentRoute.value.name) {
      case 'Resources':
        return 'Resources';
      default:
        return '';
    }
  });
</script>

<template>
  <v-app-bar
    elevation="0"
    class="px-4"
    color="background"
  >
    <template v-slot:append>
      <v-btn
        variant="flat"
        icon
        color="background"
      >
        <v-icon
          color="grey-darken-2"
          size="large"
        >
          help_outlined
        </v-icon>
      </v-btn>
      <AppNotificationsComponent></AppNotificationsComponent>
    </template>
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
