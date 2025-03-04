import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {BasketService} from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketGuardService implements CanActivate {

  constructor(private basketService: BasketService, private router: Router) {}

  canActivate(): boolean {
    if (this.basketService.isEmpty()) {
      this.router.navigate(['/empty-basket']);
      return false;
    }
    return true;
  }
}
