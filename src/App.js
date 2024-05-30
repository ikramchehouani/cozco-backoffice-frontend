import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/homepage/Home';
import Login from './components/loginpage/Login';
import Dashboard from './components/dashboard/Dashboard';
import Articles from './components/articlepage/Articles';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="articles" element={<Articles />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
