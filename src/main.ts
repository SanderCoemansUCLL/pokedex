import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router'
import Pokedex from './views/Pokedex.vue'

const pinia = createPinia()
const app = createApp(Pokedex)
app.use(pinia)
app.use(router)
app.mount('#app')
