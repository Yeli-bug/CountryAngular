import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  //Lo abajo sirve para hacer el regreso de pagina
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
