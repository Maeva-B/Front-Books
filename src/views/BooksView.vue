<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Library Books</h1>
    
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="book in books" :key="book.id" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ book.title }}</h3>
          <div class="mt-2 text-sm text-gray-500">
            <p>Author: {{ book.author }}</p>
            <p>ISBN: {{ book.isbn }}</p>
          </div>
          <div class="mt-4">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                book.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              ]"
            >
              {{ book.available ? 'Available' : 'Borrowed' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBookStore } from '../stores/books';
import { storeToRefs } from 'pinia';

const bookStore = useBookStore();
const { books, loading } = storeToRefs(bookStore);

onMounted(() => {
  bookStore.fetchBooks();
});
</script>