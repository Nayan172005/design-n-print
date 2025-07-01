// frontend/src/api/orders.js
import api from './client';

export const createOrder = (orderData) => 
  api.post('/orders', orderData);

export const getOrders = () => 
  api.get('/orders');