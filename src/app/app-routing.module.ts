import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'peliculas',
    loadChildren:()=>import('./peliculas/peliculas.module').then(m=>m.PeliculasModule)
  },
  {
    path:'pokemon',
    loadChildren:()=>import('./pokemon/pokemon.module').then(m=>m.PokemonModule)
  },
  {
    path:'**',
    redirectTo:'pokemon'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
