
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
import FloatingParticles from "../component/FloatingParticles"
import AnimatedCodeBackground from "../component/AnimatedBackground"

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-slate-950 overflow-hidden">
      <AnimatedCodeBackground />
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Chat with Your
              </span>
              <br />
              <span className="text-white">Documents</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Upload documents. Chat with AI. Extract knowledge instantly.
            </motion.p>

            <motion.p
              className="text-gray-400 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              DocQuery AI understands your PDFs, contracts, and research papers. Ask questions. Get instant answers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                onClick={() => navigate('/register')}
                className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight size={20} />
                </span>
              </motion.button>

              <motion.button
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-[500px]"
          >
            {/* Terminal Window */}
            <motion.div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 overflow-hidden"
              whileHover={{ borderColor: 'rgba(34, 211, 238, 0.4)' }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="ml-4 text-xs text-gray-400">docquery-ai ~/documents</span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-3 font-mono text-sm text-cyan-400">
                {['$ npm run build', '> Building DocQuery AI...'].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {line}
                  </motion.div>
                ))}

                {/* Animated loading */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-cyan-400"
                >
                  ⚙️ Optimizing neural embeddings...
                </motion.div>

                {/* Floating code elements */}
                <div className="mt-8 space-y-2">
                  {['<Document />', '<AI />'].map((code, i) => (
                    <motion.div
                      key={i}
                      animate={{ x: [0, 20, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="text-purple-400 text-xs"
                    >
                      {code}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating elements around terminal */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-cyan-500/10"
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                }}
                style={{
                  top: `${20 + i * 30}%`,
                  right: `${-30 - i * 20}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Upload, title: 'Upload PDFs', desc: 'Drop any document and instant indexing' },
            { icon: MessageSquare, title: 'AI Chat', desc: 'Natural language understanding' },
            { icon: Zap, title: 'Smart Search', desc: 'Find answers in milliseconds' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 hover:border-cyan-500/30 transition-all"
              whileHover={{ y: -10 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <feature.icon className="w-12 h-12 mb-4 text-cyan-400" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Start chatting with your documents today.
          </h2>
          <motion.button
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
