import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Loan } from '../types';

export const useLoanStore = defineStore('loans', () => {
  const loans = ref<Loan[]>([]);
  const loading = ref(false);

  async function fetchLoans() {
    loading.value = true;
    try {
      const response = await axios.get('/loans');
      loans.value = response.data;
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    loans,
    loading,
    fetchLoans
  };
});