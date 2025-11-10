import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'
import PokemonDetails from '../views/PokemonDetails.vue'
import FavouritePokemons from '../views/FavouritePokemons.vue'
import TeamPokemons from '../views/TeamPokemons.vue'

const routes = [
  { path: '/', name: 'Pokedex', component: Pokedex },
  { path: '/:pokemonName', name: 'PokemonDetails', component: PokemonDetails },
  { path: '/favourites', name: 'Favourites', component: FavouritePokemons },
  { path: '/team', name: 'Team', component: TeamPokemons },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router