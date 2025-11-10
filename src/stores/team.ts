import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
  state: () => ({
    members: [] as number[],
    }),
    persist: {
        key: 'team-store',
        storage: localStorage,
    },
    actions: {
        toggleMember(pokemonId: number) {
            if (this.members.includes(pokemonId)) {
                this.members = this.members.filter(id => id !== pokemonId);
            } else {
                if (this.members.length < 6) {
                    this.members.push(pokemonId);
                }
            }
        },
        isMember(pokemonId: number) {
            return this.members.includes(pokemonId);
        },
        getMembers() {
            return this.members;
        }
    }
});