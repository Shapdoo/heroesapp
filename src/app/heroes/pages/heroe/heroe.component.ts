import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {

  public hero!: Heroe;

  constructor(
    private _hs: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this._hs.getHero(id)),
      tap(console.log)
    ).subscribe({
      next: heroe => this.hero = heroe
    });
  }

  goBack(){
    this.router.navigate(['/heroes/listado'])
  }
}
