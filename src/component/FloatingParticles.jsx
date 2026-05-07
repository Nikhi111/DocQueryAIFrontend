
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
 const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};
export default FloatingParticles