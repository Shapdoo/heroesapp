import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl

  constructor(
    private _http: HttpClient
  ) { }


  getHeroes(): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${ this.baseUrl }heroes`)
  }

  getHero(heroId: string): Observable<Heroe>{
    return this._http.get<Heroe>(`${ this.baseUrl }heroes/${heroId}`)
  }

  getSuggestions(termino: string): Observable<Heroe[]>{
    return this._http.get<Heroe[]>(`${ this.baseUrl }heroes?q=${ termino }&_limit=6`)
  }

  postHero(heroe: Heroe): Observable<Heroe>{
    return this._http.post<Heroe>(`${ this.baseUrl }heroes`, heroe)
  }

  updateHero(heroe: Heroe): Observable<Heroe>{
    return this._http.put<Heroe>(`${ this.baseUrl }heroes/${ heroe.id }`, heroe)
  }

  deleteHero(id: string): Observable<any>{
    return this._http.delete(`${ this.baseUrl }heroes/${ id }`)
  }
}
