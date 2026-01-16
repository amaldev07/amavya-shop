import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import './Cart.scss';

const Cart: React.FC = () => {
  const { cartItems, shippingAmount, updateQuantity, removeItem, getSubtotal } = useCart();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newSubtotal = getSubtotal();
    setSubtotal(newSubtotal);
    const shipping = cartItems.length > 0 ? shippingAmount : 0;
    setTotal(newSubtotal + shipping);
  }, [cartItems, shippingAmount, getSubtotal]);

  const handleIncreaseQty = (itemId: number, currentQty: number) => {
    updateQuantity(itemId, currentQty + 1);
  };

  const handleDecreaseQty = (itemId: number, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              className="item-image"
              src={`/assets/prod-images/${item.thumbnail}`}
              alt={item.name}
            />

            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">₹{item.price}</p>

              <div className="quantity-box">
                <button
                  className="qty-btn"
                  onClick={() => handleDecreaseQty(item.id, item.quantity)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="qty-input"
                  value={item.quantity}
                  readOnly
                />
                <button
                  className="qty-btn"
                  onClick={() => handleIncreaseQty(item.id, item.quantity)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>₹{cartItems.length > 0 ? shippingAmount : 0}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
