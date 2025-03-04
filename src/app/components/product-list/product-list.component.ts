import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {CATEGORIES} from '../../constants';
import {BasketService} from '../../services/basket.service';
import {MultiTransformPipe} from '../../pipes/multiTransform.pipe';

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
  quantities: { [productId: number]: number } = {};


  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService,private basketService: BasketService) {}


  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.map(product => ({
          ...product,
          selectedQuantity: 1,
          quantity: product.quantity - this.productService.getBasketQuantity(product.id)
        }));
        this.productService.setProducts(this.products);
        this.filteredProducts = this.products;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.itemCount = this.basketService.getItemCount();
  }

  addToBasket(product: Product) {
    const quantity = product.selectedQuantity || 1;
    if (product.quantity >= quantity) {
      for (let i = 0; i < quantity; i++) {
        this.basketService.addItem(product);
        product.quantity--;
      }
    }
    this.itemCount = this.basketService.getItemCount();
    this.productService.updateProduct(product);
    this.productService.addToBasket(product, quantity);
  }

  filterByCategory(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target?.value) {
      const value = target.value;
      this.filteredProducts = this.products.filter(item => item.category === value);
    } else {
      this.filteredProducts = this.products;
    }
  }

  goToPanier(): void {
    this.router.navigate(['/basket']);
  }

  increaseQuantity(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.selectedQuantity! < product.quantity) {
      product.selectedQuantity!++;
      this.productService.updateProduct(product);
    }
  }

  decreaseQuantity(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.selectedQuantity! > 1) {
      product.selectedQuantity!--;
      this.productService.updateProduct(product);
    }
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
