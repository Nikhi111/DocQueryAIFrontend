import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
import FloatingParticles from "../component/FloatingParticles"
import AnimatedCodeBackground from "../component/AnimatedBackground"
import { loginUser } from "../api/authService";



export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await loginUser({
      email,
      password,
    });

    localStorage.setItem(
      "token",
      data.access_token
    );

    navigate("/dashboard");

  } catch (error) {
    console.log(error);

    alert(
      error?.detail ||
      "Invalid email or password"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative w-full min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center pt-20">
      <AnimatedCodeBackground />
      <FloatingParticles />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8"
        >
          {/* Header */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to DocQuery AI</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-cyan-500/20 focus:border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-cyan-500/20 focus:border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="••••••••"
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
          <motion.button
  type="submit"
  disabled={loading}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  whileHover={!loading ? { scale: 1.02 } : {}}
  whileTap={!loading ? { scale: 0.98 } : {}}
>
  {loading ? (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
      />

      Signing In...
    </>
  ) : (
    "Sign In"
  )}
</motion.button>
          </form>

          {/* Register Link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Register
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
