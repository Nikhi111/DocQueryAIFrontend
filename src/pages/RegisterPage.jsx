import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
import FloatingParticles from "../component/FloatingParticles"
import AnimatedCodeBackground from "../component/AnimatedBackground"
import { registerUser } from "../api/authService";
export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    navigate("/login");

  } catch (error) {
    console.log(error);

    alert(
      error?.detail ||
      "Registration failed"
    );

  } finally {
    setLoading(false);
  }
};

  const inputFields = [
    { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', icon: Lock, type: 'password', placeholder: '••••••••' },
  ];

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
              Join DocQuery AI
            </h1>
            <p className="text-gray-400">Create your account in seconds</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {inputFields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {field.label}
                </label>
                <div className="relative group">
                  <field.icon className="absolute left-3 top-3 w-5 h-5 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-cyan-500/20 focus:border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-2 focus:ring-cyan-500/20"
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              </motion.div>
            ))}

            {/* Terms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs text-gray-400"
            >
              By signing up, you agree to our{' '}
              <button type="button" className="text-cyan-400 hover:text-cyan-300">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-cyan-400 hover:text-cyan-300">
                Privacy Policy
              </button>
            </motion.div>

            {/* Submit Button */}
           <motion.button
  type="submit"
  disabled={loading}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.6 }}
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

      Creating Account...
    </>
  ) : (
    "Create Account"
  )}
</motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cyan-500/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-gray-400">or sign up with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {['GitHub', 'Google'].map((provider) => (
              <motion.button
                key={provider}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="py-2 rounded-lg border border-cyan-500/20 text-gray-300 hover:bg-slate-800/50 transition-colors text-sm font-medium"
              >
                {provider}
              </motion.button>
            ))}
          </div>

          {/* Login Link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Login
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};