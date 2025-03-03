import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {BasketGuardService} from './basket-guard.service';
import {BasketService} from './basket.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('BasketGuardService', () => {
  let guard: BasketGuardService;
  let basketService: BasketService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BasketGuardService,
        {
          provide: BasketService,
          useValue: {
            isEmpty: jest.fn()
          }
        }
      ]
    });

    guard = TestBed.inject(BasketGuardService);
    basketService = TestBed.inject(BasketService);
    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to /empty-basket if basket is empty', () => {
    jest.spyOn(basketService, 'isEmpty').mockReturnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/empty-basket']);
  });

  it('should allow activation if basket is not empty', () => {
    jest.spyOn(basketService, 'isEmpty').mockReturnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
