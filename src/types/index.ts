export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    front_female: string;
    back_default: string;
    back_female: string;
    front_shiny: string;
    back_shiny: string;
    front_shiny_female: string;
    back_shiny_female: string;
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};
