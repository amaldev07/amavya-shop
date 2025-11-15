import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  cartCount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count;
    });
  }


}

