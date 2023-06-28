import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITokenResponse } from '../interface/ITokenResponse';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  URL_BASE = 'https://api.themoviedb.org/3/authentication';

  URL_POKEMON = 'https://pokeapi.co/api/v2/'
  private api_key = '73868722366dda26084bb941137becdc';

  private token!:string;

  constructor(private http: HttpClient) { }

  public generateToken():Observable<ITokenResponse>{
    const params = new HttpParams()
    .set('api_key', this.api_key);
    return this.http.get<ITokenResponse>(`${this.URL_BASE}/token/new`,{params}).pipe(
      tap(_token=>this.setToken(_token.request_token))
    );
  }

  private setToken(_token:string){
    this.token = _token;
  }

  public getToken():string{
    return this.token;
  }






}
