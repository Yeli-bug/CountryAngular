import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of, first } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  // Utilizando rxResource para manejar la reactividad
  //trabaja con obserbables
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
//of es un observable que emite un valor y luego completa
      return this.countryService.searchByCapital(request.query);
    },
  });



  //countryService = inject(CountryService);
  //query = signal<string>('');

  //reactividad con RESOURCES
  //trabaja con promesas
  // countryResources = resource({
  //   request: () = ({query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });


  //PRIMERA FORMA DE RESOLVERLO
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe((countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);

  //       console.log(countries);
  //     });
  // }

  //SEGUNDA FORMA DE RESOLVERLO
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   //Manejo de excepciones
  //   this.countryService.searchByCapital(query)
  //   .subscribe( {
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(`No se ha encontrado ningun pais con esa capital: ${query}`);
  //     },
  //     });
  // }

}
