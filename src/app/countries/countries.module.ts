import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { SelectorPagesComponent } from './pages/selector-pages/selector-pages.component';


@NgModule({
  declarations: [
    SelectorPagesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
