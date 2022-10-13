import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {


  // ls: string = ''
  constructor( private _authService: AuthService, private router: Router){

    // this.ls  = localStorage.getItem('userid') || ''

  }

  //Previene la activacion de la ruta es decir el acceso (nolazyload es mas que suficiente usar solo este)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this._authService.verifyAuth().pipe(
      tap(isAuthenticaded => {
        if( !isAuthenticaded ){
          this.router.navigate(['./auth/login'])
        }
      })
    );
  }

  //Previene la carga de modulos (lazyload)
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    //   if ( this._authService.user.id){
    //     return true
    //   }

    // console.log('bloqueado por el AuthGuard - CanLoad')
    return this._authService.verifyAuth().pipe(
      tap( isAuthenticaded => {
        if( !isAuthenticaded ){
          this.router.navigate(['./auth/login'])
        }
      })
    );
  }
}
