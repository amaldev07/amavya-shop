import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  products: Product[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
