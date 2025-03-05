import { Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  {
    path: 'product-list',
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'basket',
    loadComponent: () => import('./components/basket/basket.component').then(m => m.BasketComponent)
  },
  {
    path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  }
];
