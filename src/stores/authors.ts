import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import type { Author } from '../types';

export const useAuthorStore = defineStore('authors', () => {
  const authors = ref<Author[]>([]);
  const loading = ref(false);
  const nationalityFilter = ref<string | null>(null);

  async function fetchAuthors(nationality?: string) {
    loading.value = true;
    try {
      const url = nationality ? `/authors/?nationality=${encodeURIComponent(nationality)}` : '/authors';
      const response = await axios.get(url);
      authors.value = response.data;
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    } finally {
      loading.value = false;
    }
  }

  const filteredAuthors = computed(() => {
    if (!nationalityFilter.value) return authors.value;
    return authors.value.filter(author => author.nationality === nationalityFilter.value);
  });

  return {
    authors,
    loading,
    fetchAuthors,
    nationalityFilter,
    filteredAuthors
  };
});
