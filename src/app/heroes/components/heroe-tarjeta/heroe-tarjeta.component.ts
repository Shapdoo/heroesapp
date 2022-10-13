import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit {

  @Input()
  public hero!: Heroe

  constructor() { }

  ngOnInit(): void {
  }

}
