import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Adherent } from '../types';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  adherent_id: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = ref(!!token.value);
  const adherent = ref<Adherent | null>(null);

  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  function getAdherentIdFromToken(): string | null {
    if (!token.value) return null;
    try {
      const decoded: DecodedToken = jwtDecode(token.value);
      return decoded.adherent_id;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
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

      await fetchAdherent();
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  }

  async function fetchAdherent() {
    const adherentId = getAdherentIdFromToken();
    if (!adherentId) return;

    try {
      const response = await axios.get(`/adherents/${adherentId}`);
      adherent.value = response.data;
    } catch (error) {
      console.error('Failed to fetch adherent:', error);
    }
  }

  function logout() {
    token.value = null;
    isAuthenticated.value = false;
    adherent.value = null;
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }

  return {
    token,
    isAuthenticated,
    adherent,
    login,
    logout,
    fetchAdherent,
    getAdherentIdFromToken
  };
});
