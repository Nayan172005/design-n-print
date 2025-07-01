import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../components/auth/AuthContext';
import api from '../api/client';

const Checkout = () => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await api.get('/cart');
        const items = res.data.data.items || [];
        setCart(items);
        const calculatedTotal = items.reduce((sum, item) => {
          const price = item.product?.price || 0;
          return sum + price * item.quantity;
        }, 0);
        setTotal(calculatedTotal.toFixed(2));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    };
    if (isAuthenticated) loadCart();
  }, [isAuthenticated]);

  const handlePlaceOrder = async () => {
    try {
      const formattedItems = cart.map(item => ({
        product: item.product?._id,
        quantity: item.quantity
      }));

      await api.post('/orders', {
        items: formattedItems,
        total
      });

      await api.delete('/cart');
      navigate('/order-success');
    } catch (err) {
      console.error('Order failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
      <motion.div className="checkout-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-items">
          {cart.map((item) => (
            <div key={item.product?._id} className="checkout-item">
              <span>{item.product?.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${(item.product?.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <h3>Total: ${total}</h3>
          <button className="checkout-btn" onClick={handlePlaceOrder}>
            Confirm & Place Order
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;