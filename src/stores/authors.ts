import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Author } from '../types';

export const useAuthorStore = defineStore('authors', () => {
  const authors = ref<Author[]>([]);
  const loading = ref(false);

  async function fetchAuthors() {
    loading.value = true;
    try {
      const response = await axios.get('/authors');
      authors.value = response.data;
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    authors,
    loading,
    fetchAuthors
  };
});
