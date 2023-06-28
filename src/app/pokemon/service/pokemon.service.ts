import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { IPokemon, IPokemonList, IRowPokemonList } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  _urlbase: string = 'https://pokeapi.co/api/v2/pokemon';
  _urlbaseSpecie: string = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient) { }

  /**
   * Obtener la lista de elementos paginados
   * @param offset es el elemento que queremos obtener sera el pageIndex * limit
   * @param limit cantidad de elementos que queremos obtener
   * @filterName nombre por el cual buscaremos en la API, debe coincidir exactamente (API definida)
   * @returns
   */
  GetPokemonsList(offset: number = 0, limit: number = 10):Observable<IPokemonList> {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    return this.http.get<IRowPokemonList>(`${this._urlbase}`, { params }).pipe(
      switchMap((results) => {
        var list = results.results;
        var pokemonlist = forkJoin(list.map((pok) => this.GetPokemonByUrl(pok.url)));
        return forkJoin(
          {
            data:pokemonlist,
            count:of(results.count)
          }
        );
      }),
      catchError((error) => { return of(this.handleError(error)) }),
    );
  }

  public GetPokemonByUrl(url: string):Observable<IPokemon> {
    return this.http.get<IPokemon>(url).pipe(
      /** Adicionar la URL a la respuesta para usarla en este mismo MEtodo para el detalle. */
      map(pok=> ({
        ...pok,
        url:url
      })));
  }

  public GetPokemonByName(filterName:string):Observable<IPokemon>{
    return this.http.get<IPokemon>(`${this._urlbase}/${filterName}`).pipe();
  }
  handleError(error: any): any {
    throw new Error('Method not implemented.');
  }

  // GetPokemon


}
