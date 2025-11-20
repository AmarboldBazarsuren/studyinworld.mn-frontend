import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import CountryDetailPage from './pages/CountryDetailPage';
import CalculatorPage from './pages/CalculatorPage';
import AgenciesPage from './pages/AgenciesPage';
import AgencyDetailPage from './pages/AgencyDetailPage';
import AgencyRegistrationPage from './pages/AgencyRegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AgencyDashboardPage from './pages/AgencyDashboardPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countries" element={<CountryPage />} />
            <Route path="/country/:countryId" element={<CountryDetailPage />} />
            <Route path="/calculator/:countryId" element={<CalculatorPage />} />
            <Route path="/agencies" element={<AgenciesPage />} />
            <Route path="/agency/:agencyId" element={<AgencyDetailPage />} />
            <Route path="/agency-register" element={<AgencyRegistrationPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/agency/dashboard" element={<AgencyDashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;