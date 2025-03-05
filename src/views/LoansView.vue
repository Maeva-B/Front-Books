<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Loans</h1>

    <!-- Loading spinner -->
    <div v-if="loanStore.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>
    <!-- Empty loan array -->
    <div v-else-if="loanStore.loans.length === 0">
      <p class="text-gray-500">You have no loans at the moment.</p>
    </div>
    <!-- Otherwise we list the loans -->
    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="loan in loanStore.loans" :key="loan.id" class="px-4 py-4 sm:px-6">
          <!-- Displaying loan information -->
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-indigo-600 truncate">
                {{ loan.book ? loan.book.title : 'Loading...' }}
              </p>
              <p class="text-sm text-gray-500">
                by
                <span v-if="loan.book?.author">
                  {{ loan.book.author.first_name }} {{ loan.book.author.last_name }}
                </span>
                <span v-else>Loading...</span>
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 text-right">
              <p class="text-sm text-gray-500">
                Due: {{ new Date(loan.returnDate).toLocaleDateString() }}
              </p>
              <div class="mt-1">
                <span v-if="isLoanActive(loan)" class="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Active
                </span>
                <span v-else class="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  Finished
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useLoanStore } from '../stores/loans';

const authStore = useAuthStore();
const loanStore = useLoanStore();

onMounted(() => {
  const adherentIdFromToken = authStore.getAdherentIdFromToken();
  console.log('adherentIdFromToken', adherentIdFromToken);

  if (!adherentIdFromToken) {
    console.log('Impossible de récupérer l’ID de l’adhérent depuis le token');
    return;
  }

  loanStore.fetchLoans(adherentIdFromToken);
});

// Function to define if a loan is active
function isLoanActive(loan) {
  if (!loan.returnDate) return true;
  const now = new Date();
  const due = new Date(loan.returnDate);
  return due.getTime() > now.getTime();
}
</script>
