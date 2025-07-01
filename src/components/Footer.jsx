import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="footer"
    >
      <div className="footer-container">
        <div className="footer-about">
          <div className="footer-logo">
            <div className="logo-circle">
              <span className="c">C</span>
              <span className="m">M</span>
              <span className="y">Y</span>
              <span className="k">K</span>
            </div>
            <span>Design N Print</span>
          </div>
          <p>Transforming ideas into stunning printed materials with precision and creativity.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/samples">Samples</Link></li>
            <li><Link to="/order">Order</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>123 Print Street, Design City</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>(123) 456-7890</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>info@designnprint.com</span>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>&copy; {currentYear} Design N Print. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;