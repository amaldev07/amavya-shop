import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product!: Product | undefined;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
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
}
