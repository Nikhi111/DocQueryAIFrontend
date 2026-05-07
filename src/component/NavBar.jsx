
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
 const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-slate-950/50 border-b border-cyan-500/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DQ</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DocQuery AI
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'Pricing'].map((item) => (
              <motion.button
                key={item}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                whileHover={{ color: '#22d3ee' }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={() => navigate('/login')}
              className="text-gray-300 hover:text-white text-sm font-medium"
              whileHover={{ color: '#22d3ee' }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => navigate('/register')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-4">
                {['Home', 'Features', 'Pricing'].map((item) => (
                  <button
                    key={item}
                    className="block w-full text-left text-gray-300 hover:text-cyan-400 text-sm font-medium"
                  >
                    {item}
                  </button>
                ))}
                <div className="flex gap-2 pt-4 border-t border-cyan-500/10">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex-1 text-gray-300 hover:text-white text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold"
                  >
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
export default Navbar;
