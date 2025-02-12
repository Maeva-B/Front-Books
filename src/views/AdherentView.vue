<template>
  <div class="flex justify-center items-center min-h-screen">
    <div v-if="authStore.adherent" class="max-w-lg bg-white shadow-lg rounded-xl p-8" style="width: 30rem;">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">Adherent Information</h2>
      <div class="bg-gray-100 p-4 rounded-lg">
        <div class="flex items-center space-x-4 mb-4">
          <div class="flex-shrink-0 h-12 w-12 bg-indigo-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
            {{ authStore.adherent.first_name.charAt(0) }}{{ authStore.adherent.last_name.charAt(0) }}
          </div>
          <div>
            <p class="text-lg font-medium text-gray-900">{{ authStore.adherent.first_name }} {{ authStore.adherent.last_name }}</p>
            <p class="text-sm text-gray-500">{{ authStore.adherent.role }}</p>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-gray-700"><strong class="font-semibold">Membership Number:</strong> {{ authStore.adherent.membership_number }}</p>
          <p class="text-gray-700"><strong class="font-semibold">Login:</strong> {{ authStore.adherent.login }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-6 text-lg">No adherent information available.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.adherent) {
    authStore.fetchAdherent();
  }
});
</script>