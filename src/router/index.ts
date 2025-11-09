import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'

const routes = [
  { path: '/', name: 'Pokedex', component: Pokedex },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router