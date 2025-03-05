import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { PRODUCTS_URL } from '../constants';
import {BasketService} from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private items: Product[] = [];
  private productsUrl = PRODUCTS_URL;
  private productSubject = new BehaviorSubject<Product[]>([]);
  private basketQuantities: { [productId: number]: number } = {};

  constructor(private http: HttpClient) {
    this.loadProducts();
    this.loadBasketQuantities();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((products) => {
        if (products && products.length > 0) {
          this.items = products.map(product => ({
            ...product,
            selectedQuantity: product.selectedQuantity || 1
          }));
          this.saveProducts();
        }
      }),
      catchError((error) => {
        console.error('Error fetching data from API, loading from localStorage', error);
        this.loadProducts();
        return of(this.items);
      })
    );
  }

  private saveProducts(): void {
    localStorage.setItem('productItems', JSON.stringify(this.items));
    this.productSubject.next(this.items);
  }

  loadProducts(): void {
    const savedItems = localStorage.getItem('productItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
      this.productSubject.next(this.items);
    }
  }

  private saveBasketQuantities(): void {
    localStorage.setItem('basketQuantities', JSON.stringify(this.basketQuantities));
  }

  private loadBasketQuantities(): void {
    const savedQuantities = localStorage.getItem('basketQuantities');
    if (savedQuantities) {
      this.basketQuantities = JSON.parse(savedQuantities);
    }
  }

  setProducts(products: Product[]): void {
    this.items = products;
    this.saveProducts();
  }

  updateProduct(product: Product): void {
    const index = this.items.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.items[index] = product;
      this.saveProducts();
    }
  }

  addToBasket(product: Product, basketService: BasketService): void {
    const quantity = product.selectedQuantity || 1;
    if (product.quantity >= quantity) {
      for (let i = 0; i < quantity; i++) {
        basketService.addItem(product);
        product.quantity--;
      }
    }
    basketService.updateItemCount();
    this.updateProduct(product);
    this.updateLocalBasketQuantities(product, quantity);
  }

  filterProductsByCategory(category: string): Product[] {
    if (category) {
      return this.items.filter(item => item.category === category);
    }
    return this.items;
  }

  updateLocalBasketQuantities(product: Product, quantity: number): void {
    if (!this.basketQuantities[product.id]) {
      this.basketQuantities[product.id] = 0;
    }
    this.basketQuantities[product.id] += quantity;
    this.saveBasketQuantities();
  }

  increaseProductQuantity(productId: number): void {
    const product = this.items.find(p => p.id === productId);
    if (product && product.selectedQuantity! < product.quantity) {
      product.selectedQuantity!++;
      this.updateProduct(product);
    }
  }

  decreaseProductQuantity(productId: number): void {
    const product = this.items.find(p => p.id === productId);
    if (product && product.selectedQuantity! > 1) {
      product.selectedQuantity!--;
      this.updateProduct(product);
    }
  }

  removeFromBasket(product: Product, quantity: number): void {
    if (this.basketQuantities[product.id]) {
      this.basketQuantities[product.id] -= quantity;
      if (this.basketQuantities[product.id] < 0) {
        this.basketQuantities[product.id] = 0;
      }
      this.saveBasketQuantities();
      this.updateProductQuantity(product.id, quantity);
    }
  }

  private updateProductQuantity(productId: number, quantity: number): void {
    const product = this.items.find(p => p.id === productId);
    if (product) {
      product.quantity += quantity;
      this.updateProduct(product);
    }
  }

  getBasketQuantity(productId: number): number {
    return this.basketQuantities[productId] || 0;
  }
}
