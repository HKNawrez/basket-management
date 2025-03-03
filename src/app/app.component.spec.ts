import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {EmptyBasketComponent} from './components/empty-basket/empty-basket.component';
import {BasketComponent} from './components/basket/basket.component';
import {BasketGuardService} from './services/basket-guard.service';
import {Router} from '@angular/router';

describe('AppComponent', () => {
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'product-list', component: ProductListComponent },
          { path: 'empty-basket', component: EmptyBasketComponent },
          { path: 'basket', component: BasketComponent , canActivate: [BasketGuardService] },
          { path: '', redirectTo: '/product-list', pathMatch: 'full' }
        ]),        AppComponent // Import the standalone component here
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'basket-management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('basket-management');
  });
  it('should redirect to /product-list when navigating to an empty path', async () => {
    await router.navigate(['']);
    expect(router.url).toBe('/product-list');
  });
});
