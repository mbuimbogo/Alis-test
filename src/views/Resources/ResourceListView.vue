<script setup lang="ts">
  // Vue and store imports
  import { Ref, ref, onMounted, computed } from 'vue';
  import { useProductStore } from '../../stores/ProductsStore';
  import { useRouter } from 'vue-router';
  import { debounce } from 'lodash';


  // Component Imports
  import ResourceCreateView from '../Resources/ResourceCreateView.vue';
import { watch } from 'vue';

  const store = useProductStore();
  const router = useRouter();
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = 8;

  
  // Refs
  // const loading: Ref<boolean> = ref(false);

  // onMounted
  // fetch products on component mount
  onMounted(()=> {
    store.fetchProducts();
  })

  // onMounted(async () => {
  //   loading.value = true;

  //   setTimeout(() => (loading.value = false), 3000);

  //   fetch('https://dummyjson.com/products')
  //     .then((res) => res.json())
  //     .then((json) => console.log(json));
  // });

  const debouncedSearch = debounce((value: string) => {
  searchQuery.value = value;
}, 300);

// Watch for changes in the search query and debounce updates
watch(searchQuery, (newValue: string) => {
  debouncedSearch(newValue);
});


  const viewProductDetails = (productId) => {
    router.push({ name: 'Resource', params: { resourceId: productId }});

  }

  // Filter products based on search query
// const filteredProducts = computed(() => {
//   const query = searchQuery.value.toLowerCase();
//   return store.products.products.filter(product => 
//     product.title.toLowerCase().includes(query) ||
//     product.brand.toLowerCase().includes(query)
//   );
// });
const filteredProducts = computed(() => {
  if (!store.products.products) {
    return [];
  }

  const query = searchQuery.value.toLowerCase();
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return store.products.products
    .filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    )
    .slice(startIndex, endIndex);
});


  const changePage = (page: number) => {
    currentPage.value = page;
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
      <v-col lg="4" >
        <v-text-field v-model="searchQuery" label="Search" outlined dense></v-text-field>
      </v-col>
    </v-row>
    <!-- <v-row class="w-100 mt-6 pb-4 px-lg-14 px-md-10 px-6">
      <v-col
        cols="12"
        sm="12"
        lg="12"
        class="text-body"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </v-col>
    </v-row> -->
    <v-row class="overflow-auto px-lg-14 px-md-10 px-16 text-center">
      <template v-if="store.isLoading">
        <v-progress-linear
          class="w-100"
          color="primary"
          indeterminate
        />
      </template>
      <template v-else> 
        <v-col 
        v-for="product in (filteredProducts || store.products.products)"
        :key="product.title"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        @click="viewProductDetails(product.id)"
        >
        <v-card>
          <v-img :src="product.thumbnail" height="200px" />
          <div class="text-title">{{ product.title }}</div>
          <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
          <v-card-text>${{ product.price }}</v-card-text>
          <v-card-actions>
            <v-btn text="Close" @click="viewProductDetails(product.id)">View Details</v-btn>
          </v-card-actions>
        </v-card>
          
        </v-col>
      </template>
    </v-row>
 <!-- Pagination -->
<v-row class="px-lg-14 px-md-10 px-6 justify-center" v-if="store.products.products">
  <v-pagination
    v-model="currentPage"
    :length="Math.ceil(store.products.products.length / itemsPerPage)"
    @input="changePage"
    color="primary"
  ></v-pagination>
</v-row>

  </v-container>
</template>

<style scoped lang="scss"></style>

