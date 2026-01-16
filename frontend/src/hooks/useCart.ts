import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types/product.types';

const CART_KEY = 'amavya_cart';
const SHIPPING_AMOUNT = 45;

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const loadCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const items = savedCart ? JSON.parse(savedCart) : [];
      setCartItems(items);
    } catch (err) {
      console.error('Failed to load cart:', err);
      setCartItems([]);
    }
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Update cart count whenever items change
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const saveCart = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      setCartItems(items);
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      let updated: CartItem[];

      if (existing) {
        updated = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prevItems, { ...product, quantity }];
      }

      saveCart(updated);
      return updated;
    });
  }, [saveCart]);

  const getCartItems = useCallback(() => {
    return cartItems;
  }, [cartItems]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems(prevItems => {
      const updated = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCart(updated);
      return updated;
    });
  }, [saveCart]);

  const removeItem = useCallback((productId: number) => {
    setCartItems(prevItems => {
      const updated = prevItems.filter(item => item.id !== productId);
      saveCart(updated);
      return updated;
    });
  }, [saveCart]);

  const getTotal = useCallback(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = cartItems.length > 0 ? SHIPPING_AMOUNT : 0;
    return subtotal + shipping;
  }, [cartItems]);

  const getSubtotal = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  return {
    cartItems,
    cartCount,
    addToCart,
    getCartItems,
    updateQuantity,
    removeItem,
    getTotal,
    getSubtotal,
    clearCart,
    shippingAmount: SHIPPING_AMOUNT,
  };
};
