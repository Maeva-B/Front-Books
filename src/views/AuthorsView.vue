<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Library Authors</h1>
    
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="author in authors" :key="author.id" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ author.first_name }} {{ author.last_name }}</h3>
          <div class="mt-2 text-sm text-gray-500">
            <p>Nationality: {{ author.nationality }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthorStore } from '../stores/authors';
import { storeToRefs } from 'pinia';

const authorsStore = useAuthorStore();
const { authors, loading } = storeToRefs(authorsStore);

onMounted(() => {
  authorsStore.fetchAuthors();
});
</script>