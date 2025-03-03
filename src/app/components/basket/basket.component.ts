import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BasketService} from '../../services/basket.service';
import {Product} from '../../models/product.model';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {MultiTransformPipe} from '../../pipes/multiTransform.pipe';


@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, MultiTransformPipe],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  items: Product[] = [];
  isPanierVide=false;
  constructor(private basketService: BasketService,   private productService: ProductService,
              private router: Router) {


  }

  ngOnInit(): void {

    this.basketService.items$.subscribe(items => {
      this.items = items.filter(item => item.quantity > 0)
        .sort((a, b) => a.id - b.id);

    });
    this.isPanierVide = this.items.length === 0;

  }


  totalTaxes():number{
    return this.items.reduce((total, item) => total +  new MultiTransformPipe()
      .transform(item.price,'calculateTax', item.category, item.isImported) * item.quantity, 0);
  }
  totalTTC():number{
    return  this.items.reduce((total, item) => total +  new MultiTransformPipe().
    transform(item.price,'calculateHTPrice', item.category, item.isImported) * item.quantity, 0);

  }

  removeFromBasket(item: Product): void {
    this.basketService.removeItem(item);
    if (this.items.length === 0) {
      this.isPanierVide = true;
    }
    this.productService.removeFromBasket(item, 1); // Mettre à jour les quantités dans le panier
  }

  goToHome(): void {
    this.router.navigate(['/product-list']);
  }
}
