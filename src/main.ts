import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import axios from 'axios';

// Configure axios base URL to match your FastAPI backend
axios.defaults.baseURL = 'http://localhost:8000';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');