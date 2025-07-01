import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    setIsLoading(true);
    if (!isAuthenticated) {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.get('/cart');
      setCartItems(res.data.data?.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const syncCartWithBackend = async (updatedCart) => {
    if (!isAuthenticated) return;

    try {
      for (const item of updatedCart) {
        await api.post('/cart', {
          productId: item.product?._id || item._id || item.id,
          quantity: item.quantity,
        });
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const newCart = cartItems.map(item =>
      (item.product?._id === productId || item._id === productId || item.id === productId)
        ? { ...item, quantity: newQuantity }
        : item
    );

    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    await syncCartWithBackend(newCart);
  };

  const removeFromCart = async (productId) => {
    const newCart = cartItems.filter(
      item => item.product?._id !== productId && item._id !== productId && item.id !== productId
    );
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));

    if (isAuthenticated) {
      try {
        await api.delete(`/cart/${productId}`);
      } catch (err) {
        console.error('Remove failed:', err);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');

    if (isAuthenticated) {
      try {
        await api.delete('/cart');
      } catch (err) {
        console.error('Clear cart failed:', err);
      }
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.product?.price || item.price || 0) * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout'); // ✅ Proper navigation
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="auth-required"
      >
        <h2>Please login to view your cart</h2>
        <Link to="/order" className="login-link">Go to Order Page</Link>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cart-page">
        <div className="container">
          <h1 className="page-title">Your Cart</h1>
          <div className="loading-cart">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="cart-page"
    >
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        {cartItems.length > 0 ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => {
                const product = item.product || item;
                return (
                  <motion.div
                    key={product._id || product.id}
                    className="cart-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="item-image">
                      <img src={product.image || '/placeholder-product.jpg'} alt={product.name} />
                    </div>
                    <div className="item-details">
                      <h3>{product.name}</h3>
                      <p>{product.description || 'Premium print product'}</p>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(product._id || product.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(product._id || product.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-price">
                      ${((product.price || 0) * item.quantity).toFixed(2)}
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(product._id || product.id)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Estimated Total</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout <i className="fas fa-arrow-right"></i>
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        ) : (
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Browse our collection to find something you'll love</p>
            <Link to="/samples" className="continue-shopping">
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};

export default CartPage;

export const useAddToCart = () => {
  const { isAuthenticated } = useAuth();

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Please login to add items to your cart');
      return false;
    }

    try {
      const res = await api.post('/cart', {
        productId: product._id,
        quantity: 1,
      });
      console.log('Add to cart response:', res.data);
      alert(`${product.name} added to cart!`);
      return true;
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err);
      return false;
    }
  };

  return addToCart;
};
