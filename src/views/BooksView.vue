<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Library Books</h1>

    <div v-if="loadingBooks || loadingLoans" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="book in books" :key="book.id" class="bg-white overflow-hidden shadow rounded-lg p-4">
        <h3 class="text-lg font-medium text-gray-900">{{ book.title }}</h3>
        <div class="mt-2">
          <span v-if="isLoaned(book.id)" class="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Loaned
          </span>
          <span v-else class="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Available
          </span>
        </div>
        <div class="mt-2 text-sm text-gray-500">
          <p>Author : {{ book.author.first_name }} {{ book.author.last_name }}</p>
          <p>Description : {{ book.description }}</p>
          <p>Language : {{ book.language }}</p>
          <p>Editor : {{ book.publisher }}</p>
          <p>Publication Year: {{ book.publishDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useBookStore } from '../stores/books';
import { useLoanStore } from '../stores/loans';
import { storeToRefs } from 'pinia';

const bookStore = useBookStore();
const loanStore = useLoanStore();

const { books, loading: loadingBooks } = storeToRefs(bookStore);
const { loans, loading: loadingLoans } = storeToRefs(loanStore);

onMounted(() => {
  bookStore.fetchBooks();
  loanStore.fetchLoans();
});

function isLoaned(bookId: string | undefined): boolean {
  if (!bookId) return false;

  const now = new Date();

  return loans.value.some(loan => {
    const start = new Date(loan.loanDate);
    const end = new Date(loan.returnDate);

    return loan.book_id === bookId && now >= start && now <= end;
  });
}




</script>
