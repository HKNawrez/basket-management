import {Routes} from '@angular/router';
import {BasketComponent} from './components/basket/basket.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {BasketGuardService} from './services/basket-guard.service';
import {EmptyBasketComponent} from './components/empty-basket/empty-basket.component';

export const routes: Routes = [

  { path: 'product-list', component: ProductListComponent },
  { path: 'empty-basket', component: EmptyBasketComponent },
  { path: 'basket', component: BasketComponent , canActivate: [BasketGuardService] },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' }  // Redirection par défaut
];
