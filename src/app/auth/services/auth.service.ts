import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined

  constructor( private _http: HttpClient ) { }

  login(){
    return this._http.get<Auth>( `${ this.baseUrl }usuarios/1` ).pipe(
      tap( resp => this._auth = resp ),
      tap( resp => localStorage.setItem('userid', resp.id))
    );
  }

  get user(): Auth{
    return { ...this._auth!  }
  }

  logout(){
    this._auth = undefined
  }

  // | boolean
  verifyAuth(): Observable<boolean>{
    //Si el token existe
    if( !localStorage.getItem('userid') ){
      return of(false) //convierte valores a observables
    }

    //Verificando si el id obtenido en el localstorage hace match con la "base de datos"
    return this._http.get<Auth>( `${ this.baseUrl }usuarios/1` ).pipe(
      map(//transforma datos y a su vez retorna un nuevo valor, es como el map de los arreglos.
        auth => {
          //Volviendo a setear la inforamcion
          this._auth = auth
          return true
        }
      )
    )
  }


}
