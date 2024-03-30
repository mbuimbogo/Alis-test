import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  brand: string;
  thumbnail: string;
  images: [];
}

export const useProductStore = defineStore('products', () => {
  // State
  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const baseURL = 'https://dummyjson.com/products'

  // Actions
  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

     const responseJson = await response.json();
      products.value = responseJson.products;

    } catch (err) {
      setError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const addProduct = async (newProduct: Product) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseURL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const addedProduct = await response.json();
      products.value.push(addedProduct);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (productId) => {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    isLoading.value = true;
    try {
      const response = await fetch(
        `${baseURL}/${productId}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the deleted product from the local state
      products.value = products.value.filter(
        (product) => product.id !== productId,
      );

      return true;
    } catch (err) {
      console.error(`Failed to delete product with ID: ${productId}`, err);
      setError(err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const getProductById = async (productId) => {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const existingProduct = products.value.find(
      (p) => p.id === productId,
    );
    if (existingProduct) {
      return existingProduct;
    }

    isLoading.value = true;
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();

      products.value.push(product);

      return product;
    } catch (err) {
      console.error(`Failed to fetch product with ID: ${productId}`, err);
      setError(err);
    } finally {
      isLoading.value = false;
    }
  };

  // Helpers
  const setError = (err) => {
    error.value = err;
    console.error('Error:', err);
  };

  // Return the state, actions, and any other computed properties or getters
  return {
    products,
    isLoading,
    error,
    fetchProducts,
    deleteProduct,
    getProductById,
    addProduct,
  };
});
