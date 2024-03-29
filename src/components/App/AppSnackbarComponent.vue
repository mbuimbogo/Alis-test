<template>
  <v-snackbar
    v-model="snackbarStore.showSnackbar"
    min-width="700"
    :timeout="5000"
    :color="color"
    variant="tonal"
    rounded
  >
    <div class="d-flex h-100 align-center">
      <div class="h-100 d-flex align-center justify-center mr-8">
        <v-icon>
          {{ icon }}
        </v-icon>
      </div>
      <div class="flex-fill">
        {{ message }}
      </div>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
  // Vue & Store imports
  import { useSnackbarStore } from '../../stores/SnackbarStore';
  import { computed } from 'vue';

  // Define store
  const snackbarStore = useSnackbarStore();

  // Computed Properties
  const color = computed(() => {
    return snackbarStore.snackbarColor;
  });
  const message = computed(() => {
    return snackbarStore.snackbarMessage;
  });
  const icon = computed(() => {
    return snackbarStore.snackbarIcon;
  });
</script>
