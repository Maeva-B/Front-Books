<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Loan</h1>

    <button @click="isModalOpen = true"
      class="mb-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
      Add a loan
    </button>

    <LoanModal :isOpen="isModalOpen" @close="isModalOpen = false" />

    <!-- Loading spinner -->
    <div v-if="loanStore.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <!-- List of loans -->
    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="loan in loanStore.loans" :key="loan.id" class="px-4 py-4 sm:px-6 flex justify-between items-center">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-indigo-600 truncate">
              {{ loan.book ? loan.book.title : 'Chargement...' }}
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
              Expected return: {{ new Date(loan.returnDate).toLocaleDateString() }}
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

          <!-- Delete -->
          <button @click="deleteLoan(loan.id)"
            class="ml-4 bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-2 rounded">
            🗑️
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useLoanStore } from '../stores/loans';
import LoanModal from '../components/LoanModal.vue';

const authStore = useAuthStore();
const loanStore = useLoanStore();
const isModalOpen = ref(false);

onMounted(() => {
  const adherentIdFromToken = authStore.getAdherentIdFromToken();
  if (!adherentIdFromToken) {
    console.log('Unable to retrieve the member ID from the token');
    return;
  }
  loanStore.fetchLoans(adherentIdFromToken);
});

function isLoanActive(loan) {
  if (!loan.returnDate) return true;
  const now = new Date();
  const due = new Date(loan.returnDate);
  return due.getTime() > now.getTime();
}

async function deleteLoan(loanId: string) {
  console.log('Deleting loan', loanId);

  if (confirm("Are you sure you want to cancel this loan?")) {
    await loanStore.deleteLoan(loanId);
  }
}
</script>
