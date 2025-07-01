import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import Hero1 from '../components/Hero1';
import logo from './Nayan2.png';

const Contact = () => {
  return (
    <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="contact-page"
    >
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="highlight"
            >
            Contact Us
            </motion.span>
            </h1>
          <p className="page-subtitle">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
            Get in touch with our printing experts
            </motion.p>
            </p>
        </div>
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="contact-content">
              <div>
                <div className="contact-info">
                  <h2 className="info-title">Get in Touch</h2>
                  <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <span>info@designnprint.com</span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-phone-alt"></i>
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>123 Print Street, Design City</span>
                  </div>
                </div>

                <div>
                  {/* <div className="circle magenta"></div> */}
                  <div className="circle yellow"></div>
                  <motion.div
                    className="design-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <img 
                      src={logo} 
                      alt="Design N Print Logo" 
                      className="logo-image"
                    />
                  </motion.div>
                </div>
              </div>

              
              <div className="contact-form-wrapper">
                <ContactForm />
              </div>
            </div>

          </motion.div>
      </div>
    </motion.main>
  );
};

export default Contact;