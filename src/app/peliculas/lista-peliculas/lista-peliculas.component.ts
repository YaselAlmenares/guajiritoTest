import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../servicios/peliculas.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.scss']
})
export class ListaPeliculasComponent implements OnInit {


  constructor(private peliculasService: PeliculasService) {

  }
  ngOnInit(): void {
    this.peliculasService.generateToken().pipe(tap(console.log)).subscribe();
  }

}
