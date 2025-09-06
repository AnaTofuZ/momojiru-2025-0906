import React from 'react';
import { type Cart } from '../types/Product';

interface OrderSummaryProps {
  cart: Cart;
  isVisible: boolean;
  onClose: () => void;
  onClearCart: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, isVisible, onClose, onClearCart }) => {
  if (!isVisible || cart.items.length === 0) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="order-summary-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>注文サマリ</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="order-items">
          {cart.items.map(({ product, quantity }) => (
            <div key={product.id} className="order-item">
              <img src={product.imageUrl} alt={product.name} className="item-image" />
              <div className="item-details">
                <h4>{product.name}</h4>
                <p>数量: {quantity}</p>
                <div className="item-prices">
                  <p>¥{(product.priceWithTax * quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-total">
          <div className="total-row main-total">
            <span>合計:</span>
            <span className="total-price-main">¥{cart.totalWithTax.toLocaleString()}</span>
          </div>
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={onClearCart}>
              カートを空にする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;