<!-- <script setup lang="ts">
  // Vue & Store imports
  import { computed, onMounted, ref, Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useSnackbarStore } from '../../stores/SnackbarStore';
import { useProductStore } from '../../stores/ProductsStore';

  // Define stores
  const Router = useRouter();

  // storeToRefs

  // Computed
  const resourceTitle = computed(() => {
    return `Resource ${Router.currentRoute.value.params.resourceId}`;
  });

  // Props
  const loading: Ref<boolean> = ref(true);

  // goBack
  function goBack() {
    Router.back();
  }

  const store = useProductStore()
  const product = ref(null)
  const route = useRoute();

  onMounted(async () => {
    loading.value = true;

    setTimeout(() => (loading.value = false), 3000);
    const productId = route.params.resourceId;
    product.value = await store.getProductById(productId)
  });
</script>

<template>
  <v-container
    class="h-100 overflow-auto"
    fluid
  >
    <template v-if="loading">
      <v-row class="d-flex justify-center align-center h-100">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-row>
    </template>
    <template v-else>
      <v-row class="py-3 pt-8 px-lg-10 px-md-6 px-2">
        <v-btn
          variant="text"
          @click="goBack"
          class="mr-3"
        >
          <v-icon> west </v-icon>
        </v-btn>

        <div class="text-headline">
          {{ resourceTitle }}
        </div>
        <v-row v-if="product">
          <v-col>
            <v-img :src="product.images[1]" />
            <h1>{{ product.title }}</h1>
            <p>{{ product.description }}</p>
            <p>Discount: {{ product.discountedPercentage }}%</p>
          </v-col>
        </v-row>
      </v-row>
    </template>
  </v-container>
</template>

<style scoped lang="scss"></style> -->

<template>
  <v-container class="h-100 overflow-auto" fluid>
    <template v-if="loading">
      <!-- Loading indicator -->
      <v-row class="d-flex justify-center align-center h-100">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-row>
    </template>
    <template v-else>
      <!-- Product details section -->
      <v-row class="py-3 pt-8 px-lg-10 px-md-6 px-2">
        <!-- Back button -->
        <v-btn variant="text" @click="goBack" class="mr-3">
          <v-icon>west</v-icon>
        </v-btn>
        <!-- Resource title -->
        <div class="text-headline">{{ resourceTitle }}</div>
      </v-row>
      <v-row v-if="product">
        <!-- Product details -->
        <v-col cols="12" md="6" class="mb-6">
          <!-- Product images carousel -->
          <v-carousel cycle hide-delimiters>
            <v-carousel-item v-for="(image, index) in product.images" :key="index">
              <v-img :src="image" class="mx-auto d-block" aspect-ratio="16/9"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" md="6">
          <!-- Product title -->
          <h1 class="mb-4">{{ product.title }}</h1>
          <!-- Product description -->
          <p class="mb-4">{{ product.description }}</p>
          <!-- Discount percentage -->
          <p class="mb-4">Discount: {{ product.discountPercentage }}%</p>
          <!-- Add other product details -->
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSnackbarStore } from '../../stores/SnackbarStore';
import { useProductStore } from '../../stores/ProductsStore';

const Router = useRouter();
const route = useRoute();
const store = useProductStore();
const product = ref(null);
const loading: Ref<boolean> = ref(true);

const resourceTitle = computed(() => {
  return `Resource ${Router.currentRoute.value.params.resourceId}`;
});

function goBack() {
  Router.back();
}

onMounted(async () => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 3000);
  const productId = route.params.resourceId;
  product.value = await store.getProductById(productId);
});
</script>

<style scoped lang="scss">
/* Add custom styles here if needed */
</style>
