import React, { useState } from 'react';
import { motion } from 'framer-motion';

const productTypes = [
  'Business Cards',
  'Flyers',
  'Brochures',
  'Posters',
  'Invitations',
  'Menus',
  'Letterheads',
  'Packaging'
];

const paperOptions = [
  'Matte (250gsm)',
  'Gloss (300gsm)',
  'Recycled (200gsm)',
  'Premium Silk (350gsm)'
];

const finishOptions = [
  'Standard',
  'Spot UV',
  'Foil Stamping',
  'Embossing'
];

const OrderForm = () => {
  const [formData, setFormData] = useState({
    productType: '',
    quantity: 1,
    paperType: '',
    finish: '',
    specialInstructions: '',
    files: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
    alert('Order submitted successfully!');
  };

  return (
    <motion.div 
      className="order-form-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Place Your Order</h2>
      
      <form onSubmit={handleSubmit} className="order-form">
        <motion.div 
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label>Product Type</label>
          <select 
            name="productType" 
            value={formData.productType}
            onChange={handleChange}
            required
          >
            <option value="">Select a product</option>
            {productTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label>Quantity</label>
          <input 
            type="number" 
            name="quantity" 
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label>Paper Type</label>
          <select 
            name="paperType" 
            value={formData.paperType}
            onChange={handleChange}
            required
          >
            <option value="">Select paper type</option>
            {paperOptions.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label>Finish</label>
          <select 
            name="finish" 
            value={formData.finish}
            onChange={handleChange}
            required
          >
            <option value="">Select finish</option>
            {finishOptions.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </motion.div>
        
        <motion.div 
          className="form-group"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label>Special Instructions</label>
          <textarea 
            name="specialInstructions" 
            value={formData.specialInstructions}
            onChange={handleChange}
            rows="4"
          />
        </motion.div>
        
        <motion.div 
          className="form-group file-upload"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label>Upload Design Files</label>
          <div className="upload-area">
            <input 
              type="file" 
              onChange={handleFileChange}
              multiple
              required
            />
            <div className="upload-text">
              {formData.files 
                ? `${formData.files.length} files selected` 
                : 'Drag & drop files or click to browse'}
            </div>
          </div>
        </motion.div>
        
        <motion.button 
          type="submit" 
          className="submit-order-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Place Order
        </motion.button>
      </form>
    </motion.div>
  );
};

export default OrderForm;