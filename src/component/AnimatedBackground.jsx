 
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
 const AnimatedCodeBackground = () => {
  const codeLines = [
    'const ai = new Intelligence()',
    'vector.search()',
    'embeddings.generate()',
    'async function analyzePDF()',
    'neural network loading...',
    'document.extract()',
    'semantic.process()',
    'ai.learn()',
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" />
      
      {/* Animated code snippets */}
      <div className="absolute inset-0 opacity-10">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-sm text-cyan-400 whitespace-nowrap"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Floating gradient circles */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
        style={{ top: '10%', left: '10%' }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"
        style={{ bottom: '10%', right: '10%' }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};
export default AnimatedCodeBackground