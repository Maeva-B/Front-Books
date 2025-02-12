<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Library Authors</h1>

    <div class="mb-6">
      <label for="nationality" class="block text-sm font-medium text-gray-700">Filter by Nationality:</label>
      <select
        id="nationality"
        v-model="authorsStore.nationalityFilter"
        @change="fetchFilteredAuthors"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">All</option>
        <option v-for="nationality in uniqueNationalities" :key="nationality" :value="nationality">
          {{ nationality }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="author in authorsStore.filteredAuthors" :key="author.id" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ author.first_name }} {{ author.last_name }}
          </h3>
          <div class="mt-2 text-sm text-gray-500">
            <p>Nationality: {{ author.nationality }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthorStore } from '../stores/authors';
import { storeToRefs } from 'pinia';

const authorsStore = useAuthorStore();
const { loading } = storeToRefs(authorsStore);

const uniqueNationalities = computed(() => {
  const nationalities = authorsStore.authors.map(author => author.nationality);
  return [...new Set(nationalities)].sort();
});

const fetchFilteredAuthors = () => {
  authorsStore.fetchAuthors(authorsStore.nationalityFilter || undefined);
};

onMounted(() => {
  authorsStore.fetchAuthors();
});
</script>
