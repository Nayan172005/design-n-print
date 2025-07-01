import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../components/auth/AuthContext';
import LoginModal from '../components/LoginModal';
import Dashboard from './auth/Dashboard';

const Order = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cart, setCart] = useState([]);

const addToCart = (product) => {
  const newCart = [...cart];
  const existingItem = newCart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    newCart.push({ ...product, quantity: 1 });
  }
  
  setCart(newCart);
  localStorage.setItem('cartItems', JSON.stringify(newCart));
};

const removeFromCart = (productId) => {
  const newCart = cart.filter(item => item.id !== productId);
  setCart(newCart);
  localStorage.setItem('cartItems', JSON.stringify(newCart));
};

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="order-page"
    >
      <div className="container">
        <div className="order-header">
          <h1 className="page-title">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="highlight"
            >
              Place Your Order
            </motion.span>
          </h1>
          <p className="page-subtitle">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Get premium quality prints with our CMYK perfection
            </motion.p>
          </p>
        </div>
        
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="login-prompt">
              <div className="login-content">
                <p>Please login to place an order</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <button 
                    className="login-btn pulse"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login / Register
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <Dashboard />
        )}
        
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </motion.main>
  );
};

export default Order;