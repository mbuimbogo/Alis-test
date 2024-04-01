<script setup lang="ts">
  import { computed, onMounted, ref, Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProductStore } from '../../stores/ProductsStore';
  import {
    useSnackbarStore,
    SNACKBAR_TYPE_SUCCESS,
    SNACKBAR_TYPE_ERROR,
  } from '../../stores/SnackbarStore';

  //store refs

  const Router = useRouter();
  const route = useRoute();
  const store = useProductStore();
  const product = ref(null);
  const loading: Ref<boolean> = ref(true);
  const deleteConfirmationDialog: Ref<boolean> = ref(false);
  const snackbarStore = useSnackbarStore();

  const resourceTitle = computed(() => {
    return `Resource ${Router.currentRoute.value.params.resourceId}`;
  });

  //functions

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
      // Show success message in snackbar
      snackbarStore.toggleSnackbar(
        SNACKBAR_TYPE_SUCCESS,
        'Product deleted successfully',
      );
      // Navigate back to the product list upon successful deletion
      Router.push('/resources');
    } else {
      snackbarStore.toggleSnackbar(
        SNACKBAR_TYPE_ERROR,
        'Failed to delete product',
      );
    }
  };

  function confirmDelete() {
    deleteConfirmationDialog.value = true;
  }

  // handle the deletion after confirmation
  async function handleDeleteConfirmation() {
    // Close the dialog
    deleteConfirmationDialog.value = false;
    await deleteProduct();
  }

  //onMounted
  onMounted(async () => {
    loading.value = true;
    setTimeout(() => (loading.value = false), 3000);
    const productId = +route.params.resourceId;
    product.value = await store.getProductById(productId);
  });
</script>

<template>
  <v-card
    class="h-100 md:h-70 w-100 overflow-y-auto justify-center align-center"
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
      <v-row
        v-if="product"
        class="d-flex justify-center align-center h-100"
      >
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

          <p class="mb-4">Description: {{ product.description }}</p>
          <p class="mb-4">Discount: {{ product.discountPercentage }}%</p>
          <p class="mb-4">Category: {{ product.category }}</p>
          <p class="mb-4">Brand:{{ product.brand }}</p>
          <p class="mb-4">No of Items: {{ product.stock }}</p>

          <v-btn
            variant="tonal"
            class="mt-6"
            @click="confirmDelete"
            >Delete Product</v-btn
          >
        </v-col>
      </v-row>
      <v-dialog
        v-model="deleteConfirmationDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title class="text-h5">Confirm Deletion</v-card-title>
          <v-card-text>
            Delete this product? This action cannot be
            undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              @click="deleteConfirmationDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="red darken-1"
              @click="handleDeleteConfirmation"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-card>
</template>

<style scoped lang="scss"></style>
