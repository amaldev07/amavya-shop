import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'amavya_cart';
  cartItems: any[] = [];
  cartCount = new BehaviorSubject<number>(0);
  shippingAmount = 45;


  constructor() {
    this.loadCart();
    this.cartCount.next(this.cartItems.length);

  }

  // Load cart from localStorage
  private loadCart() {
    const savedCart = localStorage.getItem(this.cartKey);
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
  }

  // Save cart to localStorage
  /* private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  } */
  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    this.cartCount.next(this.cartItems.length);
  }


  // Add to cart
  addToCart(product: Product, quantity: number = 1) {
    const existing = this.cartItems.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({
        ...product,
        quantity
      });
    }

    this.saveCart();
  }

  // Get all cart items
  getCartItems() {
    return this.cartItems;
  }

  // Update quantity
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  // Remove item
  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== productId);
    this.saveCart();
  }

  // Get total price
  getTotal() {
    const shippingAmount = this.cartItems.length > 0 ? this.shippingAmount : 0;
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingAmount;
  }

  // Clear all items
  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getShippingAmount() {
    this.shippingAmount;
  }

}
