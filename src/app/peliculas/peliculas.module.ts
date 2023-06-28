import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListaPeliculasComponent,
    DetallePeliculaComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    MatTableModule
  ]
})
export class PeliculasModule { }
