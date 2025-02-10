import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const isAuthenticated = ref(false);

  async function login(login: string, password: string) {
    try {
      const response = await axios.post('/adherents/login', { 
        login,
        password 
      });
      
      const { access_token, token_type } = response.data;

      token.value = access_token;
      isAuthenticated.value = true;

      axios.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  function logout() {
    token.value = null;
    isAuthenticated.value = false;
    delete axios.defaults.headers.common['Authorization'];
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  };
});
