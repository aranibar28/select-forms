import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
})
export class SelectorPagesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  // Llenar selectores
  regiones: string[] = [];
  countries: Country[] = [];
  fronters: Country[] = [];

  loading: boolean = false;

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    fronters: ['', Validators.required],
  });

  guardar() {
    console.log(this.myForm.value);
  }

  ngOnInit(): void {
    this.regiones = this.countriesService.regiones;
    // Cuando cambia la region
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('country')?.reset('');
          this.loading = true;
          //this.myForm.get('fronters')?.disable();
        }),
        switchMap((region) => this.countriesService.getCountriesById(region))
      )
      .subscribe((countries) => {
        this.countries = countries;
        this.loading = false;
      });

    // Cuando cambia el pais
    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('fronters')?.reset('');
          this.loading = true;
          //this.myForm.get('fronters')?.enable();
        }),
        switchMap((code) => this.countriesService.getCountriesByCode(code)),
        switchMap((country) =>
          this.countriesService.getCountryByCodeSmall(country?.borders!)
        )
      )
      .subscribe((countries) => {
        this.fronters = countries;
        this.loading = false;
      });
  }
}
