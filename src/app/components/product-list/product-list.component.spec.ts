import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';
import { MultiTransformPipe } from '../../pipes/multiTransform.pipe';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jest.Mocked<ProductService>;
  let basketService: jest.Mocked<BasketService>;

  beforeEach(async () => {
    const productServiceMock = {
      getProducts: jest.fn(),
      setProducts: jest.fn(),
      updateProduct: jest.fn(),
      getBasketQuantity: jest.fn(),
      addToBasket: jest.fn(),
      filterProductsByCategory: jest.fn(),
      increaseProductQuantity: jest.fn(),
      decreaseProductQuantity: jest.fn()
    };

    const basketServiceMock = {
      getItemCount: jest.fn(),
      addItem: jest.fn(),
      updateItemCount: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterTestingModule, MultiTransformPipe],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: BasketService, useValue: basketServiceMock },
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    basketService = TestBed.inject(BasketService) as jest.Mocked<BasketService>;

    productService.getProducts.mockReturnValue(of([]));
    basketService.getItemCount.mockReturnValue(0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    const mockProducts = [
      { id: 1, productName: 'Product 1', category: 'CATEGORY_BOOKS', quantity: 10, isImported: true, selectedQuantity: 1, price: 10 },
      { id: 2, productName: 'Product 2', category: 'CATEGORY_FOOD', quantity: 5, isImported: true, selectedQuantity: 1, price: 10 }
    ];
    productService.getProducts.mockReturnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should add product to basket', () => {
    const product = { id: 1, productName: 'Product 1', category: 'CATEGORY_BOOKS', quantity: 10, isImported: true, selectedQuantity: 1, price: 10 };

    component.addToBasket(product);

    expect(productService.addToBasket).toHaveBeenCalledWith(product, basketService);
    expect(basketService.getItemCount).toHaveBeenCalled();
  });

  it('should filter products by category', () => {
    const mockProducts = [
      { id: 1, productName: 'Product 1', category: 'CATEGORY_BOOKS', quantity: 10, isImported: true, selectedQuantity: 1, price: 10 },
      { id: 2, productName: 'Product 2', category: 'CATEGORY_FOOD', quantity: 5, isImported: true, selectedQuantity: 1, price: 10 }
    ];
    component.products = mockProducts;
    productService.filterProductsByCategory.mockReturnValue([mockProducts[0]]);

    const event = { target: { value: 'CATEGORY_BOOKS' } } as unknown as Event;
    component.filterByCategory(event);

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].category).toBe('CATEGORY_BOOKS');
  });
});
