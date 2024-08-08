import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import Transactions from './components/Transactions';
import Budget from './components/Budget';
import Reports from './components/Reports';
import Settings from './components/Settings';
import './App.css';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/auth/authSlice';

function App() {
  const { currentUser } = useSelector(authSelector);

  return (
    <Router>
      <Routes>
        {currentUser ? (
          <>
            <Route path="/signin" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />
            <Route exact path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/:path" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

