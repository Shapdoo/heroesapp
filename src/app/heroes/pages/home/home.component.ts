import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get auth(): Auth{
    return this._authService.user
  }

  constructor( private _route: Router, private _authService: AuthService ) { }

  ngOnInit(): void {

  }

  logout(): void {
    this._route.navigate(['./auth'])
    // this._authService.logout()
  }
}
