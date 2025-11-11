import { onMounted, ref } from "vue";
import { getEvolutionChain } from "../services/pokemonService";

export function useEvolutionChain(id: number) {
  const names = ref<string[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const recursiveExtract = (chain: any) => {
    names.value.push(chain.species.name);
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution: any) => {
        recursiveExtract(evolution);
      });
    }
  };

  const fetchEvolutionChain = async (id: number) => {
    try {
      const evolutionChain = await getEvolutionChain(id);
      recursiveExtract(evolutionChain.chain);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchEvolutionChain(id);
  });

  return {
    names,
    isLoading,
    error,
  };
}
