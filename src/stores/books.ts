import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '../types';

export const useBookStore = defineStore('books', () => {
  const books = ref<Book[]>([]);
  const loading = ref(false);

  async function fetchBooks() {
    loading.value = true;
    try {
      const response = await axios.get('/api/books');
      books.value = response.data;
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    books,
    loading,
    fetchBooks
  };
});