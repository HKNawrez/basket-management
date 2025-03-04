import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private items: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    const savedItems = localStorage.getItem('basketItems');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
      this.itemsSubject.next(this.items);
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
    console.log(this.items.length)
  }



  private saveItems(): void {
    localStorage.setItem('basketItems', JSON.stringify(this.items));
    this.itemsSubject.next(this.items);
  }

  isEmpty() {
    return this.getItemCount() === 0;
  }
}
