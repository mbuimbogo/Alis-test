
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['click']);

const emitClick = () => {
  emit('click');
};
</script>


<template>
    <v-col cols="12" sm="6" md="4" lg="3" class="my-16">
      <v-card hover class="px-2 py-2 box-border">
        <v-img :src="product.thumbnail" height="200px" />
        <v-card-title class="text-left">{{ product.title }}</v-card-title>
        <v-card-subtitle class="text-left">Brand: {{ product.brand }}</v-card-subtitle>
        <v-card-text class="text-left">Price: ${{ product.price }}</v-card-text>
        <v-card-actions>
          <v-btn variant="tonal" class="px-3" @click.stop="emitClick">View Details</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </template>
  