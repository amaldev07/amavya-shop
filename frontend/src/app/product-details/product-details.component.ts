import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product!: Product | undefined;
  selectedImage: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get id from URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(id);
  }

  getProductById(id: number): void {
    this.apiService.getProductById(id).subscribe(prod => {
      this.product = prod;
      this.selectedImage = 'assets/prod-images/' + this.product?.images[0];
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.router.navigate(['/cart']);
    }
  }

}
