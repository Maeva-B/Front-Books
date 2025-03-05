import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Loan } from '../types';

export const useLoanStore = defineStore('loans', () => {
  const loans = ref<Loan[]>([]);
  const loading = ref(false);

  const error = ref<string | null>(null);

  async function fetchBook(book_id: string) {
  }

  async function fetchLoans(adherentId?: string) {
    loading.value = true;
    error.value = null;
    loans.value = [];

    try {
      const params: Record<string, string> = {};
      if (adherentId) {
        params.adherent_id = adherentId;
      }

      const response = await axios.get('/loans', { params });
      const loansData = response.data;

      if (Array.isArray(loansData) && loansData.length === 0) {
        error.value = 'Aucun emprunt trouvé pour cet utilisateur.';
        return;
      }

      const enrichedLoans = await Promise.all(
        loansData.map(async (loan: any) => {
          const book = await fetchBook(loan.book_id);
          return { ...loan, book };
        })
      );
      loans.value = enrichedLoans;
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        error.value = 'Aucun emprunt trouvé (404).';
      } else {
        error.value = 'Erreur lors de la récupération des emprunts.';
      }
      console.error('Failed to fetch loans:', err);
    } finally {
      loading.value = false;
    }
  }

  return {
    loans,
    loading,
    error,
    fetchLoans
  };
});
