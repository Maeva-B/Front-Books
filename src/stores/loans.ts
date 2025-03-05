import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Loan } from '../types';

export const useLoanStore = defineStore('loans', () => {
  const loans = ref<Loan[]>([]);
  const loading = ref(false);

  const error = ref<string | null>(null);

  async function fetchBook(book_id: string) {
    try {
      const response = await axios.get(`/books/${book_id}`);
      const book = response.data;

      if (book.author_id) {
        try {
          const authorResponse = await axios.get(`/authors/${book.author_id}`);
          const author = authorResponse.data;
          book.author = {
            first_name: author.first_name,
            last_name: author.last_name
          };
        } catch (error) {
          console.error(`Failed to fetch author for book ${book_id}:`, error);
          book.author = { first_name: 'Unknown', last_name: '' };
        }
      }

      return book;
    } catch (error) {
      console.error(`Failed to fetch book with id ${book_id}:`, error);
      return null;
    }
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
          return { 
            id: loan._id,
            ...loan, book };
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

  async function createLoan(bookId: string, adherentId: string, loanDate: string, returnDate: string | null) {
    try {
      loading.value = true;
      error.value = null;

      const response = await axios.post('/loans/', {
        loanDate,
        returnDate,
        book_id: bookId,
        adherent_id: adherentId
      });

      loans.value.push(response.data);
    } catch (err: any) {
      error.value = 'Erreur lors de l’ajout de l’emprunt.';
      console.error('Failed to create loan:', err);
    } finally {
      loading.value = false;
    }
  }

  async function deleteLoan(loanId: string) {
    try {
      await axios.delete(`/loans/${loanId}`);
      loans.value = loans.value.filter(loan => loan.id !== loanId);
    } catch (err: any) {
      console.error('Erreur lors de la suppression de l’emprunt:', err);
    }
  }
  

  return {
    loans,
    loading,
    error,
    fetchLoans,
    createLoan,
    deleteLoan
  };
});
