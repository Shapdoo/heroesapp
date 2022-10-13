import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'MARVEL Comics',
      desc: 'MARVEL - Comics',
    },
  ];

  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _hs: HeroesService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this._router.url.includes('editar')) {
      this._route.params
        .pipe(switchMap(({ id }) => this._hs.getHero(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  onSubmit(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    //creando nuevo heroe
    if (!this.heroe.id) {
      this._hs.postHero(this.heroe).subscribe({
        next: (responseFromBackend) => {
          this._router.navigate(['/heroes/editar', responseFromBackend.id]);
          this.showSnackBar(`Se ha creado el heroe ${ responseFromBackend.superhero }`)
        },
        error: (error) => console.log(error),
      });

      return;
    }

    //actualizando heroe nuevo
    this._hs.updateHero(this.heroe).subscribe({
      next: (responseFromBackend) => {
        this.showSnackBar(`Se ha actualizado el heroe ${ responseFromBackend.superhero }`);
      },
      error: (error) => console.error(error),
      complete: () => this._router.navigate(['/heroes']),
    });
  }

  deleteHero(): void {
    const dialog = this._dialog.open( DialogComponent, {
      width: '250px',
      data: { ...this.heroe }
    })

    // dialog.afterClosed().subscribe({
    //   next: (result) => {
    //     if(result){
    //       this._hs.deleteHero(this.heroe.id!).subscribe({
    //         next: (result) => {
    //           console.log(result)
    //           this._router.navigate(['/heroes'])
    //         },
    //         error: (error) => console.error(error)
    //       })
    //     }
    //   }
    // })

    dialog.afterClosed().pipe(
      switchMap( res => (res) ? this._hs.deleteHero(this.heroe.id!) : of(false) )
    ).subscribe( res => {
      if(res){
        this._router.navigate(['/heroes'])
      }
    })
  }

  showSnackBar(msg: string): void {
    this._snackBar.open(msg, 'Cerrar', {
      duration: 2500,
    });
  }
}
