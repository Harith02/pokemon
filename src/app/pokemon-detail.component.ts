import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  standalone: true,
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class PokemonDetailComponent {
  pokemon$: Observable<Pokemon | null>;

  constructor(private route: ActivatedRoute, public pokemonService: PokemonService) {
    this.pokemon$ = this.route.paramMap.pipe(
      map((params) => params.get('name') ?? ''),
      switchMap((name) => (name ? this.pokemonService.getPokemon(name) : of(null)))
    );
  }

  formatStatName(statName: string): string {
    return statName.replace('-', ' ').toUpperCase();
  }

  get heightCM(): (height: number) => number {
    return (height: number) => height * 10;
  }

  get weightKG(): (weight: number) => number {
    return (weight: number) => weight / 10;
  }
}
