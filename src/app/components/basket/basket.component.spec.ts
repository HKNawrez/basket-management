import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BasketComponent} from './basket.component';
import {BasketService} from '../../services/basket.service';
import {ProductService} from '../../services/product.service';
import {MultiTransformPipe} from '../../pipes/multiTransform.pipe';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let basketService: jest.Mocked<BasketService>;
  let productService: jest.Mocked<ProductService>;
  let router: Router;

  beforeEach(async () => {
    const basketServiceMock = {
      items$: of([]),
      removeItem: jest.fn(),
      getItemCount: jest.fn()
    };

    const productServiceMock = {
      removeFromBasket: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MultiTransformPipe],
      declarations: [],
      providers: [
        { provide: BasketService, useValue: basketServiceMock },
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    basketService = TestBed.inject(BasketService) as jest.Mocked<BasketService>;
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    router = TestBed.inject(Router);
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items and isPanierVide on init', () => {
    const mockItems = [
      { id: 1, productName: 'Product 1', category: 'CATEGORY_BOOKS', quantity: 10, selectedQuantity: 1, price: 100, isImported: false },
      { id: 2, productName: 'Product 2', category: 'CATEGORY_FOOD', quantity: 5, selectedQuantity: 1, price: 50, isImported: true }
    ];
    basketService.items$ = of(mockItems);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.items.length).toBe(2);
    expect(component.isPanierVide).toBe(false);
  });

  it('should calculate total taxes', () => {
    const mockItems = [
      { id: 1, productName: 'Product 1', category: 'CATEGORY_BOOKS', quantity: 10, selectedQuantity: 1, price: 100, isImported: false },
      { id: 2, productName: 'Product 2', category: 'CATEGORY_FOOD', quantity: 5, selectedQuantity: 1, price: 50, isImported: true }
    ];
    component.items = mockItems;

    const totalTaxes = component.totalTaxes();
    expect(totalTaxes).toBeGreaterThan(0); // Adjust this based on your tax calculation logic
  });

  it('should calculate total TTC', () => {
    const mockItems = [
      { id: 1, productName: 'Product 1', category: 'CATEGORY_BOOKS', quantity: 10, selectedQuantity: 1, price: 100, isImported: false },
      { id: 2, productName: 'Product 2', category: 'CATEGORY_FOOD', quantity: 5, selectedQuantity: 1, price: 50, isImported: true }
    ];
    component.items = mockItems;

    const totalTTC = component.totalTTC();
    expect(totalTTC).toBeGreaterThan(0); // Adjust this based on your TTC calculation logic
  });



  it('should navigate to home', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.goToHome();

    expect(navigateSpy).toHaveBeenCalledWith(['/product-list']);
  });
});
