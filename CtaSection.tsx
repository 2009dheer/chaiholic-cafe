import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const CtaSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-dark-blue overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/instagram/img3.jpg" 
          alt="Chaiholic background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/80 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="font-hand text-gold-accent text-3xl mb-4">Craving?</span>
            <h2 className="font-serif text-white text-5xl md:text-6xl font-bold mb-8">
              Ready for Your Next Chai?
            </h2>
            <div className="w-24 h-1 bg-gold-accent rounded-full mb-10"></div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
              <a 
                href="#outlets" 
                className="bg-gold-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-dark-blue transition-colors duration-300 shadow-lg text-center"
              >
                Find Nearest Outlet
              </a>
              <Link 
                to="/franchise" 
                className="bg-gold-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b88c3a] transition-colors duration-300 shadow-lg text-center"
              >
                own a chaiholic
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
