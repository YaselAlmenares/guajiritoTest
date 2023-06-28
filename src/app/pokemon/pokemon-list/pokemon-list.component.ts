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
export class PokemonListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['image', 'name', 'tipo', 'detalle'];
  dataSource!: MatTableDataSource<IPokemon>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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


  ngAfterViewInit() {

  }


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
   * Quedaria hacer algun trabajo para despues de cabiar el origen rehaga la busqueda en caso de que el filtro tenga valor
   */
  CambiarOrigenBusqueda() {
    this.origenBusqueda = !this.origenBusqueda;
  }

  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageData = $event;
    this.GetPokemonsList();
  }

  PokemonDetail(name: string) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.height = '50%';
    // dialogConfig.width = '50%';
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
