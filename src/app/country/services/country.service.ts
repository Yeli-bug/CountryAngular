import { HttpClient } from '@angular/common/http'; // Import HttpClient de nuestro app.config.ts
import { Injectable, inject } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

               //https://restcountries.com/v3.1/capital/tallinn
const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient); //IMPORTADA

  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        //Manejo de excepciones
        catchError  ((error) => {
          console.log('Error en el servicio', error);
          return throwError(
            () => new Error(`No se pudo encontrar la capital ${query}`)
          );
        })
      );
  }
  //<RESTCountry[]> SIEMPRE ES IMPORTANTE QUE TIPO DE DATO VA A EMITIR


  searchByCountry( query: string ): Observable<Country[]> {
    const url =`${API_URL}/name/${query}`;
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),

        delay(3000), //hace que se tarde en cargar
        //Maejo de excepciones
        catchError  ((error) => {
          console.log('Error en el servicio', error);
          return throwError(
            () => new Error(`No se pudo encontrar la pais ${query}`)
          );
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`)
        );
      })
    );
  }
}
