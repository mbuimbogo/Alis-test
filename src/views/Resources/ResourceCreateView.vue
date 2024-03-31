<script setup lang="ts">
  // Vue & Store Imports
  import { ref, computed, Ref } from 'vue';
  import { useProductStore } from '../../stores/ProductsStore';
  import {
    useSnackbarStore,
    SNACKBAR_TYPE_SUCCESS,
    SNACKBAR_TYPE_ERROR,
  } from '../../stores/SnackbarStore';

  // Define Ref Props
  const productForm = ref({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    category: '',
    brand: '',
    thumbnail: '',
    images: [],
  });

  // Get the product and snackbar stores
  const productStore = useProductStore();
  const snackbarStore = useSnackbarStore();

  // Ref Props
  const dialog: Ref<boolean> = ref(false);
  const imageUrlInput = ref('');

  //Functions
  // Function to add an image URL to the images array
  const addImage = () => {
    if (imageUrlInput.value.trim() !== '') {
      productForm.value.images.push(imageUrlInput.value);
      imageUrlInput.value = '';
    } else {
      snackbarStore.toggleSnackbar(
        SNACKBAR_TYPE_ERROR,
        'Please enter an image URL.',
      );
    }
  };

  const removeImage = (index: number) => {
    productForm.value.images.splice(index, 1);
  };

  // Form validation
  const isFormValid = computed(() => {
    const form = productForm.value;
    const allStringsFilled =
      form.title.trim() !== '' &&
      form.description.trim() !== '' &&
      form.category.trim() !== '' &&
      form.brand.trim() !== '' &&
      form.thumbnail.trim() !== '';
    const allNumbersValid =
      form.price > 0 &&
      form.discountPercentage >= 0 &&
      form.discountPercentage <= 100 &&
      form.rating >= 0 &&
      form.rating <= 5 &&
      form.stock >= 0;

    const hasImages = form.images.length > 0;

    // Return true if all conditions are met
    return allStringsFilled && allNumbersValid && hasImages;
  });

  // Function to handle form submission
  const submitProduct = async () => {
    if (!isFormValid.value) {
      snackbarStore.toggleSnackbar(
        SNACKBAR_TYPE_ERROR,
        'Please fill in all required fields.',
      );
      return;
    }

    try {
      await productStore.addProduct(productForm.value);
      // Close the dialog on success
      dialog.value = false;
      snackbarStore.toggleSnackbar(
        SNACKBAR_TYPE_SUCCESS,
        'Product added successfully.',
      );
    } catch (error) {
      console.error('Failed to add product:', error);
      snackbarStore.toggleSnackbar(
        SNACKBAR_TYPE_ERROR,
        'Failed to add product.',
      );
    }
    productForm.value = {
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      category: '',
      brand: '',
      thumbnail: '',
      images: [],
    };
  };
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
      width="30%"
      class="pb-4"
    >
      <v-card class="pt-2 px-2">
        <v-card-title>Create a new Resource</v-card-title>
        <v-card-subtitle>
          This is a standardised dialog to add a new resource.
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Title"
              v-model="productForm.title"
            />
            <v-text-field
              label="Price"
              v-model.number="productForm.price"
              type="number"
            />
            <v-text-field
              label="Discount Percentage"
              v-model.number="productForm.discountPercentage"
              type="number"
            />
            <v-text-field
              label="Rating"
              v-model.number="productForm.rating"
              type="number"
            />
            <v-text-field
              label="Stock"
              v-model.number="productForm.stock"
              type="number"
            />
            <v-text-field
              label="Category"
              v-model="productForm.category"
            />
            <v-text-field
              label="Brand"
              v-model="productForm.brand"
            />
            <v-text-field
              label="Thumbnail URL"
              v-model="productForm.thumbnail"
            />
            <v-text-field
              label="Image URL"
              v-model="imageUrlInput"
            />
            <v-btn
              @click="addImage"
              class="mb-3"
              >Add Image</v-btn
            >

            <!-- List of added images -->
            <div
              v-for="(image, index) in productForm.images"
              :key="index"
              class="my-2"
            >
              <v-chip
                close
                @click:close="removeImage(index)"
              >
                {{ image }}
              </v-chip>
            </div>
            <v-textarea
              label="Description"
              v-model="productForm.description"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn
            variant="tonal"
            color="primary"
            @click="submitProduct"
            >Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style lang="scss"></style>
