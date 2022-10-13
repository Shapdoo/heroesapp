import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _route: Router, private _authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(): void {
    //Ir al backend
    //Recibe un usuario

    this._authService.login().subscribe({
      next: (resp) => {
        if( resp.id ){
          console.log(resp)
          this._route.navigate(['./heroes'])
        }
      },
      error: (error) => {
        console.error(error)
      }
    })

    // this._route.navigate(['./heroes'])

  }

  ingresarSinLogin(): void {
    this._authService.logout()
    this._route.navigate(['./heroes'])
  }

}
