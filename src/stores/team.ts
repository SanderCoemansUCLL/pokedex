import { defineStore } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => ({
    members: [] as string[],
  }),
  persist: {
    key: "team-store",
    storage: localStorage,
  },
  actions: {
    toggleMember(pokemonName: string) {
      if (this.members.includes(pokemonName)) {
        this.members = this.members.filter((name) => name !== pokemonName);
      } else {
        if (this.members.length < 6) {
          this.members.push(pokemonName);
        }
      }
    },
    isMember(pokemonName: string) {
      return this.members.includes(pokemonName);
    },
    getMembers() {
      return this.members;
    },
  },
});
