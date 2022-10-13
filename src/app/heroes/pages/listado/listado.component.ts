import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public heroes: Heroe[] = []

  @Input()
  public hero!: Heroe


  constructor(
    private _hs: HeroesService
  ) { }

  ngOnInit(): void {
    this._hs.getHeroes().subscribe({
      next: heroes => {
        this.heroes = heroes
      },
      error: err => {
        console.error(err)
      }
    })
  }

}
