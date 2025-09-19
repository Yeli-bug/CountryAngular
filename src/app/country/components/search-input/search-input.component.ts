import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar'); //Es una SENAL SIGNAL valor por defecto del aunput pero denediendo de la pagina en la que se use  se pasa un valor diferente para el placeholder
  value = output<string>(); //llama a la funcion output q debe retornar un string y se guarda en value

}
