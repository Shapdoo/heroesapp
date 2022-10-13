import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  exports: [
    ErrorPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ]
})
export class SharedModule { }
