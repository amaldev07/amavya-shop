import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'All';

  constructor(private apiService: ApiService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
  }

  /* addToCart(product: Product) {
    if (product) {
      this.cartService.addToCart(product, 1);
    }
  } */

  addToCart(product: Product, event: Event) {
    event.stopPropagation(); // VERY IMPORTANT — this stops routerLink navigation
    if (product) {
      this.cartService.addToCart(product, 1);
      this.router.navigate(['/cart']);
    }
  }

}
