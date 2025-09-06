import React from 'react';
import { type Cart } from '../types/Product';

interface CartSummaryProps {
  cart: Cart;
  onShowSummary: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart, onShowSummary }) => {
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <button className="show-summary-btn" onClick={onShowSummary}>
        <div className="cart-info">
          <span className="item-count">{itemCount}点</span>
          <span className="total-price">¥{cart.totalWithTax.toLocaleString()}</span>
        </div>
        <span>合計を見る</span>
      </button>
    </div>
  );
};

export default CartSummary;