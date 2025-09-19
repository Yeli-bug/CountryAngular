import { Component,resource, signal, inject} from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {firstValueFrom, of } from 'rxjs';


@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  onSearch(value: string) {
    console.log('Search value:', value);
  }

  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
//of es un observable que emite un valor y luego completa
      return this.countryService.searchByCountry(request.query);
    },
  });

  //reactividad con RESOURCES
  // countryResources = resource({
  //   request: () = ({query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });


}
