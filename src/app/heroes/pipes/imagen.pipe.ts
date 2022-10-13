import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( hero: Heroe ): string {

    if(!hero.id && !hero.alt_img){
      return 'assets/no-image.png'
    }

    if(hero.alt_img){
      return hero.alt_img
    }

    return `assets/heroes/${ hero.id }.jpg`;
  }

}


