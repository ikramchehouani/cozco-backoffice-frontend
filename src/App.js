import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Articles from './components/articles/Articles';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <div className={`App ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} onToggle={handleSidebarToggle} />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Dashboard />}>
              <Route path="articles" element={<Articles />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
