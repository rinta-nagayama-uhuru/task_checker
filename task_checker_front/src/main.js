import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { Modal } from '@kouts/vue-modal'
import router from './router'
import '@kouts/vue-modal/dist/vue-modal.css'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App).use(pinia)
app.use(router)
app.component('Modal', Modal);
app.mount('#app');