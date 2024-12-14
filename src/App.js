import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load the components
const HomePage = lazy(() => import('./Pages/HomePage'));
const AboutUs = lazy(() => import('./Pages/AboutUs'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const Profile = lazy(() => import('./Pages/Profile'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Recipes = lazy(() => import('./Pages/Recipes'));
const Support = lazy(() => import('./Pages/Support'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/recipes" element={<Recipes />} />
          <Route exact path="/support" element={<Support />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;