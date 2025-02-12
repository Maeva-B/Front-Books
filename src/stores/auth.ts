import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = ref(!!token.value);

  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

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
      localStorage.setItem('token', access_token);
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  function logout() {
    token.value = null;
    isAuthenticated.value = false;
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  };
});
