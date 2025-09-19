import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
   {
    path: '',
    component: HomePageComponent,
  },

  //Abajo este muestra todas las rutas hijas despuesde country
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'), //.then(m => m.countryRoutes)
  },

  {
    path: '**',
    redirectTo: '', // Redirect to home page for any unknown routes
    //component: 404Component
  },
];
