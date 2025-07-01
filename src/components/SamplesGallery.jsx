import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './auth/AuthContext';
import { useAddToCart } from '../pages/CartPage';
import api from '../api/client';
import LoginModal from './LoginModal';

const SamplesGallery = () => {
  const { isAuthenticated } = useAuth();
  const addToCart = useAddToCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.data);

        const uniqueCategories = [
          'All',
          ...new Set(res.data.data.map(p => p.category))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const openModal = (product) => {
    setSelectedItem(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(false); // Close product modal
      setShowLoginModal(true); // Open login modal
      return;
    }

    await addToCart(selectedItem);
    closeModal();
  };

  return (
    <section className="samples-gallery">
      <div className="category-selector">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`category-btn ${category === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="samples-grid">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            className="sample-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, zIndex: 1 }}
          >
            <div className="sample-image">
              <img src={product.image || '/placeholder-product.jpg'} alt={product.name} />
              <div className="sample-overlay">
                <h3>{product.name}</h3>
                <button
                  className="view-btn"
                  onClick={() => openModal(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && selectedItem && (
        <motion.div
          className="modal1-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeModal}
        >
          <motion.div
            className="modal1-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal1" onClick={closeModal}>&times;</button>
            <div className="modal1-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="modal1-details">
              <h2>{selectedItem.name}</h2>
              <p>Category: {selectedItem.category}</p>
              <p className="price">${selectedItem.price}</p>
              <p className="description">{selectedItem.description}</p>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                {isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          if (selectedItem) {
            setIsModalOpen(true); // Reopen the product modal
          }
        }}
      />
    </section>
  );
};

export default SamplesGallery;
