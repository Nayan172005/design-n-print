import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Business Printing",
    description: "Professional business cards, letterheads, and stationery that make an impression.",
    icon: "fas fa-briefcase"
  },
  {
    title: "Event Invitations",
    description: "Beautiful wedding, party, and corporate event invitations that set the tone.",
    icon: "fas fa-calendar-alt"
  },
  {
    title: "Marketing Materials",
    description: "Flyers, brochures, and posters that effectively promote your business.",
    icon: "fas fa-bullhorn"
  },
  {
    title: "Packaging Solutions",
    description: "Custom packaging that enhances your product's presentation and brand.",
    icon: "fas fa-box-open"
  }
];

const Services = () => {
  return (
    <motion.section 
      className="services-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Premium printing solutions for all your needs</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1 
              }}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;