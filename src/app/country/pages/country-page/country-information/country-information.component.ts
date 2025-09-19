import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  //Esto es lo que debe recibir nuestro componente para funcionar
  country = input.required<Country>();


  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
