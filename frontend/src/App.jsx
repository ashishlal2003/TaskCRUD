import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import LoginPage from './pages/LoginPage';
import EditProfile from './pages/EditProfile';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import AdminLog from './pages/AdminLog';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminLog />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </>
  );
}

export default App;
