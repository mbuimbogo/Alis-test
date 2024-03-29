
<template>
  <v-container
    class="h-100 overflow-auto"
    fluid
  >
    <template v-if="loading">
      <!-- Loading indicator -->
      <v-row class="d-flex justify-center align-center h-100">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-row>
    </template>
    <template v-else>
      <!-- Product details section -->
      <v-row class="py-3 pt-8 px-lg-10 px-md-6 px-2">
        <!-- Back button -->
        <v-btn
          variant="text"
          @click="goBack"
          class="mr-3"
        >
          <v-icon>west</v-icon>
        </v-btn>
        <!-- Resource title -->
        <div class="text-headline">{{ resourceTitle }}</div>
      </v-row>
      <v-row v-if="product">
        <!-- Product details -->
        <v-col
          cols="12"
          md="6"
          class="mb-4"
        >
          <!-- Product images carousel -->
          <v-carousel
            cycle
            hide-delimiters
          >
            <v-carousel-item
              v-for="(image, index) in product.images"
              :key="index"
            >
              <v-img
                :src="image"
                class="mx-auto d-block"
                aspect-ratio="16/9"
              ></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        <v-rating
        v-model="product.rating"
        :half-increments="true"
        readonly
        color="yellow"
        background-color="grey lighten-2"
      ></v-rating>
          <h1 class="mb-4">{{ product.title }}</h1> 

          <p class="mb-4">{{ product.description }}</p>
          <p class="mb-4">Discount: {{ product.discountPercentage }}%</p>
          <p class="mb-4">Category: {{ product.category }}</p>
          <p class="mb-4">Brand:{{ product.brand }}</p>
          <p class="mb-4">No of Items: {{ product.stock }}</p>

        </v-col>
      </v-row>
    </template>
    <v-btn @click="deleteProduct">Delete Product</v-btn>

  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
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


  const deleteProduct = async () => {
    if (!product.value || !product.value.id) {
      return;
    }

    const productId = product.value.id;
    const isDeleted = await store.deleteProduct(productId);

    if (isDeleted) {
      // Navigate back to the product list upon successful deletion
      Router.push('/resources');
      console.log(`item deleted ${productId}`)
    } else {

    }
  };

  onMounted(async () => {
    loading.value = true;
    setTimeout(() => (loading.value = false), 3000);
    const productId = route.params.resourceId;
    product.value = await store.getProductById(productId);
  });
</script>

<style scoped lang="scss">
</style>
