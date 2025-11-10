import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'
import PokemonDetails from '../views/PokemonDetails.vue'
import FavouritePokemons from '../views/FavouritePokemons.vue'

const routes = [
  { path: '/', name: 'Pokedex', component: Pokedex },
  { path: '/:pokemonName', name: 'PokemonDetails', component: PokemonDetails },
  { path: '/favourites', name: 'Favourites', component: FavouritePokemons },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router