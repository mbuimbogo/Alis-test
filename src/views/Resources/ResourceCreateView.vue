<script setup lang="ts">
  // Vue & Store Imports
  import { type Ref, ref, onMounted } from 'vue';

  // Component Imports

  // Define Stores

  // Define Emits

  // Props

  // Ref Props
  const dialog: Ref<boolean> = ref(false);

  // Watchers

  // Functions

  // Functions
  // onMounted(() => {})
</script>

<template>
  <v-btn
    size="large"
    prepend-icon="add"
  >
    Create A Resource
    <v-dialog
      v-model="dialog"
      activator="parent"
      width="50%"
    >
      <v-card class="pt-2 px-2">
        <v-card-title>Create a new Resource</v-card-title>
        <v-card-subtitle>
          This is a standardised dialog to add a new resource.
        </v-card-subtitle>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false"> Cancel </v-btn>
          <v-btn
            text="Close"
            @click="dialog = false"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style lang="scss"></style>
