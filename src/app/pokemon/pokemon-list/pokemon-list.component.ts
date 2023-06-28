import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { debounce } from "lodash";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPokemon, IPokemonList } from '../interface/pokemon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['image', 'name', 'tipo', 'detalle'];
  dataSource!: MatTableDataSource<IPokemon>;

  @ViewChild(MatSort) sort!: MatSort;
  /**
   * en cso de false filtrara en la tabla
   * en caso true buscara por nombre en la API
   */
  origenBusqueda: boolean = false;

  /**
   * Controlar el paginado contra API(BE)
   */
  pageData: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0
  }

  subscription!: Subscription;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.GetPokemonsList();
  }

  /**
   * Obtener la lista de Pokemos
   */
  GetPokemonsList() {
    this.isLoading$.next(true);
    this.subscription = this.pokemonService.GetPokemonsList(this.pageData.pageIndex * this.pageData.pageSize, this.pageData.pageSize).pipe(
      tap((pokemonList: IPokemonList) => {
        this.dataSource = new MatTableDataSource(pokemonList.data);
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pageData.length = pokemonList.count;
        this.isLoading$.next(false);
      })
    ).subscribe();
  }

  /**
   * Aplicar filtro por nombre  al tabla o buscar por nombre en la API
   * @param event
   * @returns
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(!filterValue){
      this.GetPokemonsList();
      return;
    }
    if (!this.origenBusqueda) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      return;
    }

    if (filterValue) {
      debounce(() => {
        this.pokemonService.GetPokemonByName(filterValue).pipe(
          tap((pok: IPokemon) => {
            this.dataSource = new MatTableDataSource([pok]);
          })
        ).subscribe();
      }, 2000)();
      return;
    }
  }

  /**
   * //TODO Quedaria hacer algun trabajo para despues de cambiar el origen rehaga la busqueda en caso de que el filtro tenga valor.
   *
   * Para alternar la busqueda entre los datos de la tabla o buscar en la API.
   */
  CambiarOrigenBusqueda() {
    this.origenBusqueda = !this.origenBusqueda;
  }

  /**
   * Funcion usada desde al MAtPaginator (buscar resultados paginados)
   * @param $event evento del MAtPaginator
   */
  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageData = $event;
    this.GetPokemonsList();
  }

  /**
   * Funcion usada para ver el detalle de los Pokemons
   * @param name del pokemon del cual queremos mostrar el detalle
   */
  PokemonDetail(name: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { name };
    this.dialog.open(PokemonDetailsComponent, dialogConfig)
      .afterClosed()
      .subscribe((response => {
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
