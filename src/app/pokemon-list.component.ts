import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PokemonListResult, PokemonService } from './pokemon.service';

@Component({
  standalone: true,
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonListResult[] = [];
  searchTerm = '';
  loading = true;
  error = false;

  constructor(public pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: (response) => {
        this.pokemonList = response.results;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  get filteredPokemon(): PokemonListResult[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return this.pokemonList;
    }

    return this.pokemonList.filter((pokemon) => {
      const id = this.pokemonService.getPokemonId(pokemon.url).toString();
      return pokemon.name.includes(query) || id.includes(query);
    });
  }

  getPokemonId(url: string): number {
    return this.pokemonService.getPokemonId(url);
  }
}
