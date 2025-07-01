import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero1 from '../components/Hero1';

const OrderSuccess = () => {
  return (
    <motion.div className="order-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Hero1 />
      <div className="container">
        <h1 className="highlight">Order Placed Successfully!🎉</h1>
        <p className="page-subtitle">Your premium prints are on their way. Thank you!</p>
        <Link to="/order" className="login-btn" style={{ marginTop: '2rem' }}>Back to Shop</Link>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;