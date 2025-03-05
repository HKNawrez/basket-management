import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { MultiTransformPipe } from '../pipes/multiTransform.pipe';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private items: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();
  private itemCountSubject = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();

  constructor() {
    const savedItems = localStorage.getItem('basketItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
      this.itemsSubject.next(this.items);
      this.updateItemCount();
    }
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  addItem(item: Product): void {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.saveItems();
    this.updateItemCount();
  }

  removeItem(item: Product): void {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        this.items = this.items.filter(i => i.id !== item.id);
      }
    }
    this.saveItems();
    this.updateItemCount();
  }

  private saveItems(): void {
    localStorage.setItem('basketItems', JSON.stringify(this.items));
    this.itemsSubject.next(this.items);
  }

  updateItemCount(): void {
    const itemCount = this.getItemCount();
    this.itemCountSubject.next(itemCount);

  }

  isEmpty(): boolean {
    return this.getItemCount() === 0;
  }

  calculateTotalTaxes(items: Product[]): number {
    return items.reduce((total, item) => total + new MultiTransformPipe()
      .transform(item.price, 'calculateTax', item.category, item.isImported) * item.quantity, 0);
  }

  calculateTotalTTC(items: Product[]): number {
    return items.reduce((total, item) => total + new MultiTransformPipe()
      .transform(item.price, 'calculateHTPrice', item.category, item.isImported) * item.quantity, 0);
  }
}
