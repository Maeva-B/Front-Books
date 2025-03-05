<template>
  <form @submit.prevent="submitLoan" class="bg-white shadow-md rounded px-8 pt-6 pb-8">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="bookId">Book</label>
      <input v-model="bookId" type="text" id="bookId"
             class="shadow border rounded w-full py-2 px-3 text-gray-700"
             placeholder="Book ID">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="loanDate">Loan Date</label>
      <input v-model="loanDate" type="date" id="loanDate"
             class="shadow border rounded w-full py-2 px-3 text-gray-700">
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="returnDate">Return Date</label>
      <input v-model="returnDate" type="date" id="returnDate"
             class="shadow border rounded w-full py-2 px-3 text-gray-700">
    </div>

    <button type="submit"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
      Add
    </button>

    <p v-if="loanStore.error" class="text-red-500 mt-2">{{ loanStore.error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLoanStore } from '../stores/loans';
import { useAuthStore } from '../stores/auth';

const loanStore = useLoanStore();
const authStore = useAuthStore();
const emit = defineEmits(['loanAdded']);

const bookId = ref('');
const loanDate = ref('');
const returnDate = ref('');
const adherentId = ref<string | null>(null);

onMounted(() => {
  adherentId.value = authStore.getAdherentIdFromToken();
  if (!adherentId.value) {
    console.error("Unable to retrieve patron ID");
  }
});

async function submitLoan() {
  if (!bookId.value || !loanDate.value) {
    alert('Please complete all required fields');
    return;
  }

  if (!adherentId.value) {
    alert("Error: Unable to retrieve logged in user.");
    return;
  }

  await loanStore.createLoan(bookId.value, adherentId.value, loanDate.value, returnDate.value || null);

  bookId.value = '';
  loanDate.value = '';
  returnDate.value = '';
  emit('loanAdded');
}
</script>
