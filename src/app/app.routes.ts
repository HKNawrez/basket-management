import { Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EmptyBasketComponent } from './components/empty-basket/empty-basket.component';

export const routes: Routes = [
  {
    path: 'product-list',
    loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'empty-basket',
    loadComponent: () => import('./components/empty-basket/empty-basket.component').then(m => m.EmptyBasketComponent)
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
