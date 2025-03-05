<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 class="text-lg font-bold mb-4">Add a loan</h2>
      
      <LoanForm @loanAdded="closeModal" />

      <button @click="closeModal" 
              class="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoanForm from '../components/LoanForm.vue';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>
