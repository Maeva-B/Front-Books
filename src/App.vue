<template>
  <div class="min-h-screen bg-gray-100">
    <nav v-if="isAuthenticated" class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">Polytech Library</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/books"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/books' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700']"
              >
                Books
              </router-link>
              <router-link
                to="/authors"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/authors' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700']"
              >
                Authors
              </router-link>
              <router-link
                to="/loans"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/loans' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700']"
              >
                My Loans
              </router-link>
              <router-link
                to="/adhrents"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[$route.path === '/adhrents' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700']"
              >
                My Account
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="logout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>