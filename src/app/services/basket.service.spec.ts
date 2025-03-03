import {TestBed} from '@angular/core/testing';
import {BasketService} from './basket.service';
import {Product} from '../models/product.model';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);

    // Initialize localStorage for each test
    localStorage.setItem('basketItems', JSON.stringify([]));
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to basket and save items', () => {
    const mockProduct: Product = { id: 1, productName: 'Product 1', price: 10, category: 'category1',isImported:true, quantity: 1, selectedQuantity: 1 };

    service.addItem(mockProduct);
    expect(service.getItemCount()).toBe(1);
    expect(localStorage.getItem('basketItems')).toEqual(JSON.stringify([{ ...mockProduct, quantity: 1 }]));
  });

  it('should remove item from basket and update quantities', () => {
    const mockProduct: Product = { id: 1, productName: 'Product 1', price: 10, category: 'category1', quantity: 1,isImported:true, selectedQuantity: 1 };

    service.addItem(mockProduct);
    service.removeItem(mockProduct);
    expect(service.getItemCount()).toBe(0);
    expect(localStorage.getItem('basketItems')).toEqual(JSON.stringify([]));
  });



  it('should return true if basket is empty', () => {
    expect(service.isEmpty()).toBe(true);
  });

  it('should return false if basket is not empty', () => {
    const mockProduct: Product = { id: 1, productName: 'Product 1', price: 10, category: 'category1', isImported:true,quantity: 1, selectedQuantity: 1 };

    service.addItem(mockProduct);
    expect(service.isEmpty()).toBe(false);
  });
});
