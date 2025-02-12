import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Loan } from '../types';

export const useLoanStore = defineStore('loans', () => {
  const loans = ref<Loan[]>([]);
  const loading = ref(false);

  async function fetchBook(book_id: string) {
    try {
      const response = await axios.get(`/books/${book_id}`);
      const book = response.data;
      const authorResponse = await axios.get(`/authors/${book.author_id}`);
      const author = authorResponse.data;
      book.author = {
        first_name: author.first_name,
        last_name: author.last_name
      };
      return book;
    } catch (error) {
      console.error(`Failed to fetch book with id ${book_id}:`, error);
      return null;
    }
  }

  async function fetchLoans() {
    loading.value = true;
    try {
      const response = await axios.get('/loans');
      const loansData = response.data;
      const enrichedLoans = await Promise.all(
        loansData.map(async (loan: any) => {
          const book = await fetchBook(loan.book_id);
          return { ...loan, book };
        })
      );
      loans.value = enrichedLoans;
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
