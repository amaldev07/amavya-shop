import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  products: Product[] = [];

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    if (product) {
      this.cartService.addToCart(product, 1);
      alert("Added to cart!");
    }
  }
}
