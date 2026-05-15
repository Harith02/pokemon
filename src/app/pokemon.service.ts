import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  moves: PokemonMove[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';
  private readonly pokemonListUrl = `${this.apiUrl}/pokemon?limit=151`;

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(this.pokemonListUrl);
  }

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${name}`);
  }

  getPokemonId(url: string): number {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? Number(match[1]) : 0;
  }

  getSpriteUrl(id: number | string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  getTypeColor(type: string): string {
    const palette: Record<string, string> = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD'
    };
    return palette[type] ?? '#777';
  }
}
