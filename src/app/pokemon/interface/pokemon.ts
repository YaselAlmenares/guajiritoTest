/**
 * Interfaz que define la lista de Pokemons enviadas a los compoennetes
 */
export interface IPokemonList {
  count:number;
  data:IPokemon[];
}

/**
 * Interfaz que define un Pokemon
 */
export interface IPokemon{
    id:number;
    name:string;
    height:number;
    weight:number;
    sprites: Sprites;
    officialImg:string;
    type:Types[];
    stats:Stats[];
    url:string;
}


interface Stats {
    base_stat:number,
    effort:number,
    stat:Stat

}

interface Stat{
    name:string,
    url:string
}

interface Sprites {
    front_default:string;
    back_default:string;
}

interface Types {
    slot:number,
    type:{
        name:string,
        url:string
    }
}

/**
 * Interfaz que define la respuesta de API con la lista de Pokemons
 */
export interface IRowPokemonList {
    count:number,
    next?:string,
    previos?:string,
    results:IMinipokemon[]
}

/**
 * Interfaz que define los datos de un Pokemon iniciales que vienen de API
 */
export interface IMinipokemon{
    name:string,
    url:string
}


