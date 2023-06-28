import { Component, Inject } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IPokemon } from '../interface/pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {

  pokemonDetails!:Observable<IPokemon>;

  constructor(private pokemonService: PokemonService,
    public dialogRef: MatDialogRef<PokemonDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name:string}) {

      this.pokemonDetails = this.pokemonService.GetPokemonByName(this.data.name);

    }

    Cerrar(){
      this.dialogRef.close();
    }

}
