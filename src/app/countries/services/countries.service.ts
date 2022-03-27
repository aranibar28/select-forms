import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { CountryResponse } from '../interfaces/country.response';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _baseUrl = 'https://restcountries.com/v2';
  private _region: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._region];
  }
  constructor(private http: HttpClient) {}

  getCountriesById(region: string): Observable<Country[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code,name`;
    return this.http.get<Country[]>(url);
  }

  getCountriesByCode(code: string): Observable<CountryResponse | null> {
    if (!code) {
      return of(null);
    }
    const url = `${this._baseUrl}/alpha/${code}`;
    return this.http.get<CountryResponse>(url);
  }

  getCountriesByCodeSmall(code: string): Observable<Country> {
    const url = `${this._baseUrl}/alpha/${code}?fields=name,alpha3Code`;
    return this.http.get<Country>(url);
  }

  getCountryByCodeSmall(borders: string[]): Observable<Country[]> {
    if (!borders) {
      return of([]);
    }
    const peticiones: Observable<Country>[] = [];
    borders.forEach((code) => {
      const peticion = this.getCountriesByCodeSmall(code);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
