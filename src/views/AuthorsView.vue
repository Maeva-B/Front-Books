<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Library Authors</h1>

    <!-- Modern Filter UI with Dropdown Menu -->
    <div class="mb-6 flex justify-center">
      <div class="relative w-64">
        <button @click="toggleDropdown" class="w-full py-2.5 px-4 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-center flex items-center justify-between">
          {{ authorsStore.nationalityFilter || "Select Nationality" }}
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div v-if="dropdownOpen" class="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          <div @click="selectNationality('')" class="cursor-pointer px-4 py-2 hover:bg-gray-100">All Nationalities</div>
          <div v-for="nationality in uniqueNationalities" :key="nationality" @click="selectNationality(nationality)" class="cursor-pointer px-4 py-2 hover:bg-gray-100">
            {{ nationality }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="author in authorsStore.filteredAuthors" :key="author.id" class="bg-white overflow-hidden shadow rounded-lg p-6 flex flex-col items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900 text-center">
          {{ author.first_name }} {{ author.last_name }}
        </h3>
        <span class="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
          {{ author.nationality }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useAuthorStore } from '../stores/authors';
import { storeToRefs } from 'pinia';

const authorsStore = useAuthorStore();
const { loading } = storeToRefs(authorsStore);
const dropdownOpen = ref(false);

const uniqueNationalities = computed(() => {
  const nationalities = authorsStore.authors.map(author => author.nationality);
  return [...new Set(nationalities)].sort();
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectNationality = (nationality: string) => {
  authorsStore.nationalityFilter = nationality;
  fetchFilteredAuthors();
  dropdownOpen.value = false;
};

const fetchFilteredAuthors = () => {
  authorsStore.fetchAuthors(authorsStore.nationalityFilter || undefined);
};

onMounted(() => {
  authorsStore.fetchAuthors();
});
</script>
