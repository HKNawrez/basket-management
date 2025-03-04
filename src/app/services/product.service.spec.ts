import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductService} from './product.service';
import {Product} from '../models/product.model';
import {PRODUCTS_URL} from '../constants';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.setItem('basketQuantities', JSON.stringify({}));
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', () => {
    const mockProducts: Product[] = [
      { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true, quantity: 100, selectedQuantity: 1 },
      { id: 2, productName: 'Product 2', price: 20, category: 'category2',isImported:true, quantity: 200, selectedQuantity: 1 }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(PRODUCTS_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should save and load products from localStorage', () => {
    const mockProducts: Product[] = [
      { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true,quantity: 100, selectedQuantity: 1 }
    ];

    service.setProducts(mockProducts);
    expect(localStorage.getItem('productItems')).toEqual(JSON.stringify(mockProducts));

    service.loadProducts();
    expect(service['items']).toEqual(mockProducts);
  });

  it('should add product to basket and save quantities', () => {
    const mockProduct: Product = { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true, quantity: 100, selectedQuantity: 1 };

    service.addToBasket(mockProduct, 2);
    expect(service.getBasketQuantity(mockProduct.id)).toBe(2);
    expect(localStorage.getItem('basketQuantities')).toEqual(JSON.stringify({ 1: 2 }));
  });

  it('should remove product from basket and update quantities', () => {
    const mockProduct: Product = { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true, quantity: 100, selectedQuantity: 1 };

    service.addToBasket(mockProduct, 2);
    service.removeFromBasket(mockProduct, 1);
    expect(service.getBasketQuantity(mockProduct.id)).toBe(1);
    expect(localStorage.getItem('basketQuantities')).toEqual(JSON.stringify({ 1: 1 }));
  });

  it('should handle API error and load products from localStorage', () => {
    const mockProducts: Product[] = [
      { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true, quantity: 100, selectedQuantity: 1 }
    ];

    localStorage.setItem('productItems', JSON.stringify(mockProducts));

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(PRODUCTS_URL);
    req.error(new ErrorEvent('Network error'));
  });

  it('should update product in items array and call saveProducts', () => {
    const initialProducts: Product[] = [
      { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true, quantity: 100, selectedQuantity: 1 },
      { id: 2, productName: 'Product 2', price: 20, category: 'category2',isImported:true, quantity: 200, selectedQuantity: 1 }
    ];

    service.setProducts(initialProducts);

    const updatedProduct: Product = { id: 1, productName: 'Updated Product 1', price: 15, category: 'category1',isImported:true,  quantity: 150, selectedQuantity: 1 };

    jest.spyOn(service as any, 'saveProducts');

    service.updateProduct(updatedProduct);

    expect(service['items'][0]).toEqual(updatedProduct);
    expect(service['saveProducts']).toHaveBeenCalled();
  });
});
