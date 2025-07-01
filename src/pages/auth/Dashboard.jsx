import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import api from '../../api/client';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = () => {
    console.log('Files to upload:', selectedFiles);
    alert(`${selectedFiles.length} files ready for upload!`);
    setShowUploadModal(false);
    setSelectedFiles([]);
  };

  const handleNewOrder = () => {
    navigate('/orderform');
  };

  const filteredOrders = activeTab === 'current'
    ? orders.filter(order => order.status !== 'Completed')
    : orders.filter(order => order.status === 'Completed');

  const openDetailModal = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      setSelectedOrder(res.data.data);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error fetching order detail:', err);
    }
  };

  const openTrackModal = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      setSelectedOrder(res.data.data);
      setShowTrackModal(true);
    } catch (err) {
      console.error('Error fetching tracking info:', err);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-page"
    >
      <div className="container">
        {showUploadModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="upload-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Upload Files</h3>
              <label className="file-input-label">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="file-input"
                />
                <i className="fas fa-cloud-upload-alt"></i>
                <span>Click to select files or drag and drop</span>
              </label>
              <div className="file-preview">
                {selectedFiles.length > 0 ? (
                  <ul>
                    {Array.from(selectedFiles).map((file, index) => (
                      <li key={index}>
                        <i className="fas fa-file-alt"></i>
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No files selected</p>
                )}
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="btn-primary"
                  disabled={selectedFiles.length === 0}
                >
                  Upload Files
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showDetailModal && selectedOrder && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowDetailModal(false)}>
            <motion.div className="upload-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}>
              <h3>Order #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item.product?.name} — Qty: {item.quantity}</li>
                ))}
              </ul>
              <button className="btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}

        {showTrackModal && selectedOrder && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowTrackModal(false)}>
            <motion.div className="upload-modal" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}>
              <h3>Tracking Order #{selectedOrder._id.slice(-6).toUpperCase()}</h3>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <div className="progress-bar large">
                <div
                  className="progress-fill"
                  style={{ width: `${selectedOrder.progress || 0}%` }}
                ></div>
                <span>{selectedOrder.progress || 0}% Complete</span>
              </div>
              <p>Estimated Delivery: {new Date(Date.now() + 3 * 86400000).toLocaleDateString()}</p>
              <button className="btn-secondary" onClick={() => setShowTrackModal(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}

        <div className="dashboard-header">
          <h1>Welcome Back{user?.name ? `, ${user.name}` : ''}!</h1>
          <p>Manage your print orders and account details</p>
        </div>

        <div className="dashboard-grid">
          <motion.div
            className="quick-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button
                onClick={handleNewOrder}
                className="action-btn primary"
              >
                <i className="fas fa-plus"></i>
                <span>New Order</span>
              </button>
              <button
                className="action-btn"
                onClick={() => setShowUploadModal(true)}
              >
                <i className="fas fa-upload"></i>
                <span>Upload Files</span>
              </button>
              <button
                className="action-btn"
                onClick={() => setActiveTab('history')}
              >
                <i className="fas fa-history"></i>
                <span>Order History</span>
              </button>
            </div>

            <div className="account-summary">
              <h3>Account Summary</h3>
              <div className="summary-item">
                <span>Active Orders</span>
                <span>{orders.filter(o => o.status !== 'Completed').length}</span>
              </div>
              <div className="summary-item">
                <span>Completed Orders</span>
                <span>{orders.filter(o => o.status === 'Completed').length}</span>
              </div>
              <div className="summary-item">
                <span>Loyalty Points</span>
                <span>120</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="orders-panel"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="orders-tabs">
              <button
                className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                onClick={() => setActiveTab('current')}
              >
                Current Orders
              </button>
              <button
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Order History
              </button>
            </div>

            {loading ? (
              <p>Loading orders...</p>
            ) : (
              <div className="orders-list">
                {filteredOrders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="ord-header">
                      <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <div className="detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-boxes"></i>
                        <span>{order.items.map(i => i.product?.name).join(', ')}</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${order.progress || 0}%` }}
                      ></div>
                      <span>{order.progress || 0}% Complete</span>
                    </div>
                    <div className="order-actions">
                      <button className="action-link" onClick={() => openDetailModal(order._id)}>
                        <i className="fas fa-eye"></i> View Details
                      </button>
                      <button className="action-link" onClick={() => openTrackModal(order._id)}>
                        <i className="fas fa-location-arrow"></i> Track Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default Dashboard;
