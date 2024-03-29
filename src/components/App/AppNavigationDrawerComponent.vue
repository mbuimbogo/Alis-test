<script setup lang="ts">
  // Vue imports
  import { Ref, ref } from 'vue';
  import { useRoute } from 'vue-router';

  // Import Components
  import Logo from '../../assets/alis_exchange_favicon.png';
  import alisLogo from '../../assets/alis_exchange_favicon.png';

  // Define Router & stores
  const route = useRoute();

  // Refs

  // Navigation Drawer open/close logic
  const drawer: Ref<boolean> = ref(true);

  // Functions

  function isPath(btnPath: string): boolean {
    return route.path.includes(btnPath);
  }
</script>

<template>
  <v-navigation-drawer
    color="background"
    rail
    rail-width="88"
    floating
    permanent
    class="h-screen"
  >
    <v-list>
      <v-list-item>
        <v-avatar size="32">
          <v-img :src="Logo"></v-img>
        </v-avatar>
      </v-list-item>
    </v-list>
    <v-list
      density="compact"
      nav
    >
      <v-list-item>
        <v-btn
          :variant="isPath('resources') ? 'tonal' : 'text'"
          to="/resources"
        >
          <v-icon> style </v-icon>
        </v-btn>
        Resources
      </v-list-item>
    </v-list>
    <template #append>
      <v-list>
        <v-list-item>
          <a
            href="https://www.alisx.com"
            target="_blank"
          >
            <v-img
              :src="alisLogo"
              :height="32"
            ></v-img>
          </a>
          <span
            class="text-grey"
            style="font-size: 10px"
          >
            Powered by Alis Build
          </span>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
