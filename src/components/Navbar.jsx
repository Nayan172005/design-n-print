import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../components/auth/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Samples', path: '/samples' },
    { name: 'Order', path: '/order' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  const handleCartClick = () => {
    setUserDropdownOpen(false);
    navigate('/cart');
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <motion.div 
            className="logo-circle"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <span className="c">C</span>
            <span className="m">M</span>
            <span className="y">Y</span>
            <span className="k">K</span>
          </motion.div>
          <span>Design N Print</span>
        </Link>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}></div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li 
              key={item.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.path} onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            </motion.li>
          ))}

          {isAuthenticated && (
            <motion.li 
              className="user-menu-container"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <div 
                className="user-icon" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <i className="fas fa-user-circle"></i>
                {userDropdownOpen && (
                  <motion.div 
                    className="user-dropdown"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="dropdown-item" onClick={handleCartClick}>
                      <i className="fas fa-shopping-cart"></i>
                      <span>Cart</span>
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user?.name || 'User'}</span>
                      <span className="user-email">{user?.email || ''}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;