<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Current Loans</h1>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>
    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="loan in loans" :key="loan.id" class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ loan.book ? loan.book.title : 'Loading...' }}
              </p>
              <p class="text-sm text-gray-500">
                by {{ loan.book ? loan.book.author_id : 'Loading...' }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <p class="text-sm text-gray-500">
                Due: {{ new Date(loan.loanDate).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLoanStore } from '../stores/loans';
import { storeToRefs } from 'pinia';

const loanStore = useLoanStore();
const { loans, loading } = storeToRefs(loanStore);

onMounted(() => {
  loanStore.fetchLoans();
});
</script>