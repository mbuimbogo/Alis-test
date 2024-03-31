<script setup lang="ts">
  // Vue and store imports
  import { Ref, ref, onMounted, computed } from 'vue';
  import { useProductStore } from '../../stores/ProductsStore';
  import { useRouter } from 'vue-router';
  import { debounce } from 'vue-debounce';

  // Component Imports
  import ResourceCreateView from '../Resources/ResourceCreateView.vue';
  import { watch } from 'vue';
   
  // refs
  const store = useProductStore();
  const router = useRouter();
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 8;
  const selectedCategory = ref('');

  // onMounted
  // fetch products on component mount
  onMounted(() => {
    store.fetchProducts();
  });

  const debouncedSearch = debounce((value: string) => {
    searchProducts(value);
  }, 3000);

  // Watch for changes in the search query and debounce updates
  watch(searchQuery, (newValue: string) => {
    debouncedSearch(newValue);
  });

  const searchProducts = (value: string) => {
    searchQuery.value = value;
  };
  const viewProductDetails = (productId: number) => {
    router.push({ name: 'Resource', params: { resourceId: productId } });
  };

  const filteredProducts = computed(() => {
    if (!store.products) {
      return [];
    }

    const query = searchQuery.value.toLowerCase();
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter by search query and selected category
    return store.products
      .filter(
        (product) =>
          (product.title.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)) &&
          (!selectedCategory.value ||
            product.category === selectedCategory.value),
      )
      .slice(startIndex, endIndex);
  });

  //methods

  const changePage = (page: number) => {
    currentPage.value = page;
  };

  const getUniqueCategories = () => {
    // Use Set to store unique categories
    const categories = new Set();
    if (store.products) {
      store.products.forEach((product) => categories.add(product.category));
    }
    // Convert Set to array
    return Array.from(categories);
  };
</script>

<template>
  <v-container
    fluid
    class="h-100 overflow-auto"
  >
    <v-row
      class="w-100 pb-4 px-lg-14 px-md-10 px-6"
      dense
    >
      <v-col
        cols="12"
        md="8"
        lg="6"
        xl="4"
      >
        <div class="text-display">Resource List View</div>
        <div class="text-title mt-1">This is an example resource list view</div>
      </v-col>
      <v-col class="d-flex flex-row justify-end align-center">
        <ResourceCreateView></ResourceCreateView>
      </v-col>
    </v-row>
    <v-row class="pb-4 px-lg-14 px-md-10 px-6">
      <v-col
        cols="12"
        sm="8"
        lg="4"
      >
        <v-text-field
          v-model="searchQuery"
          label="Search"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        lg="2"
      >
        <v-select
          v-model="selectedCategory"
          :items="getUniqueCategories()"
          label="Select Category"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="overflow-auto px-lg-14 px-md-10 px-16 text-center">
      <template v-if="store.isLoading">
        <v-progress-linear
          class="w-100"
          color="primary"
          indeterminate
        />
      </template>
      <template v-else>
        <!-- Filtered Products -->
        <template v-if="filteredProducts.length > 0">
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            @click="viewProductDetails(product.id)"
          >
            <v-card
              hover
              class="px-3 py-2 box-border"
            >
              <v-img
                :src="product.thumbnail"
                height="200px"
              />
              <v-card-title class="text-left">{{ product.title }}</v-card-title>
              <v-card-subtitle class="text-left"
                >Brand: {{ product.brand }}</v-card-subtitle
              >
              <v-card-text class="text-left"
                >Price: ${{ product.price }}</v-card-text
              >
              <v-card-actions>
                <v-btn
                  variant="tonal"
                  class="px-3"
                  @click="viewProductDetails(product.id)"
                  >View Details</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
        <template v-else-if="filteredProducts.length === 0">
          <v-row class="px-lg-14 px-md-10 px-6 justify-center">
            <v-col cols="12">
              <div class="text-center">
                The product with the term "{{ searchQuery }}" does not exist.
              </div>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <v-col
            v-for="product in store.products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            @click="viewProductDetails(product.id)"
          >
            <v-card
              hover
              class="px-3 py-2 box-border"
            >
              <v-img
                :src="product.thumbnail"
                height="200px"
              />
              <v-card-title class="text-left">{{ product.title }}</v-card-title>
              <v-card-subtitle class="text-left"
                >Brand: {{ product.brand }}</v-card-subtitle
              >
              <v-card-text class="text-left"
                >Price: ${{ product.price }}</v-card-text
              >
              <v-card-actions>
                <v-btn
                  variant="tonal"
                  class="px-3"
                  @click="viewProductDetails(product.id)"
                  >View Details</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </template>
    </v-row>
    <!-- Pagination -->
    <v-row
      class="px-lg-14 px-md-10 px-6 justify-center"
      v-if="
        filteredProducts.length > itemsPerPage ||
        store.products.length > itemsPerPage
      "
    >
      <v-pagination
        v-model="currentPage"
        :length="
          Math.ceil(
            filteredProducts.length > 0
              ? filteredProducts.length
              : store.products.length / itemsPerPage,
          )
        "
        @input="changePage"
        color="primary"
        variant="tonal"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
