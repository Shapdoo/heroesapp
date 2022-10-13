import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  public termino: string = '';

  public heroes: Heroe[] = [];

  public heroeSeleccionado: Heroe | undefined;

  constructor(private _hs: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this._hs.getSuggestions(this.termino.trim()).subscribe({
      next: (heroes) => (this.heroes = heroes),
      error: (error) => (console.error(error))
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined
      return
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this._hs.getHero(heroe.id!).subscribe({
      next: (heroe) => ( this.heroeSeleccionado = heroe ),
      error: (error) => (console.error(error))
    });


  }
}
