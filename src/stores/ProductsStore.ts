import { defineStore } from "pinia";

export const useProductStore = defineStore('products', {
  state: () => ({
    products: { products: []},
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        this.products = await response.json()

      } catch (error) {
        this.setError(error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(productId) {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      this.isLoading = true;
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        // Remove the deleted product from the local state
        this.products = this.products.filter(product => product.id !== productId);

        return true;
      } catch (error) {
        console.error(`Failed to delete product with ID: ${productId}`, error);
        this.setError(error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  

    async getProductById(productId) {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const existingProduct = this.products.products.find((p) => p.id === productId);
      if (existingProduct) {
        return existingProduct;
      }

      this.isLoading = true;
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const product = await response.json();
        
        const updatedProducts = {
          ...this.products,
          products: [ ...this.products.products, product]
        };
        this.products = updatedProducts;

        return product;
      } catch (error) {
        console.error(`Failed to fetch product with ID: ${productId}`, error);
        this.setError(error);
      } finally {
        this.isLoading = false;
      }
    },

    setError(error) {
      this.error = error;
      console.error('Error:', error);
    },
  },
});
