import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CATEGORIES } from '../../constants';
import { BasketService } from '../../services/basket.service';
import { MultiTransformPipe } from '../../pipes/multiTransform.pipe';
import {catchError, map, of, tap} from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiTransformPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories = CATEGORIES;
  itemCount: number = 0;
  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.productService.getProducts().pipe(
      map(data => data.map(product => ({
        ...product,
        selectedQuantity: 1,
        quantity: product.quantity - this.productService.getBasketQuantity(product.id)
      }))),
      tap(products => {
        this.products = products;
        this.productService.setProducts(this.products);
        this.filteredProducts = this.products;
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return of([]);
      })
    ).subscribe();
    this.itemCount = this.basketService.getItemCount();
  }

  addToBasket(product: Product) {
    this.productService.addToBasket(product, this.basketService);
    this.itemCount = this.basketService.getItemCount();
  }

  filterByCategory(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target?.value) {
      const value = target.value;
      this.filteredProducts = this.productService.filterProductsByCategory(value);
    } else {
      this.filteredProducts = this.products;
    }
  }

  goToPanier(): void {
    this.router.navigate(['/basket']);
  }

  increaseQuantity(productId: number) {
    this.productService.increaseProductQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.productService.decreaseProductQuantity(productId);
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
