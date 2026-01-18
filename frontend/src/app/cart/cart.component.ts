import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;
  shippingAmount = this.cartService.shippingAmount;

  constructor(private payment: PaymentService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  increaseQty(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity);
    this.loadCart();
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity);
      this.loadCart();
    }
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  payNow() {
    const total = this.cartService.getTotal();
    let userDetails = {
      name: 'Kannan',
      email: 'amaldev.psn@gmail.com', // fetch from user profile if available 
      contact: '7594072480'
    }
    this.payment.pay(total, userDetails);
  }

}
