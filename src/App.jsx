import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Upload, MessageSquare, Zap, Mail, Lock, User } from 'lucide-react';
import Navbar from "./component/NavBar";
import {HomePage} from "./pages/HomePage";
import {LoginPage} from "./pages/loginPage";
import {RegisterPage} from "./pages/RegisterPage";
import FloatingParticles from "./component/FloatingParticles"
import AnimatedCodeBackground from "./component/AnimatedBackground"
import Dashboard from "./pages/Dashboard";
// ============================================================================
// Animated Background Components
// ============================================================================




// ============================================================================
// Navbar Component
// ============================================================================

// ============================================================================
// Home Page
// ============================================================================


// ============================================================================
// Login Page
// ============================================================================


// ============================================================================
// Register Page
// ============================================================================



// ============================================================================
// Main App Component
// ============================================================================
function AppContent() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/dashboard";

  return (
    <div className="w-full bg-slate-950">

      {/* HIDE NAVBAR */}

      {!hideNavbar && <Navbar />}

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </div>
  );
}

/*
==================================
MAIN APP
==================================
*/

export default function App() {

  return (
    <Router>

      <AppContent />

    </Router>
  )
}