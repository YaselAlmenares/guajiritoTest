
export interface IPokemonList {
  count:number;
  data:IPokemon[];
}

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

export interface IRowPokemonList {
    count:number,
    next?:string,
    previos?:string,
    results:IMinipokemon[]
}

export interface IMinipokemon{
    name:string,
    url:string
}


