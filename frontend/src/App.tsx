import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';

// Pages
import HomePage from './pages/HomePage/HomePage';
import ProductListingPage from './pages/ProductListing/ProductListingPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import SmartSearchPage from './pages/SmartSearch/SmartSearchPage';
import PersonalRecommendationsPage from './pages/PersonalRecommendations/PersonalRecommendationsPage';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage';
import VirtualTryOnPage from './pages/VirtualTryOn/VirtualTryOnPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Auth/ProfilePage';

function App() {
  const { t, i18n } = useTranslation();
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    // Set direction based on language
    setDirection(i18n.language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [i18n.language, direction]);

  return (
    <div className="app" dir={direction}>
      <Header />
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/smart-search" element={<SmartSearchPage />} />
          <Route path="/recommendations" element={<PersonalRecommendationsPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/virtual-try-on" element={<VirtualTryOnPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
