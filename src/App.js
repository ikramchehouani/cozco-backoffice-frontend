import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Articles from './components/articles/Articles';
import EditArticle from './components/articles/EditArticle';
import AddArticle from './components/articles/AddArticle';
import Sidebar from './components/sidebar/Sidebar';
import PrivateRoute from './components/privateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import Administrators from './components/administrators/Administrators';
import EditAdministrators from './components/administrators/EditAdministrators';

const AppContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`App ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {isAuthenticated && <Sidebar collapsed={collapsed} onToggle={handleSidebarToggle} />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={
            <PrivateRoute>
              <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="administrators" element={<Administrators />} />
                <Route path="administrators/:id" element={<EditAdministrators />} />
                <Route path="articles" element={<Articles />} />
                <Route path="articles/new" element={<AddArticle />} />
                <Route path="articles/:id" element={<EditArticle />} />
              </Routes>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
